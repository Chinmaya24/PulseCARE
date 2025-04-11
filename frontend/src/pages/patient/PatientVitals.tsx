{
    id: "respiratory_rate";
    name: "Respiratory Rate";
    icon: Activity;
    unit: "breaths/min";
    format: (value: string | number) => `${value} breaths/min`;
    description: "Number of breaths taken per minute";
    inputType: "number";
  }


const PatientVitals = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vitalReadings, setVitalReadings] = useState<VitalReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedReading, setSelectedReading] = useState<VitalReading | null>(null);
  const [addVitalType, setAddVitalType] = useState("blood_pressure");
  const [newVitalValues, setNewVitalValues] = useState({
    systolic: "",
    diastolic: "",
    value: "",
    notes: ""
  });
  const [filterVitalType, setFilterVitalType] = useState<string | null>(null);
  const [filterTimeRange, setFilterTimeRange] = useState("week"); // 'day', 'week', 'month', 'year'

  // Load vital readings when component mounts
  useEffect(() => {
    const loadReadings = async () => {
      try {
        setIsLoading(true);
        const readings = await vitalsService.getVitalsReadings();
        setVitalReadings(readings);
      } catch (error) {
        console.error("Error loading vital readings:", error);
        toast.error("Failed to load your vital readings");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReadings();
  }, []);

  // Handle adding a new vital reading
  const handleAddReading = async () => {
    try {
      const vitalType = vitalTypes.find(type => type.id === addVitalType);
      if (!vitalType) return;

      let value: string | number;
      
      // Handle blood pressure special case
      if (addVitalType === "blood_pressure") {
        if (!newVitalValues.systolic || !newVitalValues.diastolic) {
          toast.error("Please enter both systolic and diastolic values");
          return;
        }
        value = `${newVitalValues.systolic}/${newVitalValues.diastolic}`;
      } else {
        if (!newVitalValues.value) {
          toast.error("Please enter a value");
          return;
        }
        value = vitalType.inputType === 'decimal' 
          ? parseFloat(newVitalValues.value) 
          : parseInt(newVitalValues.value, 10);
      }

      const newReading: VitalReading = {
        id: `${addVitalType}-${Date.now()}`,
        date: new Date(),
        type: addVitalType as any,
        value,
        unit: vitalType.unit,
        notes: newVitalValues.notes || undefined,
        isManualEntry: true
      };

      await vitalsService.saveVitalReading(newReading);
      
      // Update local state
      setVitalReadings(prev => [...prev, newReading]);
      
      // Reset form and close dialog
      setNewVitalValues({
        systolic: "",
        diastolic: "",
        value: "",
        notes: ""
      });
      setShowAddDialog(false);
      
      toast.success(`${vitalType.name} reading added successfully`);
    } catch (error) {
      console.error("Error adding vital reading:", error);
      toast.error("Failed to add vital reading");
    }
  };

  // Handle deleting a vital reading
  const handleDeleteReading = async () => {
    if (!selectedReading) return;
    
    try {
      await vitalsService.deleteVitalReading(selectedReading.id);
      
      // Update local state
      setVitalReadings(prev => prev.filter(r => r.id !== selectedReading.id));
      setShowDeleteDialog(false);
      setSelectedReading(null);
      
      toast.success("Vital reading deleted successfully");
    } catch (error) {
      console.error("Error deleting vital reading:", error);
      toast.error("Failed to delete vital reading");
    }
  };

  // Handle exporting vitals data
  const handleExportData = async () => {
    try {
      const data = await vitalsService.exportVitalsData();
      
      // Create a blob and download link
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `vital-signs-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Vital signs data exported successfully");
    } catch (error) {
      console.error("Error exporting vital readings:", error);
      toast.error("Failed to export your vital readings");
    }
  };

  // Filter readings based on the selected vital type and time range
  const getFilteredReadings = () => {
    let filtered = [...vitalReadings];
    
    // Filter by vital type if selected
    if (filterVitalType) {
      filtered = filtered.filter(reading => reading.type === filterVitalType);
    }
    
    // Filter by time range
    const now = new Date();
    let cutoffDate;
    
    switch (filterTimeRange) {
      case 'day':
        cutoffDate = subDays(now, 1);
        break;
      case 'week':
        cutoffDate = subDays(now, 7);
        break;
      case 'month':
        cutoffDate = subDays(now, 30);
        break;
      case 'year':
        cutoffDate = subDays(now, 365);
        break;
      default:
        cutoffDate = subDays(now, 7); // Default to week
    }
    
    filtered = filtered.filter(reading => reading.date >= cutoffDate);
    
    // Sort by date, newest first
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  // Prepare data for the trends chart
  const getTrendsChartData = () => {
    if (!filterVitalType) return [];
    
    const filtered = vitalReadings.filter(reading => reading.type === filterVitalType);
    const now = new Date();
    let cutoffDate;
    
    switch (filterTimeRange) {
      case 'day':
        cutoffDate = subDays(now, 1);
        break;
      case 'week':
        cutoffDate = subDays(now, 7);
        break;
      case 'month':
        cutoffDate = subDays(now, 30);
        break;
      case 'year':
        cutoffDate = subDays(now, 365);
        break;
      default:
        cutoffDate = subDays(now, 7); // Default to week
    }
    
    const timeFilteredReadings = filtered
      .filter(reading => reading.date >= cutoffDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // For blood pressure, we need special handling
    if (filterVitalType === "blood_pressure") {
      return timeFilteredReadings.map(reading => {
        const [systolic, diastolic] = (reading.value as string).split('/');
        return {
          date: format(reading.date, 'MMM dd'),
          time: format(reading.date, 'HH:mm'),
          systolic: parseInt(systolic, 10),
          diastolic: parseInt(diastolic, 10),
          fullDate: reading.date
        };
      });
    }
    
    // For other vital types
    return timeFilteredReadings.map(reading => {
      return {
        date: format(reading.date, 'MMM dd'),
        time: format(reading.date, 'HH:mm'),
        value: typeof reading.value === 'string' ? parseFloat(reading.value) : reading.value,
        fullDate: reading.date
      };
    });
  };

  // Get the latest readings for each vital type
  const getLatestReadings = () => {
    const latestByType: Record<string, VitalReading> = {};
    
    for (const reading of vitalReadings) {
      if (!latestByType[reading.type] || reading.date > latestByType[reading.type].date) {
        latestByType[reading.type] = reading;
      }
    }
    
    return Object.values(latestByType);
  };

  // Check if a reading is within normal range
  const getReadingStatus = (reading: VitalReading) => {
    const ranges = vitalRanges[reading.type];
    
    if (reading.type === "blood_pressure") {
      const [systolic, diastolic] = (reading.value as string).split('/').map(val => parseInt(val, 10));
      const [critHighSys, critHighDia] = (ranges.critical_high as string).split('/').map(val => parseInt(val, 10));
      const [critLowSys, critLowDia] = (ranges.critical_low as string).split('/').map(val => parseInt(val, 10));
      const [maxSys, maxDia] = (ranges.max as string).split('/').map(val => parseInt(val, 10));
      const [minSys, minDia] = (ranges.min as string).split('/').map(val => parseInt(val, 10));
      
      if (systolic >= critHighSys || diastolic >= critHighDia) {
        return "critical-high";
      } else if (systolic <= critLowSys || diastolic <= critLowDia) {
        return "critical-low";
      } else if (systolic > maxSys || diastolic > maxDia) {
        return "high";
      } else if (systolic < minSys || diastolic < minDia) {
        return "low";
      } else {
        return "normal";
      }
    } else {
      const value = typeof reading.value === 'string' ? parseFloat(reading.value) : reading.value;
      
      if (ranges.critical_high && value >= ranges.critical_high) {
        return "critical-high";
      } else if (ranges.critical_low && value <= ranges.critical_low) {
        return "critical-low";
      } else if (ranges.max && value > ranges.max) {
        return "high";
      } else if (ranges.min && value < ranges.min) {
        return "low";
      } else {
        return "normal";
      }
    }
  };

  // Get display information for each status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "critical-high":
        return { color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/30", label: "Critical High" };
      case "critical-low":
        return { color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/30", label: "Critical Low" };
      case "high":
        return { color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/30", label: "High" };
      case "low":
        return { color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/30", label: "Low" };
      case "normal":
        return { color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/30", label: "Normal" };
      default:
        return { color: "text-gray-600", bgColor: "bg-gray-100 dark:bg-gray-800", label: "Unknown" };
    }
  };

  // Get the correct icon component for a vital type
  const getVitalIcon = (type: string) => {
    const vitalType = vitalTypes.find(vt => vt.id === type);
    if (!vitalType) return Info;
    return vitalType.icon;
  };

  // Get the name of a vital type
  const getVitalName = (type: string) => {
    const vitalType = vitalTypes.find(vt => vt.id === type);
    if (!vitalType) return "Unknown";
    return vitalType.name;
  };

  // Format vital value for display
  const formatVitalValue = (reading: VitalReading) => {
    const vitalType = vitalTypes.find(vt => vt.id === reading.type);
    if (!vitalType) return reading.value;
    return vitalType.format(reading.value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Vitals</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Reading
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">
            <BarChart4 className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="trends">
            <Activity className="mr-2 h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-4 w-1/2 bg-muted rounded"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-7 w-16 bg-muted rounded mb-2"></div>
                      <div className="h-4 w-3/4 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                getLatestReadings().map(reading => {
                  const status = getReadingStatus(reading);
                  const { color, bgColor, label } = getStatusInfo(status);
                  const Icon = getVitalIcon(reading.type);
                  
                  return (
                    <Card key={reading.id} className="overflow-hidden">
                      <CardHeader className={`pb-2 ${status !== 'normal' ? 'border-b border-muted' : ''}`}>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center text-base">
                            <Icon className="mr-2 h-5 w-5" />
                            {getVitalName(reading.type)}
                          </CardTitle>
                          {status !== 'normal' && (
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${color} ${bgColor}`}>
                              {label}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex items-baseline mb-2">
                          <div className="text-2xl font-bold">{formatVitalValue(reading)}</div>
                          <div className="ml-2 text-xs text-muted-foreground">
                            {isToday(reading.date) 
                              ? `Today at ${format(reading.date, 'h:mm a')}` 
                              : format(reading.date, 'MMM d, yyyy')}
                          </div>
                        </div>
                        
                        {/* Display appropriate guidance based on status */}
                        {status === 'normal' ? (
                          <div className="text-xs text-muted-foreground">
                            Value is within normal range
                          </div>
                        ) : (
                          <div className={`text-xs ${color}`}>
                            {status.includes('high') 
                              ? 'Value is above normal range' 
                              : 'Value is below normal range'}
                            {status.includes('critical') && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertCircle className="h-3 w-3" />
                                <span className="font-medium">Contact your doctor</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Readings</CardTitle>
                <CardDescription>Your latest vital sign measurements</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-60 flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : vitalReadings.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No readings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start recording your vital signs to track your health
                    </p>
                    <Button onClick={() => setShowAddDialog(true)}>Add First Reading</Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Vital Sign</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredReadings().slice(0, 10).map(reading => {
                          const status = getReadingStatus(reading);
                          const { color, bgColor, label } = getStatusInfo(status);
                          
                          return (
                            <TableRow key={reading.id}>
                              <TableCell>
                                <div className="font-medium">{format(reading.date, 'MMM d, yyyy')}</div>
                                <div className="text-xs text-muted-foreground">{format(reading.date, 'h:mm a')}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  {React.createElement(getVitalIcon(reading.type), {
                                    className: "mr-2 h-4 w-4"
                                  })}
                                  {getVitalName(reading.type)}
                                </div>
                              </TableCell>
                              <TableCell>{formatVitalValue(reading)}</TableCell>
                              <TableCell>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex ${color} ${bgColor}`}>
                                  {label}
                                </div>
                              </TableCell>
                              <TableCell>{reading.notes || "—"}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => {
                                    setSelectedReading(reading);
                                    setShowDeleteDialog(true);
                                  }}
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
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Trends Analysis</CardTitle>
                  <CardDescription>Track your vital signs over time</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select
                    value={filterVitalType || ""}
                    onValueChange={(value) => setFilterVitalType(value || null)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select vital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Vital Types</SelectItem>
                      {vitalTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterTimeRange}
                    onValueChange={setFilterTimeRange}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Last 24 Hours</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-80 bg-muted/20 animate-pulse rounded-md"></div>
              ) : !filterVitalType ? (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a vital type to view trends</h3>
                  <p className="text-muted-foreground">
                    Choose a vital sign from the dropdown above to see its trends over time
                  </p>
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    {filterVitalType === "blood_pressure" ? (
                      <LineChart data={getTrendsChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis 
                          dataKey="date" 
                          tickLine={false} 
                          axisLine={true}
                        />
                        <YAxis 
                          tickLine={false} 
                          axisLine={true}
                          domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip
                          formatter={(value: any) => [`${value}`, '']}
                          labelFormatter={(label) => {
                            const dataPoint = getTrendsChartData().find(d => d.date === label);
                            return dataPoint ? `${label} at ${dataPoint.time}` : label;
                          }}
                        />
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
                      <LineChart data={getTrendsChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis 
                          dataKey="date" 
                          tickLine={false} 
                          axisLine={true}
                        />
                        <YAxis 
                          tickLine={false} 
                          axisLine={true}
                          domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip
                          formatter={(value: any) => [`${value}`, filterVitalType === "temperature" ? '°F' : '']}
                          labelFormatter={(label) => {
                            const dataPoint = getTrendsChartData().find(d => d.date === label);
                            return dataPoint ? `${label} at ${dataPoint.time}` : label;
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name={getVitalName(filterVitalType)} 
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

        {/* History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Historical Records</CardTitle>
                  <CardDescription>Complete history of your vital measurements</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select
                    value={filterVitalType || ""}
                    onValueChange={(value) => setFilterVitalType(value || null)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select vital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Vital Types</SelectItem>
                      {vitalTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterTimeRange}
                    onValueChange={setFilterTimeRange}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Last 24 Hours</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-60 flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : getFilteredReadings().length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No readings found</h3>
                  <p className="text-muted-foreground mb-4">
                    No data available for the selected filters
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>Add New Reading</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Vital Sign</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredReadings().map(reading => {
                        const status = getReadingStatus(reading);
                        const { color, bgColor, label } = getStatusInfo(status);
                        
                        return (
                          <TableRow key={reading.id}>
                            <TableCell>
                              <div className="font-medium">{format(reading.date, 'MMM d, yyyy')}</div>
                              <div className="text-xs text-muted-foreground">{format(reading.date, 'h:mm a')}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {React.createElement(getVitalIcon(reading.type), {
                                  className: "mr-2 h-4 w-4"
                                })}
                                {getVitalName(reading.type)}
                              </div>
                            </TableCell>
                            <TableCell>{formatVitalValue(reading)}</TableCell>
                            <TableCell>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex ${color} ${bgColor}`}>
                                {label}
                              </div>
                            </TableCell>
                            <TableCell>{reading.notes || "—"}</TableCell>
                            <TableCell>
                              <span className="text-xs font-medium">
                                {reading.isManualEntry ? "Manual Entry" : "Connected Device"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedReading(reading);
                                  setShowDeleteDialog(true);
                                }}
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
      </Tabs>

      {/* Add Reading Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Vital Reading</DialogTitle>
            <DialogDescription>
              Record a new vital sign measurement
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vital-type">Vital Type</Label>
              <Select
                value={addVitalType}
                onValueChange={setAddVitalType}
              >
                <SelectTrigger id="vital-type">
                  <SelectValue placeholder="Select vital type" />
                </SelectTrigger>
                <SelectContent>
                  {vitalTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        {React.createElement(type.icon, { className: "mr-2 h-4 w-4" })}
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {addVitalType === "blood_pressure" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="systolic">Systolic (mmHg)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="e.g., 120"
                    value={newVitalValues.systolic}
                    onChange={(e) => setNewVitalValues({...newVitalValues, systolic: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="e.g., 80"
                    value={newVitalValues.diastolic}
                    onChange={(e) => setNewVitalValues({...newVitalValues, diastolic: e.target.value})}
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="value">Value ({vitalTypes.find(t => t.id === addVitalType)?.unit})</Label>
                <Input
                  id="value"
                  type={vitalTypes.find(t => t.id === addVitalType)?.inputType === 'decimal' ? "number" : "number"}
                  step={vitalTypes.find(t => t.id === addVitalType)?.inputType === 'decimal' ? "0.1" : "1"}
                  placeholder={`Enter ${getVitalName(addVitalType).toLowerCase()} value`}
                  value={newVitalValues.value}
                  onChange={(e) => setNewVitalValues({...newVitalValues, value: e.target.value})}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Add any additional context..."
                value={newVitalValues.notes}
                onChange={(e) => setNewVitalValues({...newVitalValues, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddReading}>Add Reading</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Reading</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vital reading? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteReading}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientVitals;import { useState, useEffect } from "react";
import { 
  Activity, 
  AlertCircle, 
  BarChart4, 
  Calendar, 
  Clock, 
  Download, 
  Heart, 
  HeartPulse, 
  Info, 
  PlusCircle, 
  Save, 
  Thermometer, 
  Timer, 
  Trash2, 
  Upload,
  User,
  Weight 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { format, subDays, isToday } from "date-fns";
import { toast } from "sonner";

// Interface for vital reading
interface VitalReading {
  id: string;
  date: Date;
  type: "blood_pressure" | "heart_rate" | "temperature" | "weight" | "blood_sugar" | "oxygen" | "respiratory_rate";
  value: number | string; // Can be a string for blood pressure (e.g., "120/80")
  unit: string;
  notes?: string;
  isManualEntry: boolean; // Indicates if entered manually vs from a device
}

// Reference ranges for vitals
const vitalRanges = {
  blood_pressure: { min: "90/60", max: "120/80", critical_low: "85/55", critical_high: "180/120" },
  heart_rate: { min: 60, max: 100, critical_low: 40, critical_high: 130 },
  temperature: { min: 97, max: 99, critical_low: 95, critical_high: 103 },
  weight: { min: 0, max: 1000 }, // Min and max depend on the individual
  blood_sugar: { min: 70, max: 140, critical_low: 50, critical_high: 300 },
  oxygen: { min: 95, max: 100, critical_low: 90 },
  respiratory_rate: { min: 12, max: 20, critical_low: 8, critical_high: 30 }
};

// Service for vitals data
const vitalsService = {
  getVitalsReadings: async (): Promise<VitalReading[]> => {
    // In a real implementation, this would fetch from an API
    const savedReadings = localStorage.getItem('patientVitalsData');
    if (savedReadings) {
      // Parse the dates back to Date objects
      const readings = JSON.parse(savedReadings);
      return readings.map((reading: any) => ({
        ...reading,
        date: new Date(reading.date)
      }));
    }
    
    // Return demo data if no saved readings
    const demoData = generateDemoVitalsData();
    localStorage.setItem('patientVitalsData', JSON.stringify(demoData.map(d => ({
      ...d,
      date: d.date.toISOString()
    }))));
    return demoData;
  },

  saveVitalReading: async (reading: VitalReading): Promise<VitalReading> => {
    // In a real implementation, this would save to an API
    const savedReadings = localStorage.getItem('patientVitalsData');
    let readings = savedReadings ? JSON.parse(savedReadings) : [];
    
    // Add new reading
    readings.push({...reading, date: reading.date.toISOString()});
    
    localStorage.setItem('patientVitalsData', JSON.stringify(readings));
    
    return reading;
  },

  deleteVitalReading: async (id: string): Promise<void> => {
    // In a real implementation, this would delete from an API
    const savedReadings = localStorage.getItem('patientVitalsData');
    if (savedReadings) {
      let readings = JSON.parse(savedReadings);
      readings = readings.filter((r: any) => r.id !== id);
      localStorage.setItem('patientVitalsData', JSON.stringify(readings));
    }
  },

  exportVitalsData: async (): Promise<string> => {
    const savedReadings = localStorage.getItem('patientVitalsData');
    if (savedReadings) {
      return savedReadings;
    }
    return "[]";
  }
};

// Generate demo vitals data
function generateDemoVitalsData(): VitalReading[] {
  const readings: VitalReading[] = [];
  const now = new Date();
  
  // Generate blood pressure readings
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    
    // Generate systolic between 110-130, diastolic between 70-85
    const systolic = Math.floor(Math.random() * 20) + 110;
    const diastolic = Math.floor(Math.random() * 15) + 70;
    
    readings.push({
      id: `bp-${date.getTime()}`,
      date,
      type: "blood_pressure",
      value: `${systolic}/${diastolic}`,
      unit: "mmHg",
      isManualEntry: false
    });

    // Generate heart rate readings
    const heartRate = Math.floor(Math.random() * 15) + 65; // 65-80
    readings.push({
      id: `hr-${date.getTime()}`,
      date,
      type: "heart_rate",
      value: heartRate,
      unit: "bpm",
      isManualEntry: false
    });
    
    // Generate temperature readings (less frequently)
    if (i % 3 === 0) {
      const temp = (Math.random() * 1.5) + 97.5; // 97.5-99.0
      readings.push({
        id: `temp-${date.getTime()}`,
        date,
        type: "temperature",
        value: temp.toFixed(1),
        unit: "°F",
        isManualEntry: true
      });
    }
    
    // Generate blood sugar readings twice daily
    if (i % 1 === 0) {
      // Morning reading (fasting)
      const morningBS = Math.floor(Math.random() * 20) + 85; // 85-105
      readings.push({
        id: `bs-morning-${date.getTime()}`,
        date: new Date(date.setHours(8, 0, 0, 0)),
        type: "blood_sugar",
        value: morningBS,
        unit: "mg/dL",
        notes: "Fasting",
        isManualEntry: true
      });
      
      // Evening reading
      const eveningBS = Math.floor(Math.random() * 40) + 100; // 100-140
      readings.push({
        id: `bs-evening-${date.getTime()}`,
        date: new Date(date.setHours(19, 0, 0, 0)),
        type: "blood_sugar",
        value: eveningBS,
        unit: "mg/dL",
        notes: "After dinner",
        isManualEntry: true
      });
    }
    
    // Generate oxygen readings (less frequently)
    if (i % 4 === 0) {
      const oxygen = Math.floor(Math.random() * 3) + 96; // 96-98
      readings.push({
        id: `oxygen-${date.getTime()}`,
        date,
        type: "oxygen",
        value: oxygen,
        unit: "%",
        isManualEntry: true
      });
    }
  }
  
  // Add weekly weight measurements
  for (let i = 4; i >= 0; i--) {
    const date = subDays(now, i * 7);
    const weight = Math.floor(Math.random() * 3) + 160 - i * 0.5; // Showing gradual weight loss
    
    readings.push({
      id: `weight-${date.getTime()}`,
      date,
      type: "weight",
      value: weight,
      unit: "lbs",
      isManualEntry: true
    });
  }
  
  return readings;
}

// Vital type definitions
const vitalTypes = [
  {
    id: "blood_pressure",
    name: "Blood Pressure",
    icon: HeartPulse,
    unit: "mmHg",
    format: (value: string | number) => value,
    description: "Measures the pressure of blood against the walls of arteries",
    inputType: "dual", // Special input type for blood pressure
  },
  {
    id: "heart_rate",
    name: "Heart Rate",
    icon: Heart,
    unit: "bpm",
    format: (value: string | number) => `${value}`,
    description: "Number of times your heart beats per minute",
    inputType: "number",
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: Thermometer,
    unit: "°F",
    format: (value: string | number) => `${value}°F`,
    description: "Body temperature measurement",
    inputType: "decimal",
  },
  {
    id: "weight",
    name: "Weight",
    icon: Weight,
    unit: "lbs",
    format: (value: string | number) => `${value} lbs`,
    description: "Body weight measurement",
    inputType: "decimal",
  },
  {
    id: "blood_sugar",
    name: "Blood Sugar",
    icon: Activity,
    unit: "mg/dL",
    format: (value: string | number) => `${value} mg/dL`,
    description: "Blood glucose level measurement",
    inputType: "number",
  },
  {
    id: "oxygen",
    name: "Oxygen Saturation",
    icon: Timer,
    unit: "%",
    format: (value: string | number) => `${value}%`,
    description: "Percentage of oxygen in your blood",
    inputType: "number",
  },
  {
    id: "respiratory_rate",
    name: "Respiratory Rate",
    icon: Activity,
    unit: "breaths/min",
    format: (value: string | number) => `${value} breaths/min`,
    description: "Number of breaths taken per minute",
    inputType: "number",
  }
];