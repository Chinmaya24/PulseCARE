import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarClock,
  ClipboardList,
  Download,
  FileText,
  Pill,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

// Interface for patient data
interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: "Stable" | "Critical" | "Improving";
}

// Interface for appointment data
interface Appointment {
  id: string;
  patient: string;
  time: string;
  type: string;
  date: Date;
}

// Interface for activity data
interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
}

// Mockup of an API service (to be replaced with real API calls)
const clinicianService = {
  getPatientCount: async (): Promise<number> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(24), 500);
    });
  },

  getTodayAppointments: async (): Promise<Appointment[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", patient: "Sarah Jones", time: "9:00 AM", type: "Follow-up", date: new Date() },
          { id: "2", patient: "Michael Brown", time: "10:30 AM", type: "Lab Results", date: new Date() },
          { id: "3", patient: "Emma Williams", time: "1:00 PM", type: "Prenatal Check", date: new Date() },
          { id: "4", patient: "James Wilson", time: "2:30 PM", type: "Post-op", date: new Date() },
          { id: "5", patient: "David Smith", time: "4:00 PM", type: "Prescription Renewal", date: new Date() },
        ]);
      }, 500);
    });
  },

  getPendingTasks: async (): Promise<number> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(3), 500);
    });
  },

  getPendingReports: async (): Promise<number> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(2), 500);
    });
  },

  getPriorityPatients: async (): Promise<Patient[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", name: "Sarah Jones", age: 45, condition: "Hypertension", status: "Stable" },
          { id: "2", name: "Michael Brown", age: 62, condition: "Diabetes Type 2", status: "Critical" },
          { id: "3", name: "Emma Williams", age: 35, condition: "Pregnancy", status: "Stable" },
          { id: "4", name: "James Wilson", age: 55, condition: "Post-surgery recovery", status: "Improving" },
          { id: "5", name: "David Smith", age: 28, condition: "Asthma", status: "Stable" },
        ]);
      }, 500);
    });
  },

  getRecentActivities: async (): Promise<Activity[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "New patient assigned",
            description: "John Doe has been assigned to your care",
            timestamp: "10 min ago",
            status: "info",
            icon: <User className="h-4 w-4" />,
          },
          {
            id: "2",
            title: "Abnormal vital detected",
            description: "High blood pressure for Sarah Jones",
            timestamp: "30 min ago",
            status: "warning",
            icon: <Activity className="h-4 w-4" />,
          },
          {
            id: "3",
            title: "Medication update",
            description: "Prescription updated for David Smith",
            timestamp: "1 hour ago",
            status: "success",
            icon: <Pill className="h-4 w-4" />,
          },
          {
            id: "4",
            title: "Report completed",
            description: "Daily summary for ward 4 is ready",
            timestamp: "3 hours ago",
            status: "success",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            id: "5",
            title: "Missed appointment",
            description: "Emily Wilson missed her follow-up",
            timestamp: "Yesterday",
            status: "error",
            icon: <CalendarClock className="h-4 w-4" />,
          },
        ]);
      }, 500);
    });
  },

  generateDailySummary: async (): Promise<{
    date: string;
    appointmentsAttended: number;
    patientsChecked: number;
    reportsCompleted: number;
    medicationsOrdered: number;
    totalHours: string;
  }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          date: new Date().toLocaleDateString(),
          appointmentsAttended: 8,
          patientsChecked: 12,
          reportsCompleted: 5,
          medicationsOrdered: 14,
          totalHours: "7.5",
        });
      }, 1000);
    });
  },

  startRounds: async (): Promise<{
    ward: string;
    patientsToVisit: Array<{ name: string; room: string; priority: "High" | "Medium" | "Low" }>;
  }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ward: "Cardiology Ward",
          patientsToVisit: [
            { name: "Sarah Jones", room: "A-101", priority: "High" },
            { name: "Michael Brown", room: "A-105", priority: "Medium" },
            { name: "James Wilson", room: "A-110", priority: "High" },
            { name: "David Smith", room: "A-112", priority: "Low" },
          ],
        });
      }, 1000);
    });
  },
};

const ClinicianDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [patientCount, setPatientCount] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState<Appointment[]>([]);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [priorityPatients, setPriorityPatients] = useState<Patient[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [roundsDialogOpen, setRoundsDialogOpen] = useState(false);
  const [dailySummary, setDailySummary] = useState<any>(null);
  const [roundsData, setRoundsData] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Fetch all needed data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [
          patientCountData,
          appointmentsTodayData,
          pendingTasksData,
          pendingReportsData,
          priorityPatientsData,
          activitiesData,
        ] = await Promise.all([
          clinicianService.getPatientCount(),
          clinicianService.getTodayAppointments(),
          clinicianService.getPendingTasks(),
          clinicianService.getPendingReports(),
          clinicianService.getPriorityPatients(),
          clinicianService.getRecentActivities(),
        ]);

        // Update state with fetched data
        setPatientCount(patientCountData);
        setAppointmentsToday(appointmentsTodayData);
        setPendingTasks(pendingTasksData);
        setPendingReports(pendingReportsData);
        setPriorityPatients(priorityPatientsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching clinician dashboard data:", error);
        toast.error("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle generate daily summary button click
  const handleGenerateSummary = async () => {
    try {
      const summary = await clinicianService.generateDailySummary();
      setDailySummary(summary);
      setSummaryDialogOpen(true);
    } catch (error) {
      console.error("Error generating daily summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    }
  };

  // Handle start rounds button click
  const handleStartRounds = async () => {
    try {
      const rounds = await clinicianService.startRounds();
      setRoundsData(rounds);
      setRoundsDialogOpen(true);
    } catch (error) {
      console.error("Error starting rounds:", error);
      toast.error("Failed to start rounds. Please try again.");
    }
  };

  // Handle download PDF
  const handleDownloadPDF = () => {
    toast.success("Summary PDF downloaded successfully!");
    setSummaryDialogOpen(false);
  };

  // Handle patient click
  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  // Sample data for metrics
  const metrics = [
    {
      title: "Total Patients",
      value: patientCount.toString(),
      description: "Active patients under your care",
      icon: Users,
    },
    {
      title: "Appointments Today",
      value: appointmentsToday.length.toString(),
      description: "Scheduled for today",
      icon: CalendarClock,
      trend: {
        value: 5,
        isPositive: true,
      },
    },
    {
      title: "Pending Tasks",
      value: pendingTasks.toString(),
      description: "Require your attention",
      icon: ClipboardList,
    },
    {
      title: "Reports Due",
      value: pendingReports.toString(),
      description: "Need to be completed",
      icon: FileText,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clinician Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleGenerateSummary}>Generate Daily Summary</Button>
          <Button onClick={handleStartRounds}>Start Rounds</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-7 w-16 bg-muted rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
              trend={metric.trend}
              className="stat-card-clinician"
            />
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 py-3">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-3/4 bg-muted rounded"></div>
                      <div className="h-3 w-1/2 bg-muted rounded"></div>
                    </div>
                    <div className="h-3 w-16 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ActivityFeed activities={activities} />
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patients">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patients">Priority Patients</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
              <TabsContent value="patients" className="mt-4">
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {priorityPatients.map((patient) => (
                      <div 
                        key={patient.id} 
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => handlePatientClick(patient)}
                      >
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} yrs - {patient.condition}
                          </p>
                        </div>
                        <span 
                          className={`badge-status ${
                            patient.status === "Critical" 
                              ? "badge-status-error" 
                              : patient.status === "Improving" 
                                ? "badge-status-success" 
                                : "badge-status-info"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="appointments" className="mt-4">
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointmentsToday.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium">{apt.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {apt.time} - {apt.type}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Daily Summary Dialog */}
      <Dialog open={summaryDialogOpen} onOpenChange={setSummaryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Daily Summary: {dailySummary?.date}</DialogTitle>
          </DialogHeader>
          {dailySummary && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Appointments</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{dailySummary.appointmentsAttended}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Patients</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{dailySummary.patientsChecked}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{dailySummary.reportsCompleted}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Medications</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{dailySummary.medicationsOrdered}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Total hours worked: {dailySummary.totalHours}</p>
                <p className="text-sm text-muted-foreground">This summary includes all clinical activities recorded in the system for today.</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSummaryDialogOpen(false)}>Close</Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rounds Dialog */}
      <Dialog open={roundsDialogOpen} onOpenChange={setRoundsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Starting Rounds: {roundsData?.ward}</DialogTitle>
          </DialogHeader>
          {roundsData && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">You have {roundsData.patientsToVisit.length} patients to visit today.</p>
              <div className="space-y-3">
                {roundsData.patientsToVisit.map((patient: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md border">
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">Room: {patient.room}</p>
                    </div>
                    <span 
                      className={`badge-status ${
                        patient.priority === "High" 
                          ? "badge-status-error" 
                          : patient.priority === "Medium" 
                            ? "badge-status-warning" 
                            : "badge-status-info"
                      }`}
                    >
                      {patient.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoundsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setRoundsDialogOpen(false);
              navigate("/clinician/rounds");
              toast.success("Rounds started successfully!");
            }}>
              Start Rounds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Details Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Patient Details: {selectedPatient?.name}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Age:</p>
                  <p className="text-sm">{selectedPatient.age} years</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Condition:</p>
                  <p className="text-sm">{selectedPatient.condition}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Status:</p>
                  <p className={`text-sm font-medium ${
                    selectedPatient.status === "Critical" 
                      ? "text-destructive" 
                      : selectedPatient.status === "Improving" 
                        ? "text-green-600" 
                        : "text-blue-600"
                  }`}>
                    {selectedPatient.status}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Recent Vitals:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 bg-muted/50 rounded text-center">
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="font-medium">130/85</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center">
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="font-medium">78 bpm</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center">
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="font-medium">98.6°F</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center">
                    <p className="text-xs text-muted-foreground">Oxygen</p>
                    <p className="font-medium">97%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedPatient(null)}>Close</Button>
            <Button onClick={() => {
              setSelectedPatient(null);
              navigate(`/clinician/patients/${selectedPatient?.id}`);
            }}>
              View Full Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicianDashboard;