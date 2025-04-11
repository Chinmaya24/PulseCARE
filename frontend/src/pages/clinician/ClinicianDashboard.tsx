import {
  Activity,
  CalendarClock,
  ClipboardList,
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

const ClinicianDashboard = () => {
  // Sample data for metrics
  const metrics = [
    {
      title: "Total Patients",
      value: "24",
      description: "Active patients under your care",
      icon: Users,
    },
    {
      title: "Appointments Today",
      value: "8",
      description: "Scheduled for today",
      icon: CalendarClock,
      trend: {
        value: 5,
        isPositive: true,
      },
    },
    {
      title: "Pending Tasks",
      value: "3",
      description: "Require your attention",
      icon: ClipboardList,
    },
    {
      title: "Reports Due",
      value: "2",
      description: "Need to be completed",
      icon: FileText,
    },
  ];

  // Sample data for activity feed
  const activities = [
    {
      id: "1",
      title: "New patient assigned",
      description: "John Doe has been assigned to your care",
      timestamp: "10 min ago",
      status: "info" as const,
      icon: <User className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "Abnormal vital detected",
      description: "High blood pressure for Sarah Jones",
      timestamp: "30 min ago",
      status: "warning" as const,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Medication update",
      description: "Prescription updated for David Smith",
      timestamp: "1 hour ago",
      status: "success" as const,
      icon: <Pill className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Report completed",
      description: "Daily summary for ward 4 is ready",
      timestamp: "3 hours ago",
      status: "success" as const,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Missed appointment",
      description: "Emily Wilson missed her follow-up",
      timestamp: "Yesterday",
      status: "error" as const,
      icon: <CalendarClock className="h-4 w-4" />,
    },
  ];

  // Sample patient data
  const patients = [
    { id: 1, name: "Sarah Jones", age: 45, condition: "Hypertension", status: "Stable" },
    { id: 2, name: "Michael Brown", age: 62, condition: "Diabetes Type 2", status: "Critical" },
    { id: 3, name: "Emma Williams", age: 35, condition: "Pregnancy", status: "Stable" },
    { id: 4, name: "James Wilson", age: 55, condition: "Post-surgery recovery", status: "Improving" },
    { id: 5, name: "David Smith", age: 28, condition: "Asthma", status: "Stable" },
  ];

  // Sample appointment data
  const appointments = [
    { id: 1, patient: "Sarah Jones", time: "9:00 AM", type: "Follow-up" },
    { id: 2, name: "Michael Brown", time: "10:30 AM", type: "Lab Results" },
    { id: 3, name: "Emma Williams", time: "1:00 PM", type: "Prenatal Check" },
    { id: 4, name: "James Wilson", time: "2:30 PM", type: "Post-op" },
    { id: 5, name: "David Smith", time: "4:00 PM", type: "Prescription Renewal" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clinician Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Generate Daily Summary</Button>
          <Button>Start Rounds</Button>
        </div>
      </div>

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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed activities={activities} />
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
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
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
              </TabsContent>
              <TabsContent value="appointments" className="mt-4">
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{apt.patient || apt.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.time} - {apt.type}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicianDashboard;
