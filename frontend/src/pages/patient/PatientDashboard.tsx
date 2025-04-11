import { useState, useEffect } from "react";
import {
  Activity,
  CalendarClock,
  Heart,
  Info,
  Pill,
  Thermometer,
  Utensils,
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
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Interfaces
interface User {
  id: string;
  name: string;
  email: string;
  lastCheckup: string;
  medications: {
    count: number;
    nextDose: string;
  };
  upcomingAppointment?: {
    date: string;
    time: string;
    doctor: string;
  };
  complianceScore: {
    value: number;
    trend: {
      value: number;
      isPositive: boolean;
    };
  };
}

interface VitalData {
  day: string;
  bp: number;
  temp: number;
  heartRate: number;
}

interface SymptomData {
  day: string;
  pain: number;
  fatigue: number;
  headache: number;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
}

interface Medication {
  name: string;
  time: string;
  status: "Taken" | "Upcoming" | "Missed";
}

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [vitalsData, setVitalsData] = useState<VitalData[]>([]);
  const [symptomData, setSymptomData] = useState<SymptomData[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthTab, setHealthTab] = useState("vitals");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [
          userDataResult,
          vitalsDataResult,
          symptomDataResult,
          activitiesResult,
          medicationsResult,
        ] = await Promise.all([
          patientService.getUserData(),
          patientService.getVitalsData(),
          patientService.getSymptomData(),
          patientService.getRecentActivities(),
          patientService.getMedicationData(),
        ]);

        setUserData(userDataResult);
        setVitalsData(vitalsDataResult);
        setSymptomData(symptomDataResult);
        setActivities(activitiesResult);
        setMedications(medicationsResult);
      } catch (error) {
        console.error("Error fetching patient dashboard data:", error);
        toast.error("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMetrics = () => {
    if (!userData) return [];
    
    return [
      {
        title: "Last Checkup",
        value: userData.lastCheckup,
        description: "With Dr. Johnson",
        icon: CalendarClock,
      },
      {
        title: "Medications",
        value: `${userData.medications.count} Active`,
        description: `Next dose in ${userData.medications.nextDose}`,
        icon: Pill,
      },
      {
        title: "Upcoming Appointment",
        value: userData.upcomingAppointment?.date || "None",
        description: userData.upcomingAppointment 
          ? `${userData.upcomingAppointment.time} with ${userData.upcomingAppointment.doctor}` 
          : "No appointments scheduled",
        icon: CalendarClock,
      },
      {
        title: "Compliance Score",
        value: `${userData.complianceScore.value}%`,
        description: "Great job!",
        icon: Info,
        trend: userData.complianceScore.trend,
      },
    ];
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {isLoading ? "..." : userData?.name.split(' ')[0]}
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/patient/reports")}>
            My Medical Records
          </Button>
          <Button onClick={() => navigate("/patient/health-diary")}>Log Symptoms</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 w-1/2 bg-muted rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-7 w-16 bg-muted rounded mb-2" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {getMetrics().map((metric, index) => (
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
                  toast.info("Navigating to medications would go here");
                }
              }}
            />
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Your Health Trends</CardTitle>
            <Tabs value={healthTab} onValueChange={setHealthTab}>
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
            {isLoading ? (
              <div className="h-[300px] bg-muted/20 animate-pulse rounded-md" />
            ) : (
              <div className="h-[300px]">
                {healthTab === "vitals" ? (
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
                ) : (
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
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Updates</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate("/patient/appointments")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 py-3">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-1/2 bg-muted rounded" />
                    </div>
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <ActivityFeed activities={activities} />
            )}
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
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {medications.map((med, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-xs text-muted-foreground">{med.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      med.status === "Taken" 
                        ? "bg-green-100 text-green-800" 
                        : med.status === "Missed"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}>
                      {med.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded" />
                ))}
              </div>
            ) : (
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
            )}
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
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded" />
                ))}
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const patientService = {
  getUserData: async (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "123",
          name: "Sarah Jones",
          email: "sarah.jones@example.com",
          lastCheckup: "3 days ago",
          medications: {
            count: 4,
            nextDose: "2 hours",
          },
          upcomingAppointment: {
            date: "Tomorrow",
            time: "10:30 AM",
            doctor: "Dr. Johnson",
          },
          complianceScore: {
            value: 92,
            trend: {
              value: 4,
              isPositive: true,
            },
          },
        });
      }, 500);
    });
  },

  getVitalsData: async (): Promise<VitalData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { day: "Mon", bp: 125, temp: 98.1, heartRate: 75 },
          { day: "Tue", bp: 128, temp: 98.3, heartRate: 78 },
          { day: "Wed", bp: 130, temp: 98.6, heartRate: 82 },
          { day: "Thu", bp: 127, temp: 98.4, heartRate: 76 },
          { day: "Fri", bp: 126, temp: 98.2, heartRate: 74 },
          { day: "Sat", bp: 124, temp: 98.0, heartRate: 72 },
          { day: "Sun", bp: 123, temp: 97.9, heartRate: 71 },
        ]);
      }, 500);
    });
  },

  getSymptomData: async (): Promise<SymptomData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { day: "Mon", pain: 2, fatigue: 3, headache: 1 },
          { day: "Tue", pain: 3, fatigue: 4, headache: 2 },
          { day: "Wed", pain: 4, fatigue: 3, headache: 3 },
          { day: "Thu", pain: 3, fatigue: 2, headache: 2 },
          { day: "Fri", pain: 2, fatigue: 2, headache: 1 },
          { day: "Sat", pain: 1, fatigue: 3, headache: 1 },
          { day: "Sun", pain: 1, fatigue: 2, headache: 0 },
        ]);
      }, 700);
    });
  },

  getRecentActivities: async (): Promise<ActivityItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Medication reminder",
            description: "Time to take your blood pressure medication",
            timestamp: "Just now",
            status: "info",
            icon: <Pill className="h-4 w-4" />,
          },
          {
            id: "2",
            title: "New resource available",
            description: "Learn about managing hypertension",
            timestamp: "2 hours ago",
            status: "success",
            icon: <Info className="h-4 w-4" />,
          },
          {
            id: "3",
            title: "Doctor's note",
            description: "Dr. Johnson updated your treatment plan",
            timestamp: "Yesterday",
            status: "info",
            icon: <CalendarClock className="h-4 w-4" />,
          },
          {
            id: "4",
            title: "Diet recommendation",
            description: "New low-sodium meal plan available",
            timestamp: "2 days ago",
            status: "success",
            icon: <Utensils className="h-4 w-4" />,
          },
          {
            id: "5",
            title: "Appointment confirmed",
            description: "Your appointment for tomorrow has been confirmed",
            timestamp: "3 hours ago",
            status: "success",
            icon: <CalendarClock className="h-4 w-4" />,
          },
        ]);
      }, 700);
    });
  },

  getMedicationData: async (): Promise<Medication[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: "Lisinopril 10mg", time: "8:00 AM with food", status: "Taken" },
          { name: "Metformin 500mg", time: "12:00 PM with lunch", status: "Upcoming" },
          { name: "Aspirin 81mg", time: "6:00 PM with dinner", status: "Upcoming" },
          { name: "Atorvastatin 20mg", time: "9:00 PM", status: "Upcoming" },
        ]);
      }, 600);
    });
  },
};

export default PatientDashboard;