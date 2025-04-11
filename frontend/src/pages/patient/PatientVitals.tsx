import { useState, useEffect } from "react";
import {
  Activity,
  AlertCircle,
  Heart,
  Thermometer,
  Timer,
  PlusCircle,
  Trash2,
  HeartPulse,
  Weight,
  Download
} from "lucide-react";
import { format, subDays, isToday } from "date-fns";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Types
type VitalType = "blood_pressure" | "heart_rate" | "temperature" | "weight" | "oxygen";

interface VitalReading {
  id: string;
  date: Date;
  type: VitalType;
  value: number | string;
  unit: string;
  notes?: string;
}

// Vital type definitions
const vitalTypes = [
  {
    id: "blood_pressure" as VitalType,
    name: "Blood Pressure",
    icon: HeartPulse,
    unit: "mmHg",
    format: (value: string | number) => value,
    normalRange: "90/60 - 120/80"
  },
  {
    id: "heart_rate" as VitalType,
    name: "Heart Rate",
    icon: Heart,
    unit: "bpm",
    format: (value: string | number) => `${value}`,
    normalRange: "60 - 100"
  },
  {
    id: "temperature" as VitalType,
    name: "Temperature",
    icon: Thermometer,
    unit: "°F",
    format: (value: string | number) => `${value}°F`,
    normalRange: "97 - 99"
  },
  {
    id: "weight" as VitalType,
    name: "Weight",
    icon: Weight,
    unit: "lbs",
    format: (value: string | number) => `${value} lbs`,
    normalRange: "Individual"
  },
  {
    id: "oxygen" as VitalType,
    name: "Oxygen Saturation",
    icon: Timer,
    unit: "%",
    format: (value: string | number) => `${value}%`,
    normalRange: "95 - 100"
  }
];

// Demo data generator
const generateDemoData = (): VitalReading[] => {
  const readings: VitalReading[] = [];
  const now = new Date();
  
  // Generate readings for the past 30 days
  for (let i = 30; i >= 0; i -= 1) {
    const date = subDays(now, i);
    
    // Blood pressure
    if (i % 2 === 0) {
      readings.push({
        id: `bp-${date.getTime()}`,
        date,
        type: "blood_pressure",
        value: `${Math.floor(Math.random() * 20) + 110}/${Math.floor(Math.random() * 15) + 70}`,
        unit: "mmHg"
      });
    }
    
    // Heart rate
    if (i % 3 === 0) {
      readings.push({
        id: `hr-${date.getTime()}`,
        date,
        type: "heart_rate",
        value: Math.floor(Math.random() * 20) + 65,
        unit: "bpm"
      });
    }
    
    // Temperature
    if (i % 5 === 0) {
      readings.push({
        id: `temp-${date.getTime()}`,
        date,
        type: "temperature",
        value: parseFloat((Math.random() * 1.5 + 97.5).toFixed(1)),
        unit: "°F"
      });
    }
    
    // Oxygen
    if (i % 4 === 0) {
      readings.push({
        id: `oxygen-${date.getTime()}`,
        date,
        type: "oxygen",
        value: Math.floor(Math.random() * 3) + 96,
        unit: "%"
      });
    }
  }
  
  // Add weekly weight measurements
  for (let i = 4; i >= 0; i--) {
    const date = subDays(now, i * 7);
    readings.push({
      id: `weight-${date.getTime()}`,
      date,
      type: "weight",
      value: Math.floor(Math.random() * 3) + 160 - i * 0.5,
      unit: "lbs"
    });
  }
  
  return readings;
};

const PatientVitals = () => {
  // State
  const [readings, setReadings] = useState<VitalReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filterType, setFilterType] = useState<VitalType | "">("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newReading, setNewReading] = useState({
    type: "blood_pressure" as VitalType,
    systolic: "",
    diastolic: "",
    value: "",
    notes: ""
  });
  
  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    
    // Try to load from localStorage
    const savedData = localStorage.getItem("patientVitals");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setReadings(parsedData.map((r: any) => ({ ...r, date: new Date(r.date) })));
    } else {
      // Use demo data
      const demoData = generateDemoData();
      setReadings(demoData);
      
      // Save to localStorage
      localStorage.setItem("patientVitals", JSON.stringify(demoData.map(r => ({
        ...r,
        date: r.date.toISOString()
      }))));
    }
    
    setIsLoading(false);
  }, []);
  
  // Get latest readings for each type
  const getLatestReadings = () => {
    const latest: Record<VitalType, VitalReading | undefined> = {
      blood_pressure: undefined,
      heart_rate: undefined,
      temperature: undefined,
      weight: undefined,
      oxygen: undefined
    };
    
    // Find the most recent reading for each type
    readings.forEach(reading => {
      if (!latest[reading.type] || reading.date > latest[reading.type]!.date) {
        latest[reading.type] = reading;
      }
    });
    
    return Object.values(latest).filter(Boolean) as VitalReading[];
  };
  
  // Get filtered readings
  const getFilteredReadings = () => {
    let filtered = [...readings];
    
    // Filter by type if selected
    if (filterType) {
      filtered = filtered.filter(r => r.type === filterType);
    }
    
    // Sort by date, newest first
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  };
  
  // Format data for charts
  const getChartData = () => {
    if (!filterType) return [];
    
    const filtered = readings
      .filter(r => r.type === filterType)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    if (filterType === "blood_pressure") {
      return filtered.map(reading => {
        const [systolic, diastolic] = (reading.value as string).split('/');
        return {
          date: format(reading.date, 'MMM dd'),
          systolic: parseInt(systolic, 10),
          diastolic: parseInt(diastolic, 10)
        };
      });
    }
    
    return filtered.map(reading => ({
      date: format(reading.date, 'MMM dd'),
      value: typeof reading.value === 'string' ? parseFloat(reading.value) : reading.value
    }));
  };
  
  // Add a new reading
  const handleAddReading = () => {
    const vitalType = vitalTypes.find(t => t.id === newReading.type);
    if (!vitalType) return;
    
    // Prepare the value based on type
    let value: string | number;
    if (newReading.type === "blood_pressure") {
      if (!newReading.systolic || !newReading.diastolic) {
        toast.error("Please enter both systolic and diastolic values");
        return;
      }
      value = `${newReading.systolic}/${newReading.diastolic}`;
    } else {
      if (!newReading.value) {
        toast.error("Please enter a value");
        return;
      }
      value = parseFloat(newReading.value);
    }
    
    // Create new reading
    const reading: VitalReading = {
      id: `${newReading.type}-${Date.now()}`,
      date: new Date(),
      type: newReading.type,
      value,
      unit: vitalType.unit,
      notes: newReading.notes || undefined
    };
    
    // Update state
    const updatedReadings = [...readings, reading];
    setReadings(updatedReadings);
    
    // Save to localStorage
    localStorage.setItem("patientVitals", JSON.stringify(updatedReadings.map(r => ({
      ...r,
      date: r.date.toISOString()
    }))));
    
    // Reset and close dialog
    setNewReading({
      type: "blood_pressure",
      systolic: "",
      diastolic: "",
      value: "",
      notes: ""
    });
    setShowAddDialog(false);
    
    toast.success("Reading added successfully");
  };
  
  // Delete a reading
  const handleDeleteReading = (id: string) => {
    const updatedReadings = readings.filter(r => r.id !== id);
    setReadings(updatedReadings);
    
    // Save to localStorage
    localStorage.setItem("patientVitals", JSON.stringify(updatedReadings.map(r => ({
      ...r,
      date: r.date.toISOString()
    }))));
    
    toast.success("Reading deleted");
  };
  
  // Export data
  const handleExportData = () => {
    const data = JSON.stringify(readings.map(r => ({
      ...r,
      date: r.date.toISOString()
    })), null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `vital-signs-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Data exported successfully");
  };
  
  // Get icon for a vital type
  const getVitalIcon = (type: VitalType) => {
    const vitalType = vitalTypes.find(t => t.id === type);
    return vitalType?.icon || Activity;
  };
  
  // Format value for display
  const formatValue = (reading: VitalReading) => {
    const vitalType = vitalTypes.find(t => t.id === reading.type);
    return vitalType ? vitalType.format(reading.value) : reading.value;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Vital Signs</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddDialog(true)} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Reading
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4 pt-4">
          {/* Latest readings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              // Loading placeholders
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-8 bg-muted/40 rounded" />
                  <CardContent className="h-16 bg-muted/20 rounded" />
                </Card>
              ))
            ) : getLatestReadings().map(reading => {
              const Icon = getVitalIcon(reading.type);
              const vitalType = vitalTypes.find(t => t.id === reading.type);
              
              return (
                <Card key={reading.id}>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {vitalType?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">{formatValue(reading)}</div>
                      <div className="ml-2 text-xs text-muted-foreground">
                        {isToday(reading.date) 
                          ? format(reading.date, 'h:mm a')
                          : format(reading.date, 'MMM d')}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Normal range: {vitalType?.normalRange}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Recent readings table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Readings</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              ) : readings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No readings recorded yet</p>
                  <Button onClick={() => setShowAddDialog(true)}>Add First Reading</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredReadings().slice(0, 10).map(reading => {
                        const Icon = getVitalIcon(reading.type);
                        const vitalType = vitalTypes.find(t => t.id === reading.type);
                        
                        return (
                          <TableRow key={reading.id}>
                            <TableCell>
                              {format(reading.date, 'MMM d, yyyy')}
                              <div className="text-xs text-muted-foreground">
                                {format(reading.date, 'h:mm a')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Icon className="h-4 w-4 mr-2" />
                                {vitalType?.name}
                              </div>
                            </TableCell>
                            <TableCell>{formatValue(reading)}</TableCell>
                            <TableCell>{reading.notes || "—"}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteReading(reading.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trends Analysis</CardTitle>
              <Select value={filterType} onValueChange={(value) => setFilterType(value as VitalType | "")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select vital type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {vitalTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-60 bg-muted/20 animate-pulse rounded" />
              ) : !filterType ? (
                <div className="h-60 flex items-center justify-center">
                  <p className="text-muted-foreground">Select a vital type to view trends</p>
                </div>
              ) : (
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    {filterType === "blood_pressure" ? (
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="systolic" 
                          name="Systolic" 
                          stroke="#ef4444" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="diastolic" 
                          name="Diastolic" 
                          stroke="#3b82f6" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </LineChart>
                    ) : (
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name={vitalTypes.find(t => t.id === filterType)?.name || ""} 
                          stroke="#0ea5e9" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Reading Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Reading</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vital-type">Vital Type</Label>
              <Select
                value={newReading.type}
                onValueChange={(value) => setNewReading({...newReading, type: value as VitalType})}
              >
                <SelectTrigger id="vital-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {vitalTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newReading.type === "blood_pressure" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="systolic">Systolic (mmHg)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="e.g., 120"
                    value={newReading.systolic}
                    onChange={(e) => setNewReading({...newReading, systolic: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="e.g., 80"
                    value={newReading.diastolic}
                    onChange={(e) => setNewReading({...newReading, diastolic: e.target.value})}
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="value">Value ({vitalTypes.find(t => t.id === newReading.type)?.unit})</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.1"
                  placeholder="Enter value"
                  value={newReading.value}
                  onChange={(e) => setNewReading({...newReading, value: e.target.value})}
                />
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Add any additional context..."
                value={newReading.notes}
                onChange={(e) => setNewReading({...newReading, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddReading}>Add Reading</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientVitals;