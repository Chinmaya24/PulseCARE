import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarClock, 
  Edit, 
  FileText, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Target, 
  Trash2, 
  TrendingUp, 
  Users 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Campaigns = () => {
  // Sample campaigns data
  const campaigns = [
    { 
      id: 1, 
      name: "Diabetes Awareness Drive", 
      location: "Multiple Locations", 
      progress: 65, 
      startDate: "Oct 10, 2025", 
      endDate: "Nov 10, 2025",
      status: "Ongoing",
      participants: 428,
      doctors: 8,
      description: "Raising awareness about diabetes prevention and management through community workshops and free screening camps."
    },
    { 
      id: 2, 
      name: "Vision Care for All", 
      location: "Rural Districts", 
      progress: 40, 
      startDate: "Sep 15, 2025", 
      endDate: "Nov 30, 2025",
      status: "Ongoing",
      participants: 315,
      doctors: 6,
      description: "Providing free eye check-ups and glasses to underserved rural communities with limited access to healthcare."
    },
    { 
      id: 3, 
      name: "Women's Health Initiative", 
      location: "Urban Centers", 
      progress: 85, 
      startDate: "Aug 1, 2025", 
      endDate: "Oct 31, 2025",
      status: "Ending Soon",
      participants: 587,
      doctors: 12,
      description: "Comprehensive women's health program including breast cancer awareness, reproductive health education, and screenings."
    },
    { 
      id: 4, 
      name: "Child Vaccination Program", 
      location: "Schools & Community Centers", 
      progress: 20, 
      startDate: "Oct 15, 2025", 
      endDate: "Dec 15, 2025",
      status: "Just Started",
      participants: 124,
      doctors: 5,
      description: "Ensuring children in underserved communities receive essential vaccinations and health check-ups."
    },
    { 
      id: 5, 
      name: "Mental Health Awareness", 
      location: "Various Locations", 
      progress: 0, 
      startDate: "Nov 1, 2025", 
      endDate: "Dec 31, 2025",
      status: "Upcoming",
      participants: 0,
      doctors: 4,
      description: "Breaking stigmas and providing resources for mental health support through community engagement and education."
    },
    { 
      id: 6, 
      name: "Heart Health Screening", 
      location: "Senior Centers", 
      progress: 0, 
      startDate: "Nov 15, 2025", 
      endDate: "Jan 15, 2026",
      status: "Upcoming",
      participants: 0,
      doctors: 7,
      description: "Cardiovascular health education and free screenings focusing on elderly populations at risk."
    },
    { 
      id: 7, 
      name: "Oral Health Drive", 
      location: "Elementary Schools", 
      progress: 0, 
      startDate: "Dec 1, 2025", 
      endDate: "Feb 1, 2026",
      status: "Upcoming",
      participants: 0,
      doctors: 5,
      description: "Teaching proper oral hygiene to children and providing free dental check-ups and basic treatments."
    },
    { 
      id: 8, 
      name: "HIV/AIDS Awareness", 
      location: "University Campuses", 
      progress: 0, 
      startDate: "Dec 15, 2025", 
      endDate: "Jan 31, 2026",
      status: "Upcoming",
      participants: 0,
      doctors: 6,
      description: "Educational campaign focusing on prevention, testing, and reducing stigma around HIV/AIDS."
    },
    { 
      id: 9, 
      name: "Senior Wellness Program", 
      location: "Retirement Communities", 
      progress: 0, 
      startDate: "Jan 5, 2026", 
      endDate: "Mar 5, 2026",
      status: "Draft",
      participants: 0,
      doctors: 0,
      description: "Comprehensive health program for seniors including exercise, nutrition, and preventative care education."
    },
    { 
      id: 10, 
      name: "Community First Aid Training", 
      location: "Public Spaces", 
      progress: 0, 
      startDate: "Jan 15, 2026", 
      endDate: "Feb 15, 2026",
      status: "Draft",
      participants: 0,
      doctors: 0,
      description: "Teaching basic first aid and emergency response skills to community members to improve emergency preparedness."
    },
  ];

  // Filter campaigns by status
  const ongoingCampaigns = campaigns.filter(campaign => ["Ongoing", "Just Started", "Ending Soon"].includes(campaign.status));
  const upcomingCampaigns = campaigns.filter(campaign => campaign.status === "Upcoming");
  const draftCampaigns = campaigns.filter(campaign => campaign.status === "Draft");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Campaign Reports
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="ongoing">
            Ongoing ({ongoingCampaigns.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingCampaigns.length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts ({draftCampaigns.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing">
          <div className="grid gap-4">
            {ongoingCampaigns.map(campaign => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">{campaign.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{campaign.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className={
                          campaign.status === "Ongoing" 
                            ? "text-blue-600 border-blue-200 bg-blue-50" 
                            : campaign.status === "Ending Soon" 
                              ? "text-amber-600 border-amber-200 bg-amber-50" 
                              : "text-green-600 border-green-200 bg-green-50"
                        }
                      >
                        {campaign.status}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>{campaign.startDate} - {campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm mb-4">{campaign.description}</div>
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{campaign.participants} participants</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{campaign.doctors} doctors involved</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex">
                      <Button variant="outline" size="sm" className="mr-2">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        View Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" className="mr-2">Update Status</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>Assign Doctors</DropdownMenuItem>
                          <DropdownMenuItem>View Timeline</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            End Campaign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {upcomingCampaigns.map(campaign => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">{campaign.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{campaign.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className="text-purple-600 border-purple-200 bg-purple-50"
                      >
                        {campaign.status}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>{campaign.startDate} - {campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm mb-4">{campaign.description}</div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{campaign.doctors} doctors assigned</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Details
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button size="sm">Launch Campaign</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <div className="grid gap-4">
            {draftCampaigns.map(campaign => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">{campaign.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{campaign.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant="outline" 
                        className="text-gray-600 border-gray-200 bg-gray-50"
                      >
                        {campaign.status}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        <span>Planned: {campaign.startDate} - {campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm mb-2">{campaign.description}</div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Trash2 className="h-4 w-4" />
                      Delete Draft
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Continue Editing</Button>
                      <Button size="sm">Finalize Campaign</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;