import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarClock, 
  CheckCircle, 
  Clock, 
  File, 
  Filter,
  MoreHorizontal, 
  RotateCcw, 
  Search, 
  User, 
  UserCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PatientsReferred = () => {
  // Sample patients data
  const patients = [
    { 
      id: 1, 
      name: "Maria Garcia", 
      age: 34, 
      referredTo: "Dr. Sarah Johnson", 
      specialty: "Cardiology",
      condition: "Hypertension",
      status: "Active",
      date: "2025-04-08",
      lastCheckup: "2025-04-10",
      nextAppointment: "2025-05-10",
      notes: "Patient from rural community with limited access to specialized care. Hypertension needs regular monitoring."
    },
    { 
      id: 2, 
      name: "John Miller", 
      age: 45, 
      referredTo: "Dr. Michael Chen", 
      specialty: "Neurology",
      condition: "Recurring Migraines",
      status: "Active",
      date: "2025-04-02",
      lastCheckup: "2025-04-12",
      nextAppointment: "2025-04-26",
      notes: "Works long hours as a truck driver, experiencing frequent migraines that impact ability to work."
    },
    { 
      id: 3, 
      name: "Aisha Khan", 
      age: 28, 
      referredTo: "Dr. Emily Rodriguez", 
      specialty: "Endocrinology",
      condition: "Gestational Diabetes",
      status: "Active",
      date: "2025-03-28",
      lastCheckup: "2025-04-11",
      nextAppointment: "2025-04-25",
      notes: "Pregnant woman in second trimester with gestational diabetes. Needs nutritional guidance and monitoring."
    },
    { 
      id: 4, 
      name: "Roberto Fernandez", 
      age: 67, 
      referredTo: "Dr. James Wilson", 
      specialty: "Orthopedics",
      condition: "Osteoarthritis",
      status: "Active",
      date: "2025-03-20",
      lastCheckup: "2025-04-05",
      nextAppointment: "2025-05-05",
      notes: "Elderly farmworker with severe osteoarthritis affecting mobility. Limited financial resources for treatment."
    },
    { 
      id: 5, 
      name: "Lakshmi Patel", 
      age: 52, 
      referredTo: "Dr. Thomas Martin", 
      specialty: "Pulmonology",
      condition: "COPD",
      status: "Active",
      date: "2025-03-15",
      lastCheckup: "2025-04-01",
      nextAppointment: "2025-05-01",
      notes: "History of working in textile factory with poor ventilation. Advanced COPD requiring specialized care."
    },
    { 
      id: 6, 
      name: "Wei Chen", 
      age: 7, 
      referredTo: "Dr. Emily Rodriguez", 
      specialty: "Pediatrics",
      condition: "Asthma",
      status: "Completed",
      date: "2025-02-10",
      lastCheckup: "2025-04-10",
      nextAppointment: "N/A",
      notes: "Child with severe asthma from low-income family. Treatment plan completed, symptoms managed successfully."
    },
    { 
      id: 7, 
      name: "Olivia Jackson", 
      age: 39, 
      referredTo: "Dr. Sophia Patel", 
      specialty: "Dermatology",
      condition: "Eczema",
      status: "Completed",
      date: "2025-02-05",
      lastCheckup: "2025-03-20",
      nextAppointment: "N/A",
      notes: "Single mother of three with chronic eczema affecting ability to work. Treatment completed successfully."
    },
    { 
      id: 8, 
      name: "Gabriel Santos", 
      age: 42, 
      referredTo: "Dr. Andrew Davis", 
      specialty: "Gastroenterology",
      condition: "Ulcerative Colitis",
      status: "Completed",
      date: "2025-01-30",
      lastCheckup: "2025-03-15",
      nextAppointment: "N/A",
      notes: "Construction worker without health insurance. Condition now well-managed with medication and dietary changes."
    },
    { 
      id: 9, 
      name: "Fatima Ahmed", 
      age: 62, 
      referredTo: "Dr. Lisa Thompson", 
      specialty: "Gynecology",
      condition: "Ovarian Cyst",
      status: "Completed",
      date: "2025-01-25",
      lastCheckup: "2025-03-10",
      nextAppointment: "N/A",
      notes: "Refugee with limited English proficiency. Required translator services. Treatment was successful."
    },
    { 
      id: 10, 
      name: "Samuel Okoro", 
      age: 56, 
      referredTo: "Dr. Sarah Johnson", 
      specialty: "Cardiology",
      condition: "Arrhythmia",
      status: "Pending",
      date: "2025-04-10",
      lastCheckup: "N/A",
      nextAppointment: "2025-04-20",
      notes: "Recently arrived immigrant with history of cardiac issues. Needs urgent assessment and monitoring."
    },
  ];

  // Filter patients by status
  const activePatients = patients.filter(patient => patient.status === "Active");
  const pendingPatients = patients.filter(patient => patient.status === "Pending");
  const completedPatients = patients.filter(patient => patient.status === "Completed");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patients Referred</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <File className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <UserCheck className="mr-2 h-4 w-4" />
            New Referral
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search patients..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              <SelectItem value="sarah">Dr. Sarah Johnson</SelectItem>
              <SelectItem value="michael">Dr. Michael Chen</SelectItem>
              <SelectItem value="emily">Dr. Emily Rodriguez</SelectItem>
              <SelectItem value="james">Dr. James Wilson</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">
            Active ({activePatients.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingPatients.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedPatients.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid gap-4">
            {activePatients.map(patient => (
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
                          <span>{patient.age} years</span>
                          <span className="mx-1">•</span>
                          <span>{patient.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        Active Care
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>Referred on {patient.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-3">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium mr-1">Referred to:</span>
                      <span className="text-sm">{patient.referredTo}</span>
                      <span className="mx-1 text-sm">•</span>
                      <span className="text-sm text-muted-foreground">{patient.specialty}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{patient.notes}</div>
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last checkup: {patient.lastCheckup}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>Next appointment: {patient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Update Status
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button size="sm">View Details</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Contact Doctor</DropdownMenuItem>
                          <DropdownMenuItem>Contact Patient</DropdownMenuItem>
                          <DropdownMenuItem>View Medical Records</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <div className="grid gap-4">
            {pendingPatients.map(patient => (
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
                          <span>{patient.age} years</span>
                          <span className="mx-1">•</span>
                          <span>{patient.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        className="bg-yellow-100 text-yellow-800 border-yellow-200"
                      >
                        Pending
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>Referred on {patient.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-3">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium mr-1">Referred to:</span>
                      <span className="text-sm">{patient.referredTo}</span>
                      <span className="mx-1 text-sm">•</span>
                      <span className="text-sm text-muted-foreground">{patient.specialty}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{patient.notes}</div>
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>Upcoming appointment: {patient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm Appointment
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-4">
            {completedPatients.map(patient => (
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
                          <span>{patient.age} years</span>
                          <span className="mx-1">•</span>
                          <span>{patient.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        className="bg-blue-100 text-blue-800 border-blue-200"
                      >
                        Completed
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>Referred on {patient.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-3">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium mr-1">Referred to:</span>
                      <span className="text-sm">{patient.referredTo}</span>
                      <span className="mx-1 text-sm">•</span>
                      <span className="text-sm text-muted-foreground">{patient.specialty}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{patient.notes}</div>
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last checkup: {patient.lastCheckup}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reactivate
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Summary</Button>
                    </div>
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

export default PatientsReferred;