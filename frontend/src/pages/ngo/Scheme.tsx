import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  ExternalLink,

  FileText, 
  Info,
  MoreHorizontal, 
  Search,
  Share2,
  Bookmark
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GovernmentSchemes = () => {
  // Sample schemes data
  const schemes = [
    { 
      id: 1, 
      title: "Janani Suraksha Yojana (JSY)", 
      category: "Maternal Health", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "2005",
      beneficiaries: "Pregnant Women",
      status: "Active",
      portalLink: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=308",
      logoUrl: "/api/placeholder/100/100",
      description: "A safe motherhood intervention under the National Health Mission to reduce maternal and neonatal mortality by promoting institutional delivery among poor pregnant women."
    },
    { 
      id: 2, 
      title: "Janani Shishu Suraksha Karyakram (JSSK)", 
      category: "Maternal & Child Health", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "2011",
      beneficiaries: "Pregnant Women & Infants",
      status: "Active",
      portalLink: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=308",
      logoUrl: "/api/placeholder/100/100",
      description: "Entitles all pregnant women delivering in public health institutions to absolutely free delivery including cesarean section and free treatment of sick infants up to one year of age."
    },
    { 
      id: 3, 
      title: "Rashtriya Kishor Swasthya Karyakram (RKSK)", 
      category: "Adolescent Health", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "2014",
      beneficiaries: "Adolescents (10-19 years)",
      status: "Active",
      portalLink: "https://rksk.in/home",
      logoUrl: "/api/placeholder/100/100",
      description: "Comprehensive program focusing on adolescent health addressing nutrition, reproductive health, substance abuse, non-communicable diseases, mental health, and gender-based violence."
    },
    { 
      id: 4, 
      title: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)", 
      category: "Maternal Health", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "2016",
      beneficiaries: "Pregnant Women",
      status: "Active",
      portalLink: "https://pmsma.mohfw.gov.in/",
      logoUrl: "/api/placeholder/100/100",
      description: "Provides fixed-day assured, comprehensive and quality antenatal care to pregnant women on the 9th of every month to ensure that every pregnant woman receives at least one checkup in the 2nd/3rd trimester."
    },
    { 
      id: 5, 
      title: "National Iron Plus Initiative (NIPI)", 
      category: "Nutrition", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "2013",
      beneficiaries: "Children, Adolescents, Women",
      status: "Active",
      portalLink: "https://health.vikaspedia.in/viewcontent/health/health-campaigns/national-iron-plus-initiative?lgn=en",
      logoUrl: "/api/placeholder/100/100",
      description: "A comprehensive strategy to combat iron deficiency anemia prevalence among all age groups through supervised weekly/daily iron-folic acid supplementation."
    },
    { 
      id: 6, 
      title: "National Programme for Health Care of the Elderly (NPHCE)", 
      category: "Elderly Care", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "2010",
      beneficiaries: "Elderly Citizens",
      status: "Active",
      portalLink: "https://mohfw.gov.in/?q=major-programmes/Non-Communicable-Diseases/Non-Communicable-Diseases-1",
      logoUrl: "/api/placeholder/100/100",
      description: "Addresses health care needs of elderly people by providing dedicated health facilities through State health delivery system."
    },
    { 
      id: 7, 
      title: "National Programme for Control of Blindness (NPCB)", 
      category: "Eye Care", 
      ministry: "Ministry of Health and Family Welfare",
      launched: "1976",
      beneficiaries: "General Population",
      status: "Active",
      portalLink: "https://npcbvi.mohfw.gov.in/Home",
      logoUrl: "/api/placeholder/100/100",
      description: "Aims to reduce the prevalence of blindness through identification and treatment of blindness across the country with special emphasis on rural areas."
    },
  ];

  // Featured schemes for highlight section
  const featuredSchemes = schemes.slice(0, 3);
  
  // Categories for filtering
  const categories = [
    "Maternal Health", 
    "Child Health", 
    "Adolescent Health", 
    "Nutrition", 
    "Eye Care", 
    "Elderly Care",
    "Mental Health",
    "Communicable Diseases",
    "Non-Communicable Diseases"
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Government Health Schemes for NGOs</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Schemes
          </Button>
          <Button>
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Schemes
          </Button>
        </div>
      </div>

      {/* Featured Schemes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredSchemes.map(scheme => (
          <Card key={scheme.id} className="overflow-hidden">
            <div className="h-2 bg-blue-500"></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{scheme.title}</CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {scheme.category}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {scheme.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ministry:</span>
                <span className="font-medium text-right">{scheme.ministry}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Launched:</span>
                <span>{scheme.launched}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Beneficiaries:</span>
                <span>{scheme.beneficiaries}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <a href={scheme.portalLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Portal
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all-schemes">
        <TabsList className="mb-4">
          <TabsTrigger value="all-schemes">All Schemes</TabsTrigger>
          <TabsTrigger value="maternal-health">Maternal Health</TabsTrigger>
          <TabsTrigger value="child-health">Child Health</TabsTrigger>
          <TabsTrigger value="special-programs">Special Programs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-schemes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Available Government Schemes</CardTitle>
                  <CardDescription>Health programs and schemes available for NGO participation</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={category.toLowerCase().replace(/\s+/g, '-')}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Launched</TableHead>
                    <TableHead>Beneficiaries</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemes.map(scheme => (
                    <TableRow key={scheme.id}>
                      <TableCell>
                        <div className="font-medium">{scheme.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-64">{scheme.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {scheme.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {scheme.launched}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {scheme.beneficiaries}
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
                                <Info className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Portal
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Download Guidelines
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bookmark className="h-4 w-4 mr-2" />
                                Save Scheme
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maternal-health">
          <Card>
            <CardHeader>
              <CardTitle>Maternal Health Schemes</CardTitle>
              <CardDescription>Government programs focused on maternal health and prenatal care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {schemes
                  .filter(scheme => scheme.category === "Maternal Health" || scheme.category === "Maternal & Child Health")
                  .map(scheme => (
                    <Card key={scheme.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{scheme.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <span>{scheme.ministry}</span>
                              <span className="mx-1">•</span>
                              <span>Est. {scheme.launched}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{scheme.description}</p>
                          </div>
                          <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                            {scheme.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            Beneficiaries: {scheme.beneficiaries}
                          </div>
                          <Button size="sm" asChild>
                            <a href={scheme.portalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Portal
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="child-health">
          <Card>
            <CardHeader>
              <CardTitle>Child Health Schemes</CardTitle>
              <CardDescription>Government programs focused on child health and development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {schemes
                  .filter(scheme => scheme.category === "Child Health" || scheme.category === "Maternal & Child Health" || scheme.category === "Nutrition")
                  .map(scheme => (
                    <Card key={scheme.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{scheme.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <span>{scheme.ministry}</span>
                              <span className="mx-1">•</span>
                              <span>Est. {scheme.launched}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{scheme.description}</p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {scheme.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            Beneficiaries: {scheme.beneficiaries}
                          </div>
                          <Button size="sm" asChild>
                            <a href={scheme.portalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Portal
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special-programs">
          <Card>
            <CardHeader>
              <CardTitle>Special Programs</CardTitle>
              <CardDescription>Specialized healthcare initiatives for specific populations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {schemes
                  .filter(scheme => 
                    scheme.category === "Elderly Care" || 
                    scheme.category === "Eye Care" || 
                    scheme.category === "Adolescent Health"
                  )
                  .map(scheme => (
                    <Card key={scheme.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{scheme.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <span>{scheme.ministry}</span>
                              <span className="mx-1">•</span>
                              <span>Est. {scheme.launched}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{scheme.description}</p>
                          </div>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {scheme.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            Beneficiaries: {scheme.beneficiaries}
                          </div>
                          <Button size="sm" asChild>
                            <a href={scheme.portalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Portal
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>NGO Participation Guidelines</CardTitle>
          <CardDescription>Requirements and procedures for NGOs to participate in government schemes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Eligibility Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>NGO must be registered under the Indian Societies Registration Act or equivalent</li>
                <li>Minimum 3 years of demonstrated experience in healthcare services</li>
                <li>Valid NITI Aayog registration and Unique ID</li>
                <li>Audited financial statements for the last 3 years</li>
                <li>Compliance with FCRA regulations if receiving foreign funding</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Application Process</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Register on the respective scheme portal</li>
                <li>Complete the online application form with required documentation</li>
                <li>Submit project proposal aligned with scheme objectives</li>
                <li>Participate in verification and due diligence process</li>
                <li>Sign MoU upon approval and complete onboarding</li>
              </ol>
            </div>

            <div className="flex justify-center mt-4">
              <Button>Download Comprehensive Guidelines</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentSchemes;