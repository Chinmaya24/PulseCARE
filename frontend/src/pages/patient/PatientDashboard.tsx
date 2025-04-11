
import {
  Activity,
  CalendarClock,
  Heart,
  Info,
  Pill,
  Thermometer,
  Utensils
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Sample data for metrics
  const metrics = [
    {
      title: "Last Checkup",
      value: "3 days ago",
      description: "With Dr. Johnson",
      icon: CalendarClock,
    },
    {
      title: "Medications",
      value: "4 Active",
      description: "Next dose in 2 hours",
      icon: Pill,
    },
    {
      title: "Upcoming Appointment",
      value: "Tomorrow",
      description: "10:30 AM with Dr. Johnson",
      icon: CalendarClock,
    },
    {
      title: "Compliance Score",
      value: "92%",
      description: "Great job!",
      icon: Info,
      trend: {
        value: 4,
        isPositive: true,
      },
    },
  ];

  // Sample data for activity feed
  const activities = [
    {
      id: "1",
      title: "Medication reminder",
      description: "Time to take your blood pressure medication",
      timestamp: "Just now",
      status: "info" as const,
      icon: <Pill className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "New resource available",
      description: "Learn about managing hypertension",
      timestamp: "2 hours ago",
      status: "success" as const,
      icon: <Info className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Doctor's note",
      description: "Dr. Johnson updated your treatment plan",
      timestamp: "Yesterday",
      status: "info" as const,
      icon: <CalendarClock className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Diet recommendation",
      description: "New low-sodium meal plan available",
      timestamp: "2 days ago",
      status: "success" as const,
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Appointment confirmed",
      description: "Your appointment for tomorrow has been confirmed",
      timestamp: "3 hours ago",
      status: "success" as const,
      icon: <CalendarClock className="h-4 w-4" />,
    },
  ];

  // Sample data for vitals chart
  const vitalsData = [
    { day: "Mon", bp: 125, temp: 98.1, heartRate: 75 },
    { day: "Tue", bp: 128, temp: 98.3, heartRate: 78 },
    { day: "Wed", bp: 130, temp: 98.6, heartRate: 82 },
    { day: "Thu", bp: 127, temp: 98.4, heartRate: 76 },
    { day: "Fri", bp: 126, temp: 98.2, heartRate: 74 },
    { day: "Sat", bp: 124, temp: 98.0, heartRate: 72 },
    { day: "Sun", bp: 123, temp: 97.9, heartRate: 71 },
  ];

  // Sample data for symptom chart
  const symptomData = [
    { day: "Mon", pain: 2, fatigue: 3, headache: 1 },
    { day: "Tue", pain: 3, fatigue: 4, headache: 2 },
    { day: "Wed", pain: 4, fatigue: 3, headache: 3 },
    { day: "Thu", pain: 3, fatigue: 2, headache: 2 },
    { day: "Fri", pain: 2, fatigue: 2, headache: 1 },
    { day: "Sat", pain: 1, fatigue: 3, headache: 1 },
    { day: "Sun", pain: 1, fatigue: 2, headache: 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Sarah</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/patient/reports")}>My Medical Records</Button>
          <Button onClick={() => navigate("/patient/health-diary")}>Log Symptoms</Button>
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
            className="stat-card-patient hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              if (metric.title === "Upcoming Appointment" || metric.title === "Last Checkup") {
                navigate("/patient/appointments");
              } else if (metric.title === "Medications") {
                // Navigate to medications page when implemented
              }
            }}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Your Health Trends</CardTitle>
            <Tabs defaultValue="vitals">
              <TabsList>
                <TabsTrigger value="vitals" className="text-xs">
                  <Thermometer className="h-3 w-3 mr-1" /> Vitals
                </TabsTrigger>
                <TabsTrigger value="symptoms" className="text-xs">
                  <Activity className="h-3 w-3 mr-1" /> Symptoms
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="vitals" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalsData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="bp" 
                      name="Blood Pressure" 
                      stroke="#0ea5e9" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      name="Heart Rate" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="symptoms" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={symptomData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="pain" 
                      name="Pain Level" 
                      stroke="#ef4444" 
                      fill="#ef444420" 
                      activeDot={{ r: 6 }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fatigue" 
                      name="Fatigue" 
                      stroke="#f59e0b" 
                      fill="#f59e0b20" 
                      activeDot={{ r: 6 }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="headache" 
                      name="Headache" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf620" 
                      activeDot={{ r: 6 }} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Updates</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8" 
              onClick={() => navigate("/patient/appointments")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ActivityFeed activities={activities} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-4 w-4" />
              Today's Medications
            </CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">Lisinopril 10mg</p>
                  <p className="text-xs text-muted-foreground">8:00 AM with food</p>
                </div>
                <span className="badge-status badge-status-success">Taken</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">Metformin 500mg</p>
                  <p className="text-xs text-muted-foreground">12:00 PM with lunch</p>
                </div>
                <span className="badge-status badge-status-info">Upcoming</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">Aspirin 81mg</p>
                  <p className="text-xs text-muted-foreground">6:00 PM with dinner</p>
                </div>
                <span className="badge-status badge-status-info">Upcoming</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Wellness Tips
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/patient/education")}>More Tips</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium">Stay Hydrated</p>
                <p className="text-sm text-muted-foreground">
                  Remember to drink at least 8 glasses of water daily
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium">Walking Benefits</p>
                <p className="text-sm text-muted-foreground">
                  A 30-minute walk can reduce your blood pressure
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium">Mindful Breathing</p>
                <p className="text-sm text-muted-foreground">
                  Practice 5 minutes of deep breathing to reduce stress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Utensils className="mr-2 h-4 w-4" />
              Dietary Recommendations
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/patient/diet")}>Full Plan</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium">Reduce Sodium</p>
                <p className="text-sm text-muted-foreground">
                  Limit processed foods and added salt
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium">Increase Potassium</p>
                <p className="text-sm text-muted-foreground">
                  Add bananas, spinach, and sweet potatoes to your diet
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium">Healthy Fats</p>
                <p className="text-sm text-muted-foreground">
                  Include avocados, nuts, and olive oil in moderate amounts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
