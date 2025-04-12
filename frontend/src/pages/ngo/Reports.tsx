import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Download, 
  FileBarChart, 
  FileText, 
  MoreHorizontal, 
  Printer, 
  Share2 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Reports = () => {
  // Sample reports data
  const reports = [
    { 
      id: 1, 
      title: "Diabetes Awareness Drive Impact", 
      category: "Campaign", 
      date: "Apr 10, 2025",
      type: "Impact Assessment",
      format: "PDF",
      size: "3.8 MB",
      status: "Approved",
      description: "Comprehensive analysis of the Diabetes Awareness Drive campaign including participation rates, screenings conducted, and health outcomes."
    },
    { 
      id: 2, 
      title: "Vision Care for All Mid-Campaign", 
      category: "Campaign", 
      date: "Apr 05, 2025",
      type: "Progress Report",
      format: "PDF",
      size: "2.5 MB",
      status: "Approved",
      description: "Mid-campaign assessment of the Vision Care for All initiative detailing progress, challenges, and preliminary outcomes."
    },
    { 
      id: 3, 
      title: "Women's Health Initiative Final", 
      category: "Campaign", 
      date: "Apr 02, 2025",
      type: "Final Report",
      format: "PDF",
      size: "4.7 MB",
      status: "Approved",
      description: "Final report on the Women's Health Initiative campaign summarizing all activities, participation data, and measurable health impacts."
    },
    { 
      id: 4, 
      title: "Q1 Patient Referral Analytics", 
      category: "Patients", 
      date: "Mar 31, 2025",
      type: "Quarterly Report",
      format: "XLSX",
      size: "1.8 MB",
      status: "Approved",
      description: "Quarterly analysis of patient referral patterns, acceptance rates, treatment completion, and health outcome improvements."
    },
    { 
      id: 5, 
      title: "Blood Donation Camp Outcomes", 
      category: "Health Drive", 
      date: "Mar 25, 2025",
      type: "Event Report",
      format: "PDF",
      size: "2.2 MB",
      status: "Approved",
      description: "Detailed report on the blood donation camp including participation metrics, blood units collected, and community impact."
    },
    { 
      id: 6, 
      title: "Annual NGO Performance Summary", 
      category: "Annual", 
      date: "Mar 15, 2025",
      type: "Annual Report",
      format: "PDF",
      size: "6.5 MB",
      status: "Approved",
      description: "Comprehensive annual report detailing all NGO activities, campaigns, health drives, budget utilization, and impact metrics."
    },
    { 
      id: 7, 
      title: "Partner Doctors Engagement", 
      category: "Doctors", 
      date: "Mar 10, 2025",
      type: "Analysis Report",
      format: "PDF",
      size: "2.1 MB",
      status: "Approved",
      description: "Analysis of doctor participation in NGO initiatives, including hours contributed, patients served, and specialties represented."
    },
    { 
      id: 8, 
      title: "Healthcare Facilities Assessment", 
      category: "Facilities", 
      date: "Mar 05, 2025",
      type: "Evaluation Report",
      format: "PDF",
      size: "3.7 MB",
      status: "Approved",
      description: "Evaluation of partner healthcare facilities including capacity, equipment status, and service quality assessments."
    },
    { 
      id: 9, 
      title: "Child Vaccination Program Draft", 
      category: "Campaign", 
      date: "Mar 01, 2025",
      type: "Progress Report",
      format: "PDF",
      size: "1.9 MB",
      status: "Draft",
      description: "Preliminary analysis of the Child Vaccination Program including community reception, early participation rates, and challenges."
    },
    { 
      id: 10, 
      title: "Budget Utilization Q1", 
      category: "Financial", 
      date: "Feb 28, 2025",
      type: "Financial Report",
      format: "XLSX",
      size: "1.2 MB",
      status: "Draft",
      description: "Analysis of budget allocation, utilization, and variance across campaigns, health drives, and operational expenses."
    },
  ];

  // Template reports data
  const reportTemplates = [
    { 
      id: 1, 
      title: "Campaign Progress Report", 
      description: "Template for monitoring ongoing campaign progress, participation metrics, and preliminary outcomes.",
      lastGenerated: "Apr 05, 2025"
    },
    { 
      id: 2, 
      title: "Campaign Impact Assessment", 
      description: "Comprehensive template for evaluating the health and social impact of completed campaigns.",
      lastGenerated: "Apr 10, 2025"
    },
    { 
      id: 3, 
      title: "Health Drive Summary", 
      description: "Template for documenting health drive activities, participation, and immediate outcomes.",
      lastGenerated: "Mar 25, 2025"
    },
    { 
      id: 4, 
      title: "Patient Referral Analytics", 
      description: "Analysis template for patient referral patterns, healthcare access, and treatment outcomes.",
      lastGenerated: "Mar 31, 2025"
    },
    { 
      id: 5, 
      title: "Quarterly NGO Performance", 
      description: "Template for quarterly assessment of overall NGO activities, reach, and impact metrics.",
      lastGenerated: "Never" 
    },
  ];

  // Filter reports
  const approvedReports = reports.filter(report => report.status === "Approved");
  const draftReports = reports.filter(report => report.status === "Draft");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Import Format</Button>
          <Button>Generate New Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Standardized formats for common reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportTemplates.map(template => (
                <div key={template.id} className="bg-muted/50 p-3 rounded-md">
                  <h4 className="font-medium">{template.title}</h4>
                  <p className="text-sm text-muted-foreground my-1">{template.description}</p>
                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-muted-foreground">
                      {template.lastGenerated !== "Never" ? 
                        `Last used: ${template.lastGenerated} `: 
                        "Never used"}
                    </span>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Generated reports ready for review or download</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="drive">Health Drive</SelectItem>
                  <SelectItem value="patients">Patients</SelectItem>
                  <SelectItem value="annual">Annual Reports</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="progress">Progress Report</SelectItem>
                  <SelectItem value="impact">Impact Assessment</SelectItem>
                  <SelectItem value="final">Final Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedReports.slice(0, 6).map(report => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-64">{report.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {report.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        {report.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{report.format}</span>
                        <span className="text-xs text-muted-foreground">({report.size})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
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
                              <FileText className="h-4 w-4 mr-2" />
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="h-4 w-4 mr-2" />
                              Print
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline">View All Reports</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Draft Reports</CardTitle>
          <CardDescription>Reports in progress that require finalization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {draftReports.map(report => (
              <Card key={report.id} className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <FileBarChart className="h-3 w-3 mr-1" />
                        <span>{report.category}</span>
                        <span className="mx-1">•</span>
                        <span>{report.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{report.description}</p>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                      Draft
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      Last edited: {report.date}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Delete</Button>
                      <Button size="sm">Continue Editing</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;