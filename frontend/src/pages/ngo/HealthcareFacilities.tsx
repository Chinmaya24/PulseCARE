import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  Calendar, 
  CalendarCheck, 
  Clock, 
  Filter, 
  FileText, 
  LocateFixed, 
  MapPin, 
  MoreHorizontal, 
  Phone, 
  Search, 
  Shield, 
  Star, 
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
import { Progress } from "@/components/ui/progress";

const HealthcareFacilities = () => {
  // Sample healthcare facilities data
  const facilities = [
    { 
      id: 1, 
      name: "Metro General Hospital", 
      type: "Hospital", 
      location: "Downtown, Metro City",
      rating: 4.7,
      status: "Active Partner",
      contactPerson: "Dr. William Chen",
      phone: "(555) 123-4567",
      email: "admin@metrogeneral.org",
      services: ["Emergency Care", "Surgery", "Intensive Care", "Radiology", "Laboratory"],
      capacity: {
        beds: 350,
        utilizationRate: 82,
        doctors: 85,
        nurses: 210
      },
      lastInspection: "2025-03-15",
      nextAvailability: "Immediate",
      notes: "Fully equipped tertiary care hospital with all major specialties. Primary partner for emergency referrals and complex cases."
    },
    { 
      id: 2, 
      name: "Community Health Center", 
      type: "Primary Care", 
      location: "North District, Metro City",
      rating: 4.5,
      status: "Active Partner",
      contactPerson: "Dr. Emily Rodriguez",
      phone: "(555) 234-5678",
      email: "info@communityhealthcenter.org",
      services: ["Family Medicine", "Pediatrics", "Vaccination", "Basic Laboratory", "Health Education"],
      capacity: {
        beds: 25,
        utilizationRate: 65,
        doctors: 12,
        nurses: 28
      },
      lastInspection: "2025-03-20",
      nextAvailability: "1-2 days",
      notes: "Community-focused primary care facility serving lower-income neighborhoods. Excellent for basic care and health drives."
    },
    { 
      id: 3, 
      name: "Children's Wellness Hospital", 
      type: "Specialty", 
      location: "East Side, Metro City",
      rating: 4.9,
      status: "Active Partner",
      contactPerson: "Dr. Sarah Thompson",
      phone: "(555) 345-6789",
      email: "contact@childrenswellness.org",
      services: ["Pediatric Care", "Child Surgery", "Neonatal Care", "Child Psychology", "Developmental Assessment"],
      capacity: {
        beds: 120,
        utilizationRate: 75,
        doctors: 45,
        nurses: 110
      },
      lastInspection: "2025-02-28",
      nextAvailability: "3-5 days",
      notes: "Specialized pediatric hospital with comprehensive child healthcare services. Primary partner for child vaccination campaigns."
    },
    { 
      id: 4, 
      name: "Rural Health Clinic", 
      type: "Primary Care", 
      location: "Greenfield County",
      rating: 4.2,
      status: "Active Partner",
      contactPerson: "Dr. Robert Wilson",
      phone: "(555) 456-7890",
      email: "clinic@ruralhealthclinic.org",
      services: ["General Medicine", "Maternal Care", "First Aid", "Basic Laboratory", "Telemedicine"],
      capacity: {
        beds: 10,
        utilizationRate: 60,
        doctors: 3,
        nurses: 8
      },
      lastInspection: "2025-04-02",
      nextAvailability: "Same day",
      notes: "Small but vital rural clinic serving farming communities. Important for extending healthcare access to remote areas."
    },
    { 
      id: 5, 
      name: "Women's Health Center", 
      type: "Specialty", 
      location: "Central District, Metro City",
      rating: 4.8,
      status: "Active Partner",
      contactPerson: "Dr. Lisa Johnson",
      phone: "(555) 567-8901",
      email: "info@womenshealthcenter.org",
      services: ["Obstetrics", "Gynecology", "Breast Health", "Fertility Services", "Women's Health Education"],
      capacity: {
        beds: 60,
        utilizationRate: 78,
        doctors: 22,
        nurses: 45
      },
      lastInspection: "2025-03-10",
      nextAvailability: "2-3 days",
      notes: "Specialized center focused on women's healthcare needs. Key partner for maternal health campaigns and reproductive health education."
    },
    { 
      id: 6, 
      name: "Vision Care Institute", 
      type: "Specialty", 
      location: "West End, Metro City",
      rating: 4.6,
      status: "Active Partner",
      contactPerson: "Dr. Michael Kim",
      phone: "(555) 678-9012",
      email: "appointments@visioncare.org",
      services: ["Ophthalmology", "Optometry", "Eye Surgery", "Vision Therapy", "Glasses & Contacts"],
      capacity: {
        beds: 30,
        utilizationRate: 70,
        doctors: 15,
        nurses: 25
      },
      lastInspection: "2025-02-15",
      nextAvailability: "1 week",
      notes: "Specialized eye care facility with advanced diagnostic and surgical equipment. Primary partner for vision screening campaigns."
    },
    { 
      id: 7, 
      name: "Senior Wellness Center", 
      type: "Specialty", 
      location: "Riverside Area, Metro City",
      rating: 4.5,
      status: "Active Partner",
      contactPerson: "Dr. James Peterson",
      phone: "(555) 789-0123",
      email: "care@seniorwellness.org",
      services: ["Geriatric Medicine", "Physical Therapy", "Memory Care", "Chronic Disease Management", "Palliative Care"],
      capacity: {
        beds: 80,
        utilizationRate: 85,
        doctors: 18,
        nurses: 60
      },
      lastInspection: "2025-03-25",
      nextAvailability: "3-4 days",
      notes: "Specialized facility for elderly care and age-related health conditions. Important partner for senior health initiatives."
    },
    { 
      id: 8, 
      name: "Mental Health Institute", 
      type: "Specialty", 
      location: "North Hills, Metro City",
      rating: 4.7,
      status: "Active Partner",
      contactPerson: "Dr. David Brown",
      phone: "(555) 890-1234",
      email: "info@mentalhealthinstitute.org",
      services: ["Psychiatry", "Psychology", "Addiction Treatment", "Group Therapy", "Crisis Intervention"],
      capacity: {
        beds: 50,
        utilizationRate: 75,
        doctors: 20,
        nurses: 40
      },
      lastInspection: "2025-02-20",
      nextAvailability: "1 week",
      notes: "Specialized mental health facility providing comprehensive psychiatric and psychological services. Key partner for mental health awareness campaigns."
    },
    { 
      id: 9, 
      name: "Diabetes & Endocrine Center", 
      type: "Specialty", 
      location: "Medical District, Metro City",
      rating: 4.8,
      status: "Active Partner",
      contactPerson: "Dr. Maria Gonzalez",
      phone: "(555) 901-2345",
      email: "care@diabetescenter.org",
      services: ["Endocrinology", "Diabetes Care", "Nutritional Counseling", "Hormone Therapy", "Patient Education"],
      capacity: {
        beds: 25,
        utilizationRate: 80,
        doctors: 12,
        nurses: 20
      },
      lastInspection: "2025-03-05",
      nextAvailability: "4-5 days",
      notes: "Specialized center for diabetes and other endocrine disorders. Essential partner for diabetes screening and management programs."
    },
    { 
      id: 10, 
      name: "Suburban Medical Clinic", 
      type: "Primary Care", 
      location: "Oak Heights, Suburb",
      rating: 4.3,
      status: "Inactive",
      contactPerson: "Dr. Jennifer Taylor",
      phone: "(555) 012-3456",
      email: "info@suburbanmedical.org",
      services: ["Family Medicine", "Minor Procedures", "Preventive Care", "Laboratory Services"],
      capacity: {
        beds: 15,
        utilizationRate: 0,
        doctors: 5,
        nurses: 12
      },
      lastInspection: "2024-10-15",
      nextAvailability: "N/A",
      notes: "Former partner facility currently undergoing renovation. Partnership temporarily suspended until renovations complete in August 2025."
    },
  ];

  // Filter facilities by status
  const activePartners = facilities.filter(facility => facility.status === "Active Partner");
  const inactivePartners = facilities.filter(facility => facility.status === "Inactive");
  const pendingPartners = facilities.filter(facility => facility.status === "Pending");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Healthcare Facilities</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Facilities Report
          </Button>
          <Button>
            <Building className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search facilities..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Facility Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
              <SelectItem value="primary">Primary Care</SelectItem>
              <SelectItem value="specialty">Specialty</SelectItem>
              <SelectItem value="clinic">Clinic</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="metro">Metro City</SelectItem>
              <SelectItem value="suburban">Suburban Areas</SelectItem>
              <SelectItem value="rural">Rural Areas</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="active">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active Partners</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">
            Active Partners ({activePartners.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive ({inactivePartners.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingPartners.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid gap-4">
            {activePartners.map(facility => (
              <Card key={facility.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-muted">
                        <Building className="h-6 w-6" />
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{facility.type}</span>
                          <span className="mx-1">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{facility.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{facility.rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Badge 
                          className="ml-2 bg-green-100 text-green-800 border-green-200"
                        >
                          Active Partner
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarCheck className="h-3 w-3 mr-1" />
                        <span>Next available: {facility.nextAvailability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex items-center text-sm mb-2">
                          <Shield className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">Services:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {facility.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs font-normal">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm mb-2">
                          <span className="font-medium">Capacity:</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Bed Utilization</span>
                            <span>{facility.capacity.utilizationRate}%</span>
                          </div>
                          <Progress value={facility.capacity.utilizationRate} className="h-2" />
                          <div className="flex justify-between text-xs">
                            <span>Total beds: {facility.capacity.beds}</span>
                            <span>Staff: {facility.capacity.doctors} doctors, {facility.capacity.nurses} nurses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Notes:</span> {facility.notes}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-4 w-4" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Calendar className="h-4 w-4" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <LocateFixed className="h-4 w-4" />
                        View Map
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm">Facility Details</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View MOU Details</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Health Drive</DropdownMenuItem>
                          <DropdownMenuItem>View Referral History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate Partnership</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="grid gap-4">
            {inactivePartners.map(facility => (
              <Card key={facility.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-muted">
                        <Building className="h-6 w-6" />
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{facility.type}</span>
                          <span className="mx-1">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{facility.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        className="bg-gray-100 text-gray-800 border-gray-200"
                      >
                        Inactive
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last inspection: {facility.lastInspection}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Notes:</span> {facility.notes}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-4 w-4" />
                        Contact Facility
                      </Button>
                    </div>
                    <Button size="sm">Reactivate Partnership</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Partnerships</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Building className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Pending Partnerships</h3>
              <p className="text-muted-foreground mb-4">There are currently no healthcare facilities pending partnership approval</p>
              <Button>Initiate New Partnership</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthcareFacilities;