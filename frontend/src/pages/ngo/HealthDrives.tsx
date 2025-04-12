import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Copy, 
  Edit, 
  FileText, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Trash, 
  TrendingUp, 
  UserCog, 
  Users 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HealthDrives = () => {
  // Sample health drives data
  const healthDrives = [
    { 
      id: 1, 
      name: "Blood Donation Camp", 
      date: "Oct 28, 2025", 
      time: "9:00 AM - 5:00 PM",
      location: "City Central Hospital",
      status: "Upcoming",
      doctorsAssigned: 4,
      volunteersNeeded: 10,
      volunteersConfirmed: 8,
      targetParticipants: 100,
      description: "Blood donation drive to support local hospital blood banks. All blood types needed, especially O negative.",
      leadDoctor: "Dr. Sarah Johnson"
    },
    { 
      id: 2, 
      name: "Free Eye Checkup", 
      date: "Nov 5-6, 2025", 
      time: "10:00 AM - 4:00 PM",
      location: "Community Center, Downtown",
      status: "Upcoming",
      doctorsAssigned: 6,
      volunteersNeeded: 15,
      volunteersConfirmed: 12,
      targetParticipants: 200,
      description: "Comprehensive eye checkups for all age groups. Free prescription glasses for children under 15 from low-income families.",
      leadDoctor: "Dr. Robert Kim"
    },
    { 
      id: 3, 
      name: "Diabetes Screening", 
      date: "Nov 14, 2025", 
      time: "8:00 AM - 3:00 PM",
      location: "Public Park, North District",
      status: "Upcoming",
      doctorsAssigned: 5,
      volunteersNeeded: 12,
      volunteersConfirmed: 10,
      targetParticipants: 150,
      description: "Free diabetes screening, risk assessment, and nutritional counseling for adults above 30 years of age.",
      leadDoctor: "Dr. Maria Gonzalez"
    },
    { 
      id: 4, 
      name: "Women's Health Camp", 
      date: "Nov 25, 2025", 
      time: "9:00 AM - 4:00 PM",
      location: "Women's Community Hall, East District",
      status: "Upcoming",
      doctorsAssigned: 8,
      volunteersNeeded: 20,
      volunteersConfirmed: 15,
      targetParticipants: 300,
      description: "Comprehensive women's health services including breast examinations, pap smears, osteoporosis screening, and reproductive health counseling.",
      leadDoctor: "Dr. Lisa Thompson"
    },
    { 
      id: 5, 
      name: "Pediatric Vaccination Drive", 
      date: "Dec 5, 2025", 
      time: "9:00 AM - 2:00 PM",
      location: "Elementary School, West District",
      status: "Planning",
      doctorsAssigned: 4,
      volunteersNeeded: 10,
      volunteersConfirmed: 5,
      targetParticipants: 150,
      description: "Childhood vaccination clinic offering essential vaccines for children aged 0-12 years. Educational sessions for parents about vaccination importance.",
      leadDoctor: "Dr. Emily Rodriguez"
    },
    { 
      id: 6, 
      name: "Heart Health Screening", 
      date: "Dec 15, 2025", 
      time: "10:00 AM - 3:00 PM",
      location: "Senior Citizens Center",
      status: "Planning",
      doctorsAssigned: 6,
      volunteersNeeded: 12,
      volunteersConfirmed: 6,
      targetParticipants: 120,
      description: "Cardiovascular screening including blood pressure, cholesterol levels, and ECG for seniors above 60 years. Heart-healthy lifestyle counseling.",
      leadDoctor: "Dr. Sarah Johnson"
    },
    { 
      id: 7, 
      name: "Dental Check-up for Children", 
      date: "Oct 5, 2025", 
      time: "9:00 AM - 1:00 PM",
      location: "Public School, South District",
      status: "Completed",
      doctorsAssigned: 5,
      volunteersNeeded: 8,
      volunteersConfirmed: 8,
      targetParticipants: 150,
      participantsReached: 163,
      description: "Dental examinations, cleanings, and education for children aged 5-15. Fluoride treatments and cavity prevention guidance.",
      leadDoctor: "Dr. David Brown",
      outcomes: "163 children screened, 52 referred for treatment, 100% received oral hygiene kits"
    },
    { 
      id: 8, 
      name: "General Health Check-up", 
      date: "Sep 28, 2025", 
      time: "8:00 AM - 5:00 PM",
      location: "Community Plaza",
      status: "Completed",
      doctorsAssigned: 10,
      volunteersNeeded: 25,
      volunteersConfirmed: 22,
      targetParticipants: 400,
      participantsReached: 385,
      description: "Comprehensive health assessment including vital signs, BMI calculation, glucose testing, cholesterol screening, and doctor consultations.",
      leadDoctor: "Dr. Michael Chen",
      outcomes: "385 people screened, 72 referred for further testing, 30 high-risk cases identified"
    },
    { 
      id: 9, 
      name: "Mental Health Awareness", 
      date: "Sep 15, 2025", 
      time: "10:00 AM - 3:00 PM",
      location: "University Campus",
      status: "Completed",
      doctorsAssigned: 4,
      volunteersNeeded: 10,
      volunteersConfirmed: 10,
      targetParticipants: 200,
      participantsReached: 245,
      description: "Mental health screening, stress management workshops, and educational sessions about common mental health conditions and available resources.",
      leadDoctor: "Dr. David Brown",
      outcomes: "245 participants engaged, 35 referred for counseling, 98% reported increased awareness"
    },
    { 
      id: 10, 
      name: "Blood Pressure Control Camp", 
      date: "Aug 25, 2025", 
      time: "9:00 AM - 4:00 PM",
      location: "Shopping Mall, Central District",
      status: "Completed",
      doctorsAssigned: 6,
      volunteersNeeded: 12,
      volunteersConfirmed: 12,
      targetParticipants: 250,
      participantsReached: 278,
      description: "Hypertension screening, risk assessment, and management strategies. Blood pressure monitoring demonstrations and lifestyle counseling.",
      leadDoctor: "Dr. James Wilson",
      outcomes: "278 individuals screened, 53 with high BP referred for treatment, 120 received home monitoring guidance"
    },
  ];

  // Filter health drives by status
  const upcomingDrives = healthDrives.filter(drive => drive.status === "Upcoming");
  const planningDrives = healthDrives.filter(drive => drive.status === "Planning");
  const completedDrives = healthDrives.filter(drive => drive.status === "Completed");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Health Drives</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Health Drive
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingDrives.length})
          </TabsTrigger>
          <TabsTrigger value="planning">
            Planning ({planningDrives.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedDrives.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {upcomingDrives.map(drive => (
              <Card key={drive.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">{drive.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{drive.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{drive.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{drive.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className="text-blue-600 border-blue-200 bg-blue-50"
                      >
                        Upcoming
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <UserCog className="h-3 w-3 mr-1" />
                        <span>{drive.leadDoctor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm mb-4">{drive.description}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Volunteers Confirmed</span>
                          <span>{drive.volunteersConfirmed}/{drive.volunteersNeeded}</span>
                        </div>
                        <Progress value={(drive.volunteersConfirmed / drive.volunteersNeeded) * 100} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <UserCog className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{drive.doctorsAssigned} doctors assigned</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Target: {drive.targetParticipants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Users className="h-4 w-4 mr-1" />
                        Manage Volunteers
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Drive Details
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Drive
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCog className="h-4 w-4 mr-2" />
                            Assign Doctors
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate Drive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            Cancel Drive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="planning">
          <div className="grid gap-4">
            {planningDrives.map(drive => (
              <Card key={drive.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">{drive.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Planned for {drive.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{drive.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{drive.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className="text-purple-600 border-purple-200 bg-purple-50"
                      >
                        Planning
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <UserCog className="h-3 w-3 mr-1" />
                        <span>{drive.leadDoctor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm mb-4">{drive.description}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Planning Progress</span>
                          <span>{Math.round((drive.volunteersConfirmed / drive.volunteersNeeded) * 50)}%</span>
                        </div>
                        <Progress value={(drive.volunteersConfirmed / drive.volunteersNeeded) * 50} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <UserCog className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{drive.doctorsAssigned} doctors assigned</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Target: {drive.targetParticipants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Drive
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserCog className="h-4 w-4 mr-1" />
                        Assign Doctors
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button size="sm">Finalize Drive</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-4">
            {completedDrives.map(drive => (
              <Card key={drive.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">{drive.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{drive.date}</span>
                        <span className="mx-1">•</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{drive.location}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium mt-1">
                        <span className="text-muted-foreground mr-1">Lead:</span>
                        <span>{drive.leadDoctor}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        Completed
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{drive.participantsReached} participants</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm mb-3">{drive.description}</div>
                    <div className="text-sm bg-green-50 border border-green-100 p-2 rounded-md">
                      <div className="font-medium text-green-700 mb-1">Outcomes:</div>
                      <div className="text-green-800">{drive.outcomes}</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View Detailed Report
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        View Impact
                      </Button>
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

export default HealthDrives;