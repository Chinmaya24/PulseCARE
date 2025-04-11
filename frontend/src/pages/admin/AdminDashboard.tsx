import { useState, useEffect } from "react";
import {
  BarChart,
  Building,
  Calendar,
  Download,
  FileText,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Loader2,
  PlusCircle,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart as ReBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// User types
interface User {
  id: string;
  name: string;
  email: string;
  type: 'doctor' | 'patient' | 'ngo';
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: Date;
  specialty?: string; // For doctors
  focus?: string; // For NGOs
}

// Appointment type
interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: Date;
  time: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

// Campaign type
interface Campaign {
  id: string;
  name: string;
  organizer: string;
  date: string;
  status: 'pending' | 'approved' | 'planning' | 'active' | 'completed';
}

// Activity type
interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
}

// Service for admin data
const adminService = {
  getDashboardMetrics: async (): Promise<{
    totalDoctors: number;
    activePatients: number;
    ngosInvolved: number;
    upcomingAppointments: number;
  }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalDoctors: 42,
          activePatients: 1234,
          ngosInvolved: 15,
          upcomingAppointments: 158,
        });
      }, 800);
    });
  },

  getGrowthData: async (): Promise<any[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: "Jan", doctors: 32, patients: 720, ngos: 10 },
          { name: "Feb", doctors: 34, patients: 800, ngos: 12 },
          { name: "Mar", doctors: 36, patients: 920, ngos: 12 },
          { name: "Apr", doctors: 38, patients: 1020, ngos: 14 },
          { name: "May", doctors: 40, patients: 1100, ngos: 15 },
          { name: "Jun", doctors: 42, patients: 1234, ngos: 15 },
        ]);
      }, 800);
    });
  },

  getRecentActivities: async (): Promise<Activity[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "New doctor approved",
            description: "Dr. Sarah Johnson (Cardiologist) approved",
            timestamp: "Just now",
            status: "success",
            icon: <UserCog className="h-4 w-4" />,
          },
          {
            id: "2",
            title: "NGO request pending",
            description: "HealthHope Foundation awaiting review",
            timestamp: "30 min ago",
            status: "warning",
            icon: <Globe className="h-4 w-4" />,
          },
          {
            id: "3",
            title: "System update scheduled",
            description: "Maintenance planned for tonight 2 AM",
            timestamp: "1 hour ago",
            status: "info",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
          {
            id: "4",
            title: "Patient complaint resolved",
            description: "Login issues for patient #1205 fixed",
            timestamp: "3 hours ago",
            status: "success",
            icon: <Users className="h-4 w-4" />,
          },
          {
            id: "5",
            title: "Campaign approval needed",
            description: "Diabetes Awareness Drive needs review",
            timestamp: "Yesterday",
            status: "warning",
            icon: <HeartPulse className="h-4 w-4" />,
          },
        ]);
      }, 700);
    });
  },

  getPendingApprovals: async (): Promise<User[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Dr. Mark Wilson",
            email: "mark.wilson@example.com",
            type: "doctor",
            specialty: "Neurologist",
            status: "pending",
            registeredAt: new Date(2023, 5, 15),
          },
          {
            id: "2",
            name: "CareFree NGO",
            email: "info@carefree.org",
            type: "ngo",
            focus: "Elder Care",
            status: "pending",
            registeredAt: new Date(2023, 5, 20),
          },
          {
            id: "3",
            name: "Dr. Elena Marquez",
            email: "elena.marquez@example.com",
            type: "doctor",
            specialty: "Pediatrician",
            status: "pending",
            registeredAt: new Date(2023, 5, 22),
          },
          {
            id: "4",
            name: "HealthHope Foundation",
            email: "contact@healthhope.org",
            type: "ngo",
            focus: "Rural Healthcare",
            status: "pending",
            registeredAt: new Date(2023, 5, 25),
          },
        ]);
      }, 600);
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
            organizer: "MedHelp NGO",
            date: "Next Week",
            status: "pending",
          },
          {
            id: "2",
            name: "Children's Vaccination Camp",
            organizer: "Heal Kids NGO",
            date: "Oct 25-26",
            status: "approved",
          },
          {
            id: "3",
            name: "Women's Health Seminar",
            organizer: "Wellness NGO",
            date: "Nov 5",
            status: "pending",
          },
          {
            id: "4",
            name: "Eye Checkup Camp",
            organizer: "Vision Care",
            date: "Nov 10-12",
            status: "planning",
          },
        ]);
      }, 700);
    });
  },

  approveUser: async (userId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  rejectUser: async (userId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  approveCampaign: async (campaignId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  rejectCampaign: async (campaignId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  exportData: async (): Promise<Blob> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate dummy data for export
        const data = {
          metrics: {
            totalDoctors: 42,
            activePatients: 1234,
            ngosInvolved: 15,
            upcomingAppointments: 158,
          },
          growthData: [
            { name: "Jan", doctors: 32, patients: 720, ngos: 10 },
            { name: "Feb", doctors: 34, patients: 800, ngos: 12 },
            { name: "Mar", doctors: 36, patients: 920, ngos: 12 },
            { name: "Apr", doctors: 38, patients: 1020, ngos: 14 },
            { name: "May", doctors: 40, patients: 1100, ngos: 15 },
            { name: "Jun", doctors: 42, patients: 1234, ngos: 15 },
          ],
        };
        
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        resolve(jsonBlob);
      }, 1000);
    });
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<User[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Load all data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [
          metricsData,
          growthData,
          activitiesData,
          pendingApprovalsData,
          campaignsData,
        ] = await Promise.all([
          adminService.getDashboardMetrics(),
          adminService.getGrowthData(),
          adminService.getRecentActivities(),
          adminService.getPendingApprovals(),
          adminService.getCampaigns(),
        ]);

        // Update state with fetched data
        setMetrics(metricsData);
        setGrowthData(growthData);
        setActivities(activitiesData);
        setPendingApprovals(pendingApprovalsData);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error loading admin dashboard data:", error);
        toast.error("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle approving a user
  const handleApproveUser = async (userId: string) => {
    try {
      await adminService.approveUser(userId);
      
      // Update local state
      setPendingApprovals(prev => 
        prev.filter(user => user.id !== userId)
      );
      
      // Add success activity to the feed
      const user = pendingApprovals.find(u => u.id === userId);
      if (user) {
        setActivities(prev => [
          {
            id: `activity-${Date.now()}`,
            title: `${user.type === 'doctor' ? 'Doctor' : 'NGO'} approved`,
            description: `${user.name} has been approved`,
            timestamp: "Just now",
            status: "success",
            icon: user.type === 'doctor' ? <UserCog className="h-4 w-4" /> : <Globe className="h-4 w-4" />,
          },
          ...prev
        ]);
      }
      
      toast.success("User approved successfully");
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Failed to approve user. Please try again.");
    }
  };

  // Handle rejecting a user
  const handleRejectUser = async (userId: string) => {
    try {
      await adminService.rejectUser(userId);
      
      // Update local state
      setPendingApprovals(prev => 
        prev.filter(user => user.id !== userId)
      );
      
      // Add success activity to the feed
      const user = pendingApprovals.find(u => u.id === userId);
      if (user) {
        setActivities(prev => [
          {
            id: `activity-${Date.now()}`,
            title: `${user.type === 'doctor' ? 'Doctor' : 'NGO'} rejected`,
            description: `${user.name} has been rejected`,
            timestamp: "Just now",
            status: "error",
            icon: user.type === 'doctor' ? <UserCog className="h-4 w-4" /> : <Globe className="h-4 w-4" />,
          },
          ...prev
        ]);
      }
      
      toast.success("User rejected successfully");
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error("Failed to reject user. Please try again.");
    }
  };

  // Handle approving a campaign
  const handleApproveCampaign = async (campaignId: string) => {
    try {
      await adminService.approveCampaign(campaignId);
      
      // Update local state
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, status: 'approved' } 
            : campaign
        )
      );
      
      // Add success activity to the feed
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        setActivities(prev => [
          {
            id: `activity-${Date.now()}`,
            title: "Campaign approved",
            description: `${campaign.name} has been approved`,
            timestamp: "Just now",
            status: "success",
            icon: <HeartPulse className="h-4 w-4" />,
          },
          ...prev
        ]);
      }
      
      toast.success("Campaign approved successfully");
    } catch (error) {
      console.error("Error approving campaign:", error);
      toast.error("Failed to approve campaign. Please try again.");
    }
  };

  // Handle rejecting a campaign
  const handleRejectCampaign = async (campaignId: string) => {
    try {
      await adminService.rejectCampaign(campaignId);
      
      // Update local state
      setCampaigns(prev => 
        prev.filter(campaign => campaign.id !== campaignId)
      );
      
      // Add success activity to the feed
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        setActivities(prev => [
          {
            id: `activity-${Date.now()}`,
            title: "Campaign rejected",
            description: `${campaign.name} has been rejected`,
            timestamp: "Just now",
            status: "error",
            icon: <HeartPulse className="h-4 w-4" />,
          },
          ...prev
        ]);
      }
      
      toast.success("Campaign rejected successfully");
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      toast.error("Failed to reject campaign. Please try again.");
    }
  };

  // Handle exporting data
  const handleExportData = async () => {
    try {
      setExportLoading(true);
      const blob = await adminService.exportData();
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowExportDialog(false);
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  // Prepare metrics data for display
  const getMetricsCards = () => {
    if (!metrics) return [];
    
    return [
      {
        title: "Total Doctors",
        value: metrics.totalDoctors.toString(),
        description: "Active on platform",
        icon: UserCog,
        trend: {
          value: 8,
          isPositive: true,
        },
      },
      {
        title: "Active Patients",
        value: metrics.activePatients.toString(),
        description: "Registered users",
        icon: Users,
        trend: {
          value: 12,
          isPositive: true,
        },
      },
      {
        title: "NGOs Involved",
        value: metrics.ngosInvolved.toString(),
        description: "Partner organizations",
        icon: Globe,
      },
      {
        title: "Upcoming Appointments",
        value: metrics.upcomingAppointments.toString(),
        description: "Next 7 days",
        icon: Calendar,
        trend: {
          value: 3,
          isPositive: true,
        },
      },
    ];
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowExportDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={() => setShowAddUserDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
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
                className="stat-card-admin"
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage platform operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2" onClick={() => navigate("/admin/doctors")}>
                <UserCog className="h-6 w-6" />
                <span>Add Doctor</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2" onClick={() => navigate("/admin/patients")}>
                <Users className="h-6 w-6" />
                <span>View Patients</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2" onClick={() => navigate("/admin/ngos")}>
                <Globe className="h-6 w-6" />
                <span>Approve NGO</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2" onClick={() => navigate("/admin/reports")}>
                <FileText className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Growth</CardTitle>
          <CardDescription>User growth over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full bg-muted/20 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="patients" name="Patients" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="doctors" name="Doctors" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="ngos" name="NGOs" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded"></div>
                ))}
              </div>
            ) : pendingApprovals.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No pending approvals at this time.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        {item.type === "doctor" ? (
                          <UserCog className="h-4 w-4 text-admin-primary" />
                        ) : (
                          <Building className="h-4 w-4 text-admin-accent" />
                        )}
                        <p className="font-medium">{item.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "doctor" ? item.specialty : item.focus}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge-status badge-status-warning text-xs">
                        Review Required
                      </span>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2 text-destructive"
                          onClick={() => handleRejectUser(item.id)}
                        >
                          Reject
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => handleApproveUser(item.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Campaign Control</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded"></div>
                ))}
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No campaigns at this time.
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {campaign.organizer} • {campaign.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge-status text-xs ${
                        campaign.status === "approved" 
                          ? "badge-status-success" 
                          : campaign.status === "planning" 
                            ? "badge-status-info" 
                            : "badge-status-warning"
                      }`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                      {campaign.status === "pending" && (
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7 text-destructive"
                            onClick={() => handleRejectCampaign(campaign.id)}
                          >
                            ✕
                          </Button>
                          <Button 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleApproveCampaign(campaign.id)}
                          >
                            ✓
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account on the platform
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-between gap-4">
            <Button 
              onClick={() => {
                setShowAddUserDialog(false);
                navigate("/admin/doctors?action=new");
              }}
              className="flex-1 h-24 flex flex-col items-center justify-center space-y-2"
            >
              <UserCog className="h-6 w-6" />
              <span>Add Doctor</span>
            </Button>
            <Button
              onClick={() => {
                setShowAddUserDialog(false);
                navigate("/admin/patients?action=new");
              }}
              className="flex-1 h-24 flex flex-col items-center justify-center space-y-2"
            >
              <Users className="h-6 w-6" />
              <span>Add Patient</span>
            </Button>
            <Button
              onClick={() => {
                setShowAddUserDialog(false);
                navigate("/admin/ngos?action=new");
              }}
              className="flex-1 h-24 flex flex-col items-center justify-center space-y-2"
            >
              <Globe className="h-6 w-6" />
              <span>Add NGO</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Dashboard Data</DialogTitle>
            <DialogDescription>
              Choose what data you would like to export
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="flex items-start space-y-2">
              <div className="grid grid-cols-1 gap-2 w-full">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="metrics" className="rounded" defaultChecked />
                  <label htmlFor="metrics">Dashboard Metrics</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="growth" className="rounded" defaultChecked />
                  <label htmlFor="growth">Growth Data</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="users" className="rounded" defaultChecked />
                  <label htmlFor="users">User Information</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="appointments" className="rounded" defaultChecked />
                  <label htmlFor="appointments">Appointment Data</label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="radio" id="formatJson" name="format" className="rounded" defaultChecked />
              <label htmlFor="formatJson">JSON</label>
              <input type="radio" id="formatCsv" name="format" className="rounded ml-4" />
              <label htmlFor="formatCsv">CSV</label>
              <input type="radio" id="formatPdf" name="format" className="rounded ml-4" />
              <label htmlFor="formatPdf">PDF</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>Cancel</Button>
            <Button onClick={handleExportData} disabled={exportLoading}>
              {exportLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;