import { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  FileText, 
  Activity, 
  Bell, 
  Download, 
  PlayCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock service for dashboard data - in real app, this would fetch from API
const dashboardService = {
  getDashboardStats: async () => {
    try {
      // In real implementation, this would be an API call
      const response = await fetch('/api/dashboard/stats');
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      // Return mock data as fallback
      return {
        totalPatients: 128,
        appointmentsToday: 15,
        pendingTasks: 8,
        reportsDue: 5
      };
    }
  },
  
  getRecentActivity: async () => {
    try {
      const response = await fetch('/api/dashboard/activity');
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch recent activity:", error);
      // Return mock data as fallback
      return [
        { id: 1, type: "appointment", description: "Completed appointment with John Doe", timestamp: new Date().toISOString() },
        { id: 2, type: "prescription", description: "Prescribed medication to Sarah Williams", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, type: "vitals", description: "Recorded vitals for Michael Brown", timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, type: "report", description: "Reviewed blood work report for Emily Davis", timestamp: new Date(Date.now() - 86400000).toISOString() },
        { id: 5, type: "note", description: "Added clinical notes for Robert Wilson", timestamp: new Date(Date.now() - 172800000).toISOString() }
      ];
    }
  },
  
  getPriorityPatients: async () => {
    try {
      const response = await fetch('/api/dashboard/priority-patients');
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch priority patients:", error);
      // Return mock data as fallback
      return [
        { id: 101, name: "Emma Thompson", status: "critical", lastVitals: { temperature: 103.2, heartRate: 112, bp: "145/95" } },
        { id: 102, name: "James Rodriguez", status: "serious", lastVitals: { temperature: 101.5, heartRate: 95, bp: "160/100" } },
        { id: 103, name: "Linda Chen", status: "stable", lastVitals: { temperature: 98.6, heartRate: 78, bp: "128/82" } },
        { id: 104, name: "Ahmed Patel", status: "critical", lastVitals: { temperature: 104.0, heartRate: 120, bp: "90/60" } },
        { id: 105, name: "Olivia Martin", status: "serious", lastVitals: { temperature: 100.8, heartRate: 88, bp: "138/94" } }
      ];
    }
  },
  
  getTodayAppointments: async () => {
    try {
      const response = await fetch('/api/dashboard/today-appointments');
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch today's appointments:", error);
      // Return mock data as fallback
      return [
        { id: 201, patientName: "Sophie Garcia", time: "09:00 AM", reason: "Annual checkup", status: "checked-in" },
        { id: 202, patientName: "Daniel Kim", time: "10:30 AM", reason: "Follow-up", status: "completed" },
        { id: 203, patientName: "Maria Gonzalez", time: "11:45 AM", reason: "Consultation", status: "pending" },
        { id: 204, patientName: "Tyler Jackson", time: "01:15 PM", reason: "Lab results review", status: "pending" },
        { id: 205, patientName: "Rachel Lee", time: "02:30 PM", reason: "Prescription refill", status: "pending" },
        { id: 206, patientName: "Gabriel Okafor", time: "03:45 PM", reason: "New patient intake", status: "pending" },
        { id: 207, patientName: "Aisha Patel", time: "04:30 PM", reason: "Follow-up", status: "pending" }
      ];
    }
  },
  
  generateDailySummary: async () => {
    try {
      const response = await fetch('/api/dashboard/generate-summary', {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to generate daily summary:", error);
      // Return mock data as fallback
      return {
        date: new Date().toISOString(),
        appointmentsTotal: 12,
        appointmentsCompleted: 8,
        patientsAttended: 14,
        notesAdded: 9,
        prescriptionsIssued: 7,
        averageAppointmentTime: "18 minutes",
        pendingTasks: 3
      };
    }
  },
  
  startRounds: async () => {
    try {
      const response = await fetch('/api/dashboard/start-rounds', {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to start rounds:", error);
      // Return success anyway for mock
      return { success: true, roundsStarted: true, patientsCount: 8 };
    }
  }
};

const ClinicalDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    pendingTasks: 0,
    reportsDue: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [priorityPatients, setPriorityPatients] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [overviewTab, setOverviewTab] = useState("priority");
  
  const navigate = useNavigate();
  
  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [statsData, activityData, priorityData, appointmentsData] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getRecentActivity(),
          dashboardService.getPriorityPatients(),
          dashboardService.getTodayAppointments()
        ]);
        
        setStats(statsData);
        setRecentActivity(activityData);
        setPriorityPatients(priorityData);
        setTodayAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
    
    // Set up polling to refresh data every 5 minutes
    const intervalId = setInterval(fetchDashboardData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Handle selecting a patient
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };
  
  // Generate daily summary
  const handleGenerateSummary = async () => {
    try {
      const summary = await dashboardService.generateDailySummary();
      
      // Show success message
      toast.success("Daily summary generated successfully");
      
      // Create PDF download
      // In a real app, this would call a PDF generation service
      setTimeout(() => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(summary, null, 2)));
        element.setAttribute('download', `daily-summary-${format(new Date(), 'yyyy-MM-dd')}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }, 1000);
      
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate daily summary");
    }
  };
  
  // Start rounds
  const handleStartRounds = async () => {
    try {
      const result = await dashboardService.startRounds();
      
      if (result.success) {
        toast.success(`Rounds started with ${result.patientsCount} patients`);
        // Navigate to rounds page
        navigate('/daily-rounds');
      }
    } catch (error) {
      console.error("Error starting rounds:", error);
      toast.error("Failed to start rounds");
    }
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'critical':
        return "bg-red-500 hover:bg-red-600";
      case 'serious':
        return "bg-orange-500 hover:bg-orange-600";
      case 'stable':
        return "bg-green-500 hover:bg-green-600";
      case 'checked-in':
        return "bg-blue-500 hover:bg-blue-600";
      case 'completed':
        return "bg-gray-500 hover:bg-gray-600";
      case 'pending':
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-slate-500 hover:bg-slate-600";
    }
  };
  
  // Format date for display
  const formatActivityTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'h:mm a');
    }
    
    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return format(date, 'MMM d');
    }
    
    // Otherwise show full date
    return format(date, 'MMM d, yyyy');
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clinical Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleGenerateSummary}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Daily Summary
          </Button>
          <Button onClick={handleStartRounds}>
            <PlayCircle className="mr-2 h-4 w-4" />
            Start Rounds
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Under your care</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : stats.appointmentsToday}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Due</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : stats.reportsDue}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Daily Overview */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Overview</CardTitle>
            <CardDescription>
              Manage priority patients and today's appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={overviewTab} onValueChange={setOverviewTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="priority">Priority Patients</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="priority" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Patient List</h3>
                    {isLoading ? (
                      <div className="flex items-center justify-center h-40">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                      </div>
                    ) : priorityPatients.length > 0 ? (
                      <ScrollArea className="h-[300px]">
                        {priorityPatients.map((patient) => (
                          <button
                            key={patient.id}
                            className={`w-full flex items-center justify-between p-3 mb-2 rounded-lg hover:bg-muted ${selectedPatient?.id === patient.id ? 'bg-muted' : ''}`}
                            onClick={() => handlePatientSelect(patient)}
                          >
                            <div className="flex items-center">
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {patient.id}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </button>
                        ))}
                      </ScrollArea>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">No priority patients</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Patient Details</h3>
                    {selectedPatient ? (
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">{selectedPatient.name}</h4>
                          <Badge className={getStatusColor(selectedPatient.status)}>
                            {selectedPatient.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-muted/20 rounded">
                              <p className="text-xs text-muted-foreground">Temperature</p>
                              <p className="font-medium">{selectedPatient.lastVitals.temperature} °F</p>
                            </div>
                            <div className="p-2 bg-muted/20 rounded">
                              <p className="text-xs text-muted-foreground">Heart Rate</p>
                              <p className="font-medium">{selectedPatient.lastVitals.heartRate} bpm</p>
                            </div>
                          </div>
                          <div className="p-2 bg-muted/20 rounded">
                            <p className="text-xs text-muted-foreground">Blood Pressure</p>
                            <p className="font-medium">{selectedPatient.lastVitals.bp} mmHg</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button size="sm" onClick={() => navigate(`/patients/${selectedPatient.id}`)}>
                            View Full Profile
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">Select a patient to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appointments">
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : todayAppointments.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {todayAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{appointment.patientName}</span>
                              <span className="text-xs text-muted-foreground ml-2">({appointment.time})</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <Button size="sm" variant="outline" 
                              onClick={() => navigate(`/appointments/${appointment.id}`)}>
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">No appointments scheduled for today</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest clinical actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : recentActivity.length > 0 ? (
              <ScrollArea className="h-[350px]">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-primary" />}
                          {activity.type === 'prescription' && <ClipboardList className="h-4 w-4 text-primary" />}
                          {activity.type === 'vitals' && <Activity className="h-4 w-4 text-primary" />}
                          {activity.type === 'report' && <FileText className="h-4 w-4 text-primary" />}
                          {activity.type === 'note' && <FileText className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatActivityTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/activity-log')}>
              View Full Activity Log
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ClinicalDashboard;