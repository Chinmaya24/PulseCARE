import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { BarChart, DownloadCloud, File, FileText, LinkIcon, Printer, Search, Share2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Reports = () => {
  // Sample patient reports
  const patientReports = [
    { 
      id: 1, 
      patient: "Sarah Jones", 
      title: "Hypertension Follow-up Report", 
      type: "Clinical",
      date: "2025-04-10", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      title: "Diabetes Management Plan", 
      type: "Treatment Plan",
      date: "2025-04-05", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 3, 
      patient: "Emma Williams", 
      title: "Prenatal Assessment", 
      type: "Clinical",
      date: "2025-04-08", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 4, 
      patient: "James Wilson", 
      title: "Post-Surgical Progress", 
      type: "Progress",
      date: "2025-04-07", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 5, 
      patient: "David Smith", 
      title: "Asthma Control Test", 
      type: "Clinical",
      date: "2025-04-02", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 6, 
      patient: "Jennifer Garcia", 
      title: "Migraine Assessment", 
      type: "Assessment",
      date: "2025-04-01", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 7, 
      patient: "Robert Johnson", 
      title: "Arthritis Treatment Evaluation", 
      type: "Evaluation",
      date: "2025-03-28", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 8, 
      patient: "Lisa Martinez", 
      title: "Anxiety Management Plan", 
      type: "Treatment Plan",
      date: "2025-03-25", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 9, 
      patient: "Thomas Anderson", 
      title: "Cardiac Function Report", 
      type: "Clinical",
      date: "2025-03-20", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
    { 
      id: 10, 
      patient: "Olivia Taylor", 
      title: "Allergy Test Results", 
      type: "Lab Results",
      date: "2025-03-15", 
      status: "Complete",
      doctor: "Dr. Sarah Johnson"
    },
  ];

  // Sample summary reports
  const summaryReports = [
    { id: 1, title: "Weekly Patient Summary", date: "2025-04-10", type: "Summary", generated: "Automated" },
    { id: 2, title: "Monthly Patient Outcomes", date: "2025-04-01", type: "Analytics", generated: "Automated" },
    { id: 3, title: "Quarterly Treatment Success Rates", date: "2025-03-31", type: "Analytics", generated: "Automated" },
    { id: 4, title: "Department Performance Metrics", date: "2025-03-25", type: "Performance", generated: "Automated" },
    { id: 5, title: "Custom Patient Cohort Analysis", date: "2025-03-15", type: "Custom", generated: "Manual" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" />
            Generate Analytics
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="patient">Patient Reports</TabsTrigger>
          <TabsTrigger value="summary">Summary Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patient">
          <Card>
            <CardHeader>
              <CardTitle>Patient Medical Reports</CardTitle>
              <CardDescription>View and manage patient-specific clinical reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="text" placeholder="Search reports..." className="pl-8" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="clinical">Clinical</SelectItem>
                      <SelectItem value="treatment">Treatment Plan</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                      <SelectItem value="lab">Lab Results</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="this_week">This Week</SelectItem>
                      <SelectItem value="this_month">This Month</SelectItem>
                      <SelectItem value="last_month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                {patientReports.map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-muted">
                        <User className="h-5 w-5" />
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{report.patient}</span>
                          <span className="mx-1">•</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className="mr-4 bg-green-50 text-green-700 border-green-200"
                      >
                        {report.type}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <DownloadCloud className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Summary & Analytics Reports</CardTitle>
              <CardDescription>View aggregated data and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">86%</div>
                      <p className="text-sm text-muted-foreground mt-1">Treatment Success Rate</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">24</div>
                      <p className="text-sm text-muted-foreground mt-1">Patients Seen This Week</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">92%</div>
                      <p className="text-sm text-muted-foreground mt-1">Appointment Compliance</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-lg font-medium mb-4">Available Reports</h3>
              <div className="space-y-4">
                {summaryReports.map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <File className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>Generated {report.generated.toLowerCase()}</span>
                          <span className="mx-1">•</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className={`mr-4 
                          ${report.type === "Analytics" 
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : report.type === "Performance"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                      >
                        {report.type}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <DownloadCloud className="h-4 w-4" />
                        </Button>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;