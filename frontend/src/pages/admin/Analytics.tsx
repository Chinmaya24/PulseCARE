import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Filter, Plus, Search, User, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Analytics = () => {
  // Sample appointments data
  const appointments = [
    { 
      id: 1, 
      patient: "Sarah Jones", 
      type: "Follow-up", 
      date: "2025-04-15", 
      time: "9:00 AM", 
      duration: "30 min",
      status: "Confirmed",
      mode: "In person",
      reason: "Blood pressure check and medication review"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      type: "Lab Results", 
      date: "2025-04-15", 
      time: "10:30 AM", 
      duration: "20 min",
      status: "Confirmed",
      mode: "Virtual",
      reason: "Discuss recent blood work results"
    },
    { 
      id: 3, 
      patient: "Emma Williams", 
      type: "Prenatal Check", 
      date: "2025-04-15", 
      time: "1:00 PM", 
      duration: "45 min",
      status: "Confirmed",
      mode: "In person",
      reason: "Regular prenatal checkup - 33 weeks"
    },
    { 
      id: 4, 
      patient: "James Wilson", 
      type: "Post-op", 
      date: "2025-04-15", 
      time: "2:30 PM", 
      duration: "30 min",
      status: "Confirmed",
      mode: "In person",
      reason: "Post-surgery evaluation"
    },
    { 
      id: 5, 
      patient: "David Smith", 
      type: "Prescription Renewal", 
      date: "2025-04-15", 
      time: "4:00 PM", 
      duration: "15 min",
      status: "Confirmed",
      mode: "Virtual",
      reason: "Asthma medication refill"
    },
    { 
      id: 6, 
      patient: "Jennifer Garcia", 
      type: "Consultation", 
      date: "2025-04-16", 
      time: "9:30 AM", 
      duration: "45 min",
      status: "Pending",
      mode: "In person",
      reason: "Recurring migraine evaluation"
    },
    { 
      id: 7, 
      patient: "Robert Johnson", 
      type: "Therapy", 
      date: "2025-04-16", 
      time: "11:00 AM", 
      duration: "60 min",
      status: "Pending",
      mode: "In person",
      reason: "Arthritis management and therapy plan"
    },
    { 
      id: 8, 
      patient: "Lisa Martinez", 
      type: "Mental Health", 
      date: "2025-04-16", 
      time: "2:00 PM", 
      duration: "45 min",
      status: "Pending",
      mode: "Virtual",
      reason: "Anxiety disorder follow-up"
    },
    { 
      id: 9, 
      patient: "Thomas Anderson", 
      type: "Cardiology", 
      date: "2025-04-17", 
      time: "10:00 AM", 
      duration: "30 min",
      status: "Pending",
      mode: "In person",
      reason: "Heart condition monitoring"
    },
    { 
      id: 10, 
      patient: "Olivia Taylor", 
      type: "Allergy Test", 
      date: "2025-04-17", 
      time: "11:30 AM", 
      duration: "60 min",
      status: "Pending",
      mode: "In person",
      reason: "Comprehensive allergy testing"
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search appointments..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="next_week">Next Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="follow_up">Follow-up</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="lab_results">Lab Results</SelectItem>
              <SelectItem value="therapy">Therapy</SelectItem>
              <SelectItem value="prescription">Prescription</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Appointments for Today</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {appointments.filter(apt => apt.date === "2025-04-15").length} Appointments
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter(apt => apt.date === "2025-04-15")
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 border-2 border-muted">
                          <User className="h-5 w-5" />
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.patient}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{appointment.type}</span>
                            <span className="mx-1">•</span>
                            <span>{appointment.reason.substring(0, 30)}{appointment.reason.length > 30 ? '...' : ''}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-right mr-4">
                          <div className="flex items-center justify-end">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{appointment.time}</span>
                            <span className="ml-1">({appointment.duration})</span>
                          </div>
                          <div className="flex items-center justify-end text-muted-foreground">
                            {appointment.mode === "Virtual" ? (
                              <Video className="h-3 w-3 mr-1" />
                            ) : (
                              <User className="h-3 w-3 mr-1" />
                            )}
                            <span>{appointment.mode}</span>
                          </div>
                        </div>
                        <div className="flex">
                          {appointment.mode === "Virtual" ? (
                            <Button size="sm" className="mr-1">Join</Button>
                          ) : (
                            <Button size="sm" className="mr-1">Check In</Button>
                          )}
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Appointments</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {appointments.filter(apt => apt.date > "2025-04-15").length} Appointments
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter(apt => apt.date > "2025-04-15")
                  .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                  .map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 border-2 border-muted">
                          <User className="h-5 w-5" />
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.patient}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{appointment.type}</span>
                            <span className="mx-1">•</span>
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{appointment.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-right mr-4">
                          <div className="flex items-center justify-end">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{appointment.time}</span>
                            <span className="ml-1">({appointment.duration})</span>
                          </div>
                          <div className="flex items-center justify-end text-muted-foreground">
                            {appointment.mode === "Virtual" ? (
                              <Video className="h-3 w-3 mr-1" />
                            ) : (
                              <User className="h-3 w-3 mr-1" />
                            )}
                            <span>{appointment.mode}</span>
                          </div>
                        </div>
                        <div className="flex">
                          <Button variant="outline" size="sm" className="mr-1">Reschedule</Button>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Past Appointments</h3>
              <p className="text-muted-foreground mb-4">View your appointment history and patient records</p>
              <div className="flex justify-center">
                <Button>View History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;