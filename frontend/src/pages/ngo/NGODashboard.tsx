import { useState, useEffect } from "react";
import {
  Calendar,
  Globe,
  HeartPulse,
  Layout,
  LineChart,
  Loader2,
  MapPin,
  Plus,
  PlusCircle,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Line, 
  LineChart as ReLineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Campaign interface
interface Campaign {
  id: string;
  name: string;
  location: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Ending Soon" | "Just Started" | "Planning" | "Completed";
}

// Health drive interface
interface HealthDrive {
  id: string;
  name: string;
  date: string;
  location: string;
  doctors: number;
  registered?: number;
  capacity?: number;
}

// Activity interface
interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
}

// Impact data interface
interface ImpactData {
  month: string;
  patients: number;
  events: number;
}

// NGO service for data operations
const ngoService = {
  getDashboardMetrics: async (): Promise<{
    campaignsActive: number;
    patientsReached: number;
    doctorsPartnered: number;
    drivesThisMonth: number;
  }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          campaignsActive: 4,
          patientsReached: 428,
          doctorsPartnered: 23,
          drivesThisMonth: 3,
        });
      }, 800);
    });
  },

  getCampaigns: async (): Promise<Campaign[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: "1", 
            name: "Diabetes Awareness Drive", 
            location: "Multiple Locations", 
            progress: 65, 
            startDate: "Oct 10", 
            endDate: "Nov 10",
            status: "Ongoing"
          },
          { 
            id: "2", 
            name: "Vision Care for All", 
            location: "Rural Districts", 
            progress: 40, 
            startDate: "Sep 15", 
            endDate: "Nov 30",
            status: "Ongoing"
          },
          { 
            id: "3", 
            name: "Women's Health Initiative", 
            location: "Urban Centers", 
            progress: 85, 
            startDate: "Aug 1", 
            endDate: "Oct 31",
            status: "Ending Soon"
          },
          { 
            id: "4", 
            name: "Child Vaccination Program", 
            location: "Schools & Community Centers", 
            progress: 20, 
            startDate: "Oct 15", 
            endDate: "Dec 15",
            status: "Just Started"
          },
        ]);
      }, 700);
    });
  },

  getHealthDrives: async (): Promise<HealthDrive[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", name: "Blood Donation Camp", date: "Oct 28, 2025", location: "City Central Hospital", doctors: 4, registered: 45, capacity: 100 },
          { id: "2", name: "Free Eye Checkup", date: "Nov 5-6, 2025", location: "Community Center, Downtown", doctors: 6, registered: 78, capacity: 150 },
          { id: "3", name: "Diabetes Screening", date: "Nov 14, 2025", location: "Public Park, North District", doctors: 3, registered: 23, capacity: 120 },
        ]);
      }, 600);
    });
  },

  getRecentActivities: async (): Promise<Activity[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Blood donation camp approved",
            description: "City Central Hospital, Oct 28",
            timestamp: "30 min ago",
            status: "success",
            icon: <HeartPulse className="h-4 w-4" />,
          },
          {
            id: "2",
            title: "New patient referrals",
            description: "5 patients referred to Dr. Johnson",
            timestamp: "2 hours ago",
            status: "info",
            icon: <Users className="h-4 w-4" />,
          },
          {
            id: "3",
            title: "Campaign goals updated",
            description: "Diabetes Awareness targets revised",
            timestamp: "Yesterday",
            status: "info",
            icon: <Target className="h-4 w-4" />,
          },
          {
            id: "4",
            title: "Partner hospital joined",
            description: "Metro Health Center partnership confirmed",
            timestamp: "2 days ago",
            status: "success",
            icon: <Globe className="h-4 w-4" />,
          },
          {
            id: "5",
            title: "Campaign funding received",
            description: "Vision Care program received $5000 funding",
            timestamp: "3 days ago",
            status: "success",
            icon: <Layout className="h-4 w-4" />,
          },
        ]);
      }, 750);
    });
  },

  getImpactData: async (): Promise<ImpactData[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { month: "Jul", patients: 320, events: 2 },
          { month: "Aug", patients: 350, events: 3 },
          { month: "Sep", patients: 380, events: 2 },
          { month: "Oct", patients: 428, events: 3 },
          { month: "Nov", patients: 0, events: 3 },
          { month: "Dec", patients: 0, events: 0 },
        ]);
      }, 800);
    });
  },

  createNewCampaign: async (campaign: Omit<Campaign, "id">): Promise<Campaign> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `campaign-${Date.now()}`,
          ...campaign,
        });
      }, 1000);
    });
  },

  createHealthDrive: async (healthDrive: Omit<HealthDrive, "id">): Promise<HealthDrive> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `drive-${Date.now()}`,
          ...healthDrive,
        });
      }, 1000);
    });
  },
};

const NGODashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [healthDrives, setHealthDrives] = useState<HealthDrive[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const [showNewDriveDialog, setShowNewDriveDialog] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const [newHealthDrive, setNewHealthDrive] = useState({
    name: "",
    date: "",
    location: "",
    doctors: 0,
    capacity: 0,
  });

  // Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [
          metricsData,
          campaignsData,
          healthDrivesData,
          activitiesData,
          impactData,
        ] = await Promise.all([
          ngoService.getDashboardMetrics(),
          ngoService.getCampaigns(),
          ngoService.getHealthDrives(),
          ngoService.getRecentActivities(),
          ngoService.getImpactData(),
        ]);

        // Update state with fetched data
        setMetrics(metricsData);
        setCampaigns(campaignsData);
        setHealthDrives(healthDrivesData);
        setActivities(activitiesData);
        setImpactData(impactData);
      } catch (error) {
        console.error("Error loading NGO dashboard data:", error);
        toast.error("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle creating a new campaign
  const handleCreateCampaign = async () => {
    // Validate form
    if (!newCampaign.name || !newCampaign.location || !newCampaign.startDate || !newCampaign.endDate) {
      toast.error("Please fill in all campaign fields");
      return;
    }

    try {
      const newCampaignData = await ngoService.createNewCampaign({
        ...newCampaign,
        progress: 0,
        status: "Planning",
      });

      // Update local state
      setCampaigns(prev => [...prev, newCampaignData]);
      
      // Add to activities
      setActivities(prev => [
        {
          id: `activity-${Date.now()}`,
          title: "New campaign created",
          description: `${newCampaign.name} added to campaigns`,
          timestamp: "Just now",
          status: "success",
          icon: <Layout className="h-4 w-4" />,
        },
        ...prev
      ]);
      
      // Reset form and close dialog
      setNewCampaign({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
      });
      setShowNewCampaignDialog(false);
      
      toast.success("Campaign created successfully");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign. Please try again.");
    }
  };

  // Handle creating a new health drive
  const handleCreateHealthDrive = async () => {
    // Validate form
    if (!newHealthDrive.name || !newHealthDrive.location || !newHealthDrive.date || newHealthDrive.doctors <= 0) {
      toast.error("Please fill in all health drive fields");
      return;
    }

    try {
      const newDriveData = await ngoService.createHealthDrive({
        ...newHealthDrive,
        registered: 0,
      });

      // Update local state
      setHealthDrives(prev => [...prev, newDriveData]);
      
      // Add to activities
      setActivities(prev => [
        {
          id: `activity-${Date.now()}`,
          title: "New health drive created",
          description: `${newHealthDrive.name} scheduled for ${newHealthDrive.date}`,
          timestamp: "Just now",
          status: "success",
          icon: <Calendar className="h-4 w-4" />,
        },
        ...prev
      ]);
      
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        drivesThisMonth: prev.drivesThisMonth + 1,
      }));
      
      // Reset form and close dialog
      setNewHealthDrive({
        name: "",
        date: "",
        location: "",
        doctors: 0,
        capacity: 0,
      });
      setShowNewDriveDialog(false);
      
      toast.success("Health drive created successfully");
    } catch (error) {
      console.error("Error creating health drive:", error);
      toast.error("Failed to create health drive. Please try again.");
    }
  };

  // Prepare metrics cards
  const getMetricsCards = () => {
    if (!metrics) return [];
    
    return [
      {
        title: "Campaigns Active",
        value: metrics.campaignsActive.toString(),
        description: "Currently running",
        icon: Layout,
        trend: {
          value: 1,
          isPositive: true,
        },
      },
      {
        title: "Patients Reached",
        value: metrics.patientsReached.toString(),
        description: "This month",
        icon: Users,
        trend: {
          value: 15,
          isPositive: true,
        },
      },
      {
        title: "Doctors Partnered",
        value: metrics.doctorsPartnered.toString(),
        description: "Collaborating with us",
        icon: UserRound,
      },
      {
        title: "Drives This Month",
        value: metrics.drivesThisMonth.toString(),
        description: "Health camps planned",
        icon: Calendar,
        trend: {
          value: 1,
          isPositive: true,
        },
      },
    ];
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">NGO Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/ngo/reports")}>Generate Report</Button>
          <Button onClick={() => setShowNewCampaignDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? [...Array(4)].map((_, i) => (
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
          : getMetricsCards().map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                description={metric.description}
                icon={metric.icon}
                trend={metric.trend}
                className="stat-card-ngo"
                onClick={() => {
                  if (metric.title === "Campaigns Active") {
                    navigate("/ngo/campaigns");
                  } else if (metric.title === "Drives This Month") {
                    navigate("/ngo/health-drives");
                  }
                }}
              />
            ))}
      </div>

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
            <CardTitle>Impact Overview</CardTitle>
            <CardDescription>Patients reached and events organized</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {isLoading ? (
                <div className="h-full bg-muted/20 animate-pulse rounded-md"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="patients"
                      name="Patients Reached"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="events"
                      name="Events"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Current Campaigns</CardTitle>
              <CardDescription>Progress of your active campaigns</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/ngo/campaigns')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 w-1/4 bg-muted rounded"></div>
                      <div className="h-4 w-1/6 bg-muted rounded"></div>
                    </div>
                    <div className="h-2 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No campaigns</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't created any campaigns yet
                </p>
                <Button onClick={() => setShowNewCampaignDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Layout className="h-4 w-4 text-ngo-primary" />
                          <span className="font-medium">{campaign.name}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{campaign.location}</span>
                          <span className="mx-2">•</span>
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          campaign.status === "Ongoing" 
                            ? "text-status-info border-status-info/50" 
                            : campaign.status === "Ending Soon" 
                              ? "text-status-warning border-status-warning/50" 
                              : campaign.status === "Just Started"
                                ? "text-status-success border-status-success/50"
                                : "text-muted-foreground border-muted"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Health Drives</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowNewDriveDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            ) : healthDrives.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No health drives</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Schedule your first health drive
                </p>
                <Button size="sm" onClick={() => setShowNewDriveDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Health Drive
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {healthDrives.map((drive) => (
                  <div key={drive.id} className="bg-muted/50 p-3 rounded-md">
                    <h4 className="font-medium">{drive.name}</h4>
                    <div className="text-sm flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-muted-foreground">{drive.date}</span>
                    </div>
                    <div className="text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-muted-foreground">{drive.location}</span>
                    </div>
                    <div className="text-sm flex items-center gap-1 mt-1">
                      <UserRound className="h-3 w-3" />
                      <span className="text-muted-foreground">{drive.doctors} doctors participating</span>
                    </div>
                    {drive.registered !== undefined && drive.capacity !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Registration</span>
                          <span>{drive.registered}/{drive.capacity}</span>
                        </div>
                        <Progress 
                          value={(drive.registered / drive.capacity) * 100} 
                          className="h-1.5 mt-1" 
                        />
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Details</Button>
                      <Button size="sm" className="flex-1" onClick={() => navigate(`/ngo/health-drives/${drive.id}`)}>Manage</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate("/ngo/health-drives")}>
                  View All Health Drives
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Campaign Dialog */}
      <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Enter the details of your new healthcare campaign
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="campaign-name" className="text-sm font-medium">
                Campaign Name
              </label>
              <input
                id="campaign-name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., Diabetes Awareness Drive"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="campaign-location" className="text-sm font-medium">
                Location
              </label>
              <input
                id="campaign-location"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., City Center, Rural District"
                value={newCampaign.location}
                onChange={(e) => setNewCampaign({ ...newCampaign, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="campaign-start" className="text-sm font-medium">
                  Start Date
                </label>
                <input
                  id="campaign-start"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="campaign-end" className="text-sm font-medium">
                  End Date
                </label>
                <input
                  id="campaign-end"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCampaign}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Health Drive Dialog */}
      <Dialog open={showNewDriveDialog} onOpenChange={setShowNewDriveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Health Drive</DialogTitle>
            <DialogDescription>
              Schedule a new health drive or medical camp
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="drive-name" className="text-sm font-medium">
                Event Name
              </label>
              <input
                id="drive-name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., Blood Donation Camp"
                value={newHealthDrive.name}
                onChange={(e) => setNewHealthDrive({ ...newHealthDrive, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="drive-date" className="text-sm font-medium">
                Date
              </label>
              <input
                id="drive-date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., Nov 15, 2025"
                value={newHealthDrive.date}
                onChange={(e) => setNewHealthDrive({ ...newHealthDrive, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="drive-location" className="text-sm font-medium">
                Location
              </label>
              <input
                id="drive-location"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., Community Center, Downtown"
                value={newHealthDrive.location}
                onChange={(e) => setNewHealthDrive({ ...newHealthDrive, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="drive-doctors" className="text-sm font-medium">
                  Doctors Required
                </label>
                <input
                  id="drive-doctors"
                  type="number"
                  min="1"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newHealthDrive.doctors || ""}
                  onChange={(e) => setNewHealthDrive({ ...newHealthDrive, doctors: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="drive-capacity" className="text-sm font-medium">
                  Patient Capacity
                </label>
                <input
                  id="drive-capacity"
                  type="number"
                  min="1"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newHealthDrive.capacity || ""}
                  onChange={(e) => setNewHealthDrive({ ...newHealthDrive, capacity: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDriveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateHealthDrive}>Create Health Drive</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NGODashboard;