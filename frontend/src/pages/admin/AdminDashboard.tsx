
import {
  BarChart,
  Building,
  Calendar,
  FileText,
  Globe,
  HeartPulse,
  LayoutDashboard,
  UserCog,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart as ReBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminDashboard = () => {
  // Sample data for metrics
  const metrics = [
    {
      title: "Total Doctors",
      value: "42",
      description: "Active on platform",
      icon: UserCog,
      trend: {
        value: 8,
        isPositive: true,
      },
    },
    {
      title: "Active Patients",
      value: "1,234",
      description: "Registered users",
      icon: Users,
      trend: {
        value: 12,
        isPositive: true,
      },
    },
    {
      title: "NGOs Involved",
      value: "15",
      description: "Partner organizations",
      icon: Globe,
    },
    {
      title: "Upcoming Appointments",
      value: "158",
      description: "Next 7 days",
      icon: Calendar,
      trend: {
        value: 3,
        isPositive: true,
      },
    },
  ];

  // Sample data for activity feed
  const activities = [
    {
      id: "1",
      title: "New doctor approved",
      description: "Dr. Sarah Johnson (Cardiologist) approved",
      timestamp: "Just now",
      status: "success" as const,
      icon: <UserCog className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "NGO request pending",
      description: "HealthHope Foundation awaiting review",
      timestamp: "30 min ago",
      status: "warning" as const,
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "System update scheduled",
      description: "Maintenance planned for tonight 2 AM",
      timestamp: "1 hour ago",
      status: "info" as const,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Patient complaint resolved",
      description: "Login issues for patient #1205 fixed",
      timestamp: "3 hours ago",
      status: "success" as const,
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Campaign approval needed",
      description: "Diabetes Awareness Drive needs review",
      timestamp: "Yesterday",
      status: "warning" as const,
      icon: <HeartPulse className="h-4 w-4" />,
    },
  ];

  // Sample data for pending approvals
  const pendingApprovals = [
    { id: 1, name: "Dr. Mark Wilson", type: "Doctor", specialty: "Neurologist", status: "Review Required" },
    { id: 2, name: "CareFree NGO", type: "NGO", focus: "Elder Care", status: "Documents Pending" },
    { id: 3, name: "Dr. Elena Marquez", type: "Doctor", specialty: "Pediatrician", status: "Review Required" },
    { id: 4, name: "HealthHope Foundation", type: "NGO", focus: "Rural Healthcare", status: "Background Check" },
  ];

  // Sample data for campaigns
  const campaigns = [
    { id: 1, name: "Diabetes Awareness Drive", organizer: "MedHelp NGO", date: "Next Week", status: "Pending Approval" },
    { id: 2, name: "Children's Vaccination Camp", organizer: "Heal Kids NGO", date: "Oct 25-26", status: "Approved" },
    { id: 3, name: "Women's Health Seminar", organizer: "Wellness NGO", date: "Nov 5", status: "Pending Approval" },
    { id: 4, name: "Eye Checkup Camp", organizer: "Vision Care", date: "Nov 10-12", status: "Planning" },
  ];

  // Sample data for chart
  const chartData = [
    { name: "Jan", doctors: 32, patients: 720, ngos: 10 },
    { name: "Feb", doctors: 34, patients: 800, ngos: 12 },
    { name: "Mar", doctors: 36, patients: 920, ngos: 12 },
    { name: "Apr", doctors: 38, patients: 1020, ngos: 14 },
    { name: "May", doctors: 40, patients: 1100, ngos: 15 },
    { name: "Jun", doctors: 42, patients: 1234, ngos: 15 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Add New User</Button>
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
            <ActivityFeed activities={activities} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage platform operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2">
                <UserCog className="h-6 w-6" />
                <span>Add Doctor</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span>View Patients</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                <Globe className="h-6 w-6" />
                <span>Approve NGO</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
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
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="patients" name="Patients" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="doctors" name="Doctors" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="ngos" name="NGOs" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      {item.type === "Doctor" ? (
                        <UserCog className="h-4 w-4 text-admin-primary" />
                      ) : (
                        <Building className="h-4 w-4 text-admin-accent" />
                      )}
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.type === "Doctor" ? item.specialty : item.focus}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-status badge-status-warning text-xs">
                      {item.status}
                    </span>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Campaign Control</CardTitle>
          </CardHeader>
          <CardContent>
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
                      campaign.status === "Approved" 
                        ? "badge-status-success" 
                        : campaign.status === "Planning" 
                          ? "badge-status-info" 
                          : "badge-status-warning"
                    }`}>
                      {campaign.status}
                    </span>
                    {campaign.status === "Pending Approval" && (
                      <div className="flex gap-1">
                        <Button variant="outline" size="icon" className="h-7 w-7">
                          <span className="sr-only">Reject</span>
                          ✕
                        </Button>
                        <Button size="icon" className="h-7 w-7">
                          <span className="sr-only">Approve</span>
                          ✓
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
