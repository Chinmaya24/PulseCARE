import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Download, 
  FileText, 
  Heart, 
  MapPin, 
  Share2 
} from "lucide-react";
import { 
  Bar, 
  BarChart as ReBarChart, 
  CartesianGrid, 
  Line, 
  LineChart as ReLineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
  AreaChart as ReAreaChart,
  Area
} from "recharts";

const Impact = () => {
  // Sample data for patient impact chart
  const patientImpactData = [
    { month: "Jul", patients: 320, followups: 180 },
    { month: "Aug", patients: 350, followups: 210 },
    { month: "Sep", patients: 380, followups: 240 },
    { month: "Oct", patients: 428, followups: 285 },
    { month: "Nov", patients: 450, followups: 310 },
    { month: "Dec", patients: 420, followups: 290 },
  ];

  // Sample data for campaign performance
  const campaignPerformanceData = [
    { name: "Diabetes Awareness", target: 400, reached: 428, success: 85 },
    { name: "Vision Care", target: 300, reached: 315, success: 75 },
    { name: "Women's Health", target: 500, reached: 587, success: 92 },
    { name: "Child Vaccination", target: 150, reached: 124, success: 68 },
  ];

  // Sample data for health outcomes
  const healthOutcomesData = [
    { condition: "Diabetes", baseline: 35, current: 70, target: 80 },
    { condition: "Hypertension", baseline: 40, current: 65, target: 75 },
    { condition: "Eye Health", baseline: 25, current: 60, target: 70 },
    { condition: "Women's Health", baseline: 45, current: 80, target: 85 },
    { condition: "Child Health", baseline: 50, current: 72, target: 90 },
  ];

  // Sample data for geographic impact
  const geographicImpactData = [
    { region: "Urban", patients: 750, campaigns: 5, healthDrives: 8 },
    { region: "Suburban", patients: 420, campaigns: 3, healthDrives: 5 },
    { region: "Rural", patients: 680, campaigns: 4, healthDrives: 10 },
    { region: "Remote", patients: 180, campaigns: 1, healthDrives: 3 },
  ];

  // Sample data for demographic breakdown
  const demographicBreakdownData = [
    { name: "Children (0-14)", value: 250 },
    { name: "Youth (15-24)", value: 180 },
    { name: "Adults (25-44)", value: 520 },
    { name: "Middle-aged (45-64)", value: 350 },
    { name: "Seniors (65+)", value: 230 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

  // Sample data for community feedback
  const communityFeedbackData = [
    { category: "Service Quality", rating: 4.7 },
    { category: "Accessibility", rating: 4.2 },
    { category: "Staff Helpfulness", rating: 4.8 },
    { category: "Medical Advice", rating: 4.6 },
    { category: "Follow-up Care", rating: 4.3 },
    { category: "Overall Experience", rating: 4.5 },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      quote: "The diabetes awareness campaign not only helped me understand my condition better but connected me with specialists I couldn't otherwise access. My blood sugar is now under control for the first time in years.",
      name: "Maria Garcia",
      age: 58,
      location: "Rural District"
    },
    {
      id: 2,
      quote: "The free eye checkup camp detected my glaucoma at an early stage. Without this program, I might have lost my vision before realizing there was a problem.",
      name: "Robert Wilson",
      age: 67,
      location: "Suburban Area"
    },
    {
      id: 3,
      quote: "As a single mother of three, healthcare was always a luxury I couldn't afford. The women's health initiative provided me with essential care and education that changed my life.",
      name: "Aisha Khan",
      age: 35,
      location: "Urban Center"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Impact Assessment</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Share Impact
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Impact Overview</TabsTrigger>
            <TabsTrigger value="health">Health Outcomes</TabsTrigger>
            <TabsTrigger value="community">Community Impact</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2 mt-4">
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="diabetes">Diabetes Awareness</SelectItem>
                <SelectItem value="vision">Vision Care</SelectItem>
                <SelectItem value="womens">Women's Health</SelectItem>
                <SelectItem value="child">Child Vaccination</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Impact</CardTitle>
                  <CardDescription>Patients reached and follow-up care</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReAreaChart data={patientImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="patients" name="Patients Reached" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="followups" name="Follow-up Care" stroke="#82ca9d" fill="#82ca9d" />
                      </ReAreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Target vs. actual reach of campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={campaignPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="target" name="Target" fill="#8884d8" />
                        <Bar dataKey="reached" name="Reached" fill="#82ca9d" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Impact</CardTitle>
                  <CardDescription>Distribution across different regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={geographicImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="patients" name="Patients" fill="#8884d8" />
                        <Bar dataKey="campaigns" name="Campaigns" fill="#82ca9d" />
                        <Bar dataKey="healthDrives" name="Health Drives" fill="#ffc658" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Demographic Breakdown</CardTitle>
                  <CardDescription>Age distribution of beneficiaries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <Pie
                          data={demographicBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {demographicBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}} fill={COLORS[index % COLORS.length]`} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Health Outcomes Progress</CardTitle>
                    <CardDescription>Baseline vs. current health indicators</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart className="h-5 w-5 text-muted-foreground" />
                    <Button variant="outline" size="sm">
                      View Detailed Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={healthOutcomesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="condition" />
                        <YAxis label={{ value: 'Health Score (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="baseline" name="Baseline" fill="#8884d8" />
                        <Bar dataKey="current" name="Current" fill="#82ca9d" />
                        <Bar dataKey="target" name="Target" fill="#ffc658" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Health Indicators</CardTitle>
                  <CardDescription>Improvement in critical health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Diabetes Control Rate</h4>
                        <span className="text-green-600 font-medium">+28%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Percentage of patients with controlled blood glucose levels increased from 45% to 73%</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Hypertension Management</h4>
                        <span className="text-green-600 font-medium">+32%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Percentage of patients with controlled blood pressure increased from 38% to 70%</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Vision Improvement</h4>
                        <span className="text-green-600 font-medium">+45%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Percentage of patients with corrected vision through provided glasses or treatment</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Maternal Health</h4>
                        <span className="text-green-600 font-medium">+38%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Increase in pregnant women receiving proper prenatal care and health monitoring</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Child Vaccination</h4>
                        <span className="text-green-600 font-medium">+52%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Increase in children with complete, age-appropriate vaccination coverage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Access Improvement</CardTitle>
                  <CardDescription>Enhanced access to essential healthcare services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReLineChart data={[
                        { month: "Jul", primary: 35, specialist: 15, emergency: 8 },
                        { month: "Aug", primary: 42, specialist: 20, emergency: 10 },
                        { month: "Sep", primary: 48, specialist: 25, emergency: 12 },
                        { month: "Oct", primary: 55, specialist: 30, emergency: 15 },
                        { month: "Nov", primary: 60, specialist: 35, emergency: 18 },
                        { month: "Dec", primary: 65, specialist: 40, emergency: 20 },
                      ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis label={{ value: 'Access Rate (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="primary" name="Primary Care" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="specialist" name="Specialist Care" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="emergency" name="Emergency Services" stroke="#ffc658" />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Social Determinants Impact</CardTitle>
                    <CardDescription>Improvements in key social factors affecting health</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/30 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-5 w-5 text-pink-500" />
                          <h3 className="font-medium">Health Education</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Increase in health literacy and awareness across communities</p>
                        <div className="mt-4 text-3xl font-bold text-pink-500">+65%</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on pre and post-campaign assessments</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-blue-500" />
                          <h3 className="font-medium">Healthcare Access</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Reduction in travel distance to access healthcare services</p>
                        <div className="mt-4 text-3xl font-bold text-blue-500">-42%</div>
                        <p className="text-xs text-muted-foreground mt-1">Average travel distance reduced from 28km to 16km</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Preventive Care</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Increased adoption of preventive healthcare measures</p>
                        <div className="mt-4 text-3xl font-bold text-green-500">+78%</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on regular check-ups and vaccination rates</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Community Empowerment Indicators</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={[
                          { category: "Health Knowledge", before: 35, after: 72 },
                          { category: "Self-care Practices", before: 28, after: 68 },
                          { category: "Preventive Measures", before: 42, after: 78 },
                          { category: "Resource Awareness", before: 30, after: 75 },
                          { category: "Community Advocacy", before: 25, after: 60 },
                        ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="before" name="Before Intervention" fill="#8884d8" />
                          <Bar dataKey="after" name="After Intervention" fill="#82ca9d" />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Economic Impact</CardTitle>
                  <CardDescription>Financial benefits to individuals and community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Healthcare Cost Savings</h4>
                        <span className="text-green-600 font-medium">$425,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Estimated savings from preventive care and early interventions</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Productivity Gain</h4>
                        <span className="text-green-600 font-medium">$320,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Estimated economic value from reduced sick days and improved work capacity</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Medication Assistance</h4>
                        <span className="text-green-600 font-medium">$175,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Value of free or subsidized medications provided to patients</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Treatment Value</h4>
                        <span className="text-green-600 font-medium">$580,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Estimated cost of medical services provided free of charge</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-green-800">Total Economic Impact</h4>
                        <span className="text-green-800 font-bold">$1,500,000</span>
                      </div>
                      <p className="text-sm text-green-700">Combined economic value generated through all programs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>Real impact on individual lives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testimonials.map(testimonial => (
                      <div key={testimonial.id} className="bg-muted/30 p-4 rounded-md relative">
                        <div className="text-6xl absolute -top-2 left-2 text-muted-foreground opacity-15">"</div>
                        <p className="text-sm italic relative z-10">{testimonial.quote}</p>
                        <div className="mt-3 flex justify-between items-center text-sm">
                          <div>
                            <div className="font-medium">{testimonial.name}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.age} years, {testimonial.location}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">View More Stories</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="feedback" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Community Satisfaction</CardTitle>
                  <CardDescription>Feedback ratings across service categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart layout="vertical" data={communityFeedbackData} margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 5]} />
                        <YAxis dataKey="category" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rating" name="Rating (out of 5)" fill="#8884d8" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Analysis</CardTitle>
                  <CardDescription>Key themes from qualitative feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h4 className="font-medium">Areas of Excellence</h4>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                        <li>Doctor expertise and compassion</li>
                        <li>Free medication availability</li>
                        <li>Clear health education materials</li>
                        <li>Convenient health drive locations</li>
                        <li>Follow-up care coordination</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h4 className="font-medium">Areas for Improvement</h4>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                        <li>Waiting times at health drives</li>
                        <li>More languages for educational materials</li>
                        <li>Extended hours for working individuals</li>
                        <li>Digital appointment scheduling options</li>
                        <li>More specialized services in remote areas</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
                      <h4 className="font-medium text-blue-800">Key Feedback Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <div className="text-xs text-blue-700">Would Recommend</div>
                          <div className="text-2xl font-bold text-blue-800">92%</div>
                        </div>
                        <div>
                          <div className="text-xs text-blue-700">Satisfaction Rate</div>
                          <div className="text-2xl font-bold text-blue-800">89%</div>
                        </div>
                        <div>
                          <div className="text-xs text-blue-700">Return Intention</div>
                          <div className="text-2xl font-bold text-blue-800">94%</div>
                        </div>
                        <div>
                          <div className="text-xs text-blue-700">Overall Rating</div>
                          <div className="text-2xl font-bold text-blue-800">4.5/5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Impact on Health-seeking Behavior</CardTitle>
                  <CardDescription>Changes in preventive care adoption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReLineChart data={[
                        { month: "Jul", preventive: 25, routine: 30, emergency: 45 },
                        { month: "Aug", preventive: 30, routine: 35, emergency: 40 },
                        { month: "Sep", preventive: 40, routine: 38, emergency: 38 },
                        { month: "Oct", preventive: 45, routine: 40, emergency: 35 },
                        { month: "Nov", preventive: 55, routine: 42, emergency: 30 },
                        { month: "Dec", preventive: 60, routine: 45, emergency: 25 },
                      ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis label={{ value: 'Percentage of Care Type', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="preventive" name="Preventive Care" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="routine" name="Routine Check-ups" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="emergency" name="Emergency Visits" stroke="#ff8042" />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-green-50 border border-green-100 p-3 rounded-md text-sm text-green-800">
                    <strong>Analysis:</strong> There is a clear positive trend showing increased preventive and routine care utilization, with a corresponding decrease in emergency visits. This indicates successful behavior change toward more proactive healthcare engagement, potentially leading to better health outcomes and reduced healthcare costs over time.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Impact;