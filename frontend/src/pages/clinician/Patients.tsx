import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Check, ChevronRight, FilePlus, Heart, Info, Search, User, X } from "lucide-react";
import { useState } from "react";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample patients data
  const patients = [
    { id: 1, name: "Sarah Jones", age: 45, condition: "Hypertension", status: "Stable", lastVisit: "Oct 15, 2025", nextVisit: "Nov 10, 2025", gender: "Female", bloodType: "A+" },
    { id: 2, name: "Michael Brown", age: 62, condition: "Diabetes Type 2", status: "Critical", lastVisit: "Oct 18, 2025", nextVisit: "Oct 25, 2025", gender: "Male", bloodType: "O-" },
    { id: 3, name: "Emma Williams", age: 35, condition: "Pregnancy", status: "Stable", lastVisit: "Oct 12, 2025", nextVisit: "Oct 26, 2025", gender: "Female", bloodType: "B+" },
    { id: 4, name: "James Wilson", age: 55, condition: "Post-surgery recovery", status: "Improving", lastVisit: "Oct 5, 2025", nextVisit: "Nov 5, 2025", gender: "Male", bloodType: "AB+" },
    { id: 5, name: "David Smith", age: 28, condition: "Asthma", status: "Stable", lastVisit: "Sep 30, 2025", nextVisit: "Oct 30, 2025", gender: "Male", bloodType: "A-" },
    { id: 6, name: "Jennifer Garcia", age: 41, condition: "Migraine", status: "Stable", lastVisit: "Oct 8, 2025", nextVisit: "Dec 8, 2025", gender: "Female", bloodType: "O+" },
    { id: 7, name: "Robert Johnson", age: 73, condition: "Arthritis", status: "Chronic", lastVisit: "Oct 3, 2025", nextVisit: "Nov 3, 2025", gender: "Male", bloodType: "B-" },
    { id: 8, name: "Lisa Martinez", age: 32, condition: "Anxiety Disorder", status: "Improving", lastVisit: "Oct 10, 2025", nextVisit: "Nov 10, 2025", gender: "Female", bloodType: "AB-" },
    { id: 9, name: "Thomas Anderson", age: 58, condition: "Coronary Heart Disease", status: "Monitoring", lastVisit: "Oct 7, 2025", nextVisit: "Oct 21, 2025", gender: "Male", bloodType: "O+" },
    { id: 10, name: "Olivia Taylor", age: 25, condition: "Allergies", status: "Stable", lastVisit: "Sep 25, 2025", nextVisit: "Nov 25, 2025", gender: "Female", bloodType: "A+" },
  ];

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Patients</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Import Records</Button>
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input 
          type="text" 
          placeholder="Search patients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="recent">Recent Visits</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4">
            {filteredPatients.map(patient => (
              <Card key={patient.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-muted">
                        <User className="h-6 w-6" />
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{patient.age} yrs</span>
                          <span className="mx-1">•</span>
                          <span>{patient.gender}</span>
                          <span className="mx-1">•</span>
                          <span>{patient.bloodType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        className={
                          patient.status === "Critical" 
                            ? "bg-red-100 text-red-800 border-red-200" 
                            : patient.status === "Improving" 
                              ? "bg-green-100 text-green-800 border-green-200" 
                              : patient.status === "Monitoring"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                        }
                      >
                        {patient.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground mt-1">{patient.condition}</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="text-sm flex space-x-4">
                      <div>
                        <span className="text-muted-foreground">Last Visit:</span> {patient.lastVisit}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Visit:</span> {patient.nextVisit}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="critical">
          <div className="grid gap-4">
            {filteredPatients
              .filter(patient => patient.status === "Critical")
              .map(patient => (
                <Card key={patient.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-muted">
                          <User className="h-6 w-6" />
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{patient.age} yrs</span>
                            <span className="mx-1">•</span>
                            <span>{patient.gender}</span>
                            <span className="mx-1">•</span>
                            <span>{patient.bloodType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          {patient.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground mt-1">{patient.condition}</span>
                      </div>
                    </div>
                    <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                      <div className="text-sm flex space-x-4">
                        <div>
                          <span className="text-muted-foreground">Last Visit:</span> {patient.lastVisit}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Visit:</span> {patient.nextVisit}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid gap-4">
            {filteredPatients
              .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
              .slice(0, 5)
              .map(patient => (
                <Card key={patient.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-muted">
                          <User className="h-6 w-6" />
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{patient.age} yrs</span>
                            <span className="mx-1">•</span>
                            <span>{patient.gender}</span>
                            <span className="mx-1">•</span>
                            <span>{patient.bloodType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge 
                          className={
                            patient.status === "Critical" 
                              ? "bg-red-100 text-red-800 border-red-200" 
                              : patient.status === "Improving" 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : patient.status === "Monitoring"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-blue-100 text-blue-800 border-blue-200"
                          }
                        >
                          {patient.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground mt-1">{patient.condition}</span>
                      </div>
                    </div>
                    <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                      <div className="text-sm flex space-x-4">
                        <div>
                          <span className="text-muted-foreground">Last Visit:</span> {patient.lastVisit}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Visit:</span> {patient.nextVisit}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Patients;