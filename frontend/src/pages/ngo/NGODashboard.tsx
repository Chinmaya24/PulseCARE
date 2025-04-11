
import {
  Calendar,
  Globe,
  HeartPulse,
  Layout,
  LineChart,
  MapPin,
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
  Line, 
  LineChart as ReLineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const NGODashboard = () => {
  // Sample data for metrics
  const metrics = [
    {
      title: "Campaigns Active",
      value: "4",
      description: "Currently running",
      icon: Layout,
      trend: {
        value: 1,
        isPositive: true,
      },
    },
    {
      title: "Patients Reached",
      value: "428",
      description: "This month",
      icon: Users,
      trend: {
        value: 15,
        isPositive: true,
      },
    },
    {
      title: "Doctors Partnered",
      value: "23",
      description: "Collaborating with us",
      icon: UserRound,
    },
    {
      title: "Drives This Month",
      value: "3",
      description: "Health camps planned",
      icon: Calendar,
      trend: {
        value: 1,
        isPositive: true,
      },
    },
  ];

  // Sample data for activity feed
  const activities = [
    {
      id: "1",
      title: "Blood donation camp approved",
      description: "City Central Hospital, Oct 28",
      timestamp: "30 min ago",
      status: "success" as const,
      icon: <HeartPulse className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "New patient referrals",
      description: "5 patients referred to Dr. Johnson",
      timestamp: "2 hours ago",
      status: "info" as const,
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Campaign goals updated",
      description: "Diabetes Awareness targets revised",
      timestamp: "Yesterday",
      status: "info" as const,
      icon: <Target className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Partner hospital joined",
      description: "Metro Health Center partnership confirmed",
      timestamp: "2 days ago",
      status: "success" as const,
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Campaign funding received",
      description: "Vision Care program received $5000 funding",
      timestamp: "3 days ago",
      status: "success" as const,
      icon: <Layout className="h-4 w-4" />,
    },
  ];

  // Sample data for current campaigns
  const campaigns = [
    { 
      id: 1, 
      name: "Diabetes Awareness Drive", 
      location: "Multiple Locations", 
      progress: 65, 
      startDate: "Oct 10", 
      endDate: "Nov 10",
      status: "Ongoing"
    },
    { 
      id: 2, 
      name: "Vision Care for All", 
      location: "Rural Districts", 
      progress: 40, 
      startDate: "Sep 15", 
      endDate: "Nov 30",
      status: "Ongoing"
    },
    { 
      id: 3, 
      name: "Women's Health Initiative", 
      location: "Urban Centers", 
      progress: 85, 
      startDate: "Aug 1", 
      endDate: "Oct 31",
      status: "Ending Soon"
    },
    { 
      id: 4, 
      name: "Child Vaccination Program", 
      location: "Schools & Community Centers", 
      progress: 20, 
      startDate: "Oct 15", 
      endDate: "Dec 15",
      status: "Just Started"
    },
  ];

  // Sample data for upcoming health drives
  const healthDrives = [
    { id: 1, name: "Blood Donation Camp", date: "Oct 28, 2025", location: "City Central Hospital", doctors: 4 },
    { id: 2, name: "Free Eye Checkup", date: "Nov 5-6, 2025", location: "Community Center, Downtown", doctors: 6 },
    { id: 3, name: "Diabetes Screening", date: "Nov 14, 2025", location: "Public Park, North District", doctors: 3 },
  ];

  // Sample data for impact chart
  const impactData = [
    { month: "Jul", patients: 320, events: 2 },
    { month: "Aug", patients: 350, events: 3 },
    { month: "Sep", patients: 380, events: 2 },
    { month: "Oct", patients: 428, events: 3 },
    { month: "Nov", patients: 0, events: 3 },
    { month: "Dec", patients: 0, events: 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">NGO Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Generate Report</Button>
          <Button>New Campaign</Button>
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
            className="stat-card-ngo"
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
            <CardTitle>Impact Overview</CardTitle>
            <CardDescription>Patients reached and events organized</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Campaigns</CardTitle>
            <CardDescription>Progress of your active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
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
                            : "text-status-success border-status-success/50"
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
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Health Drives</CardTitle>
          </CardHeader>
          <CardContent>
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
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Details</Button>
                    <Button size="sm" className="flex-1">Manage</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Health Drives</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGODashboard;
