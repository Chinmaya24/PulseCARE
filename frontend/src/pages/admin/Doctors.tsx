import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Filter, MoreHorizontal, Search, Star, UserCog, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Doctors = () => {
  // Sample doctors data
  const doctors = [
    { 
      id: 1, 
      name: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      hospital: "Metro General Hospital",
      rating: 4.9,
      status: "Active",
      experience: "15 years",
      gender: "Female",
      patients: 125,
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567"
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      specialty: "Neurology", 
      hospital: "City Medical Center",
      rating: 4.8,
      status: "Active",
      experience: "12 years",
      gender: "Male",
      patients: 98,
      email: "michael.chen@example.com",
      phone: "(555) 234-5678"
    },
    { 
      id: 3, 
      name: "Dr. Emily Rodriguez", 
      specialty: "Pediatrics", 
      hospital: "Children's Hospital",
      rating: 4.9,
      status: "Active",
      experience: "10 years",
      gender: "Female",
      patients: 143,
      email: "emily.rodriguez@example.com",
      phone: "(555) 345-6789"
    },
    { 
      id: 4, 
      name: "Dr. James Wilson", 
      specialty: "Orthopedics", 
      hospital: "Sports Medicine Institute",
      rating: 4.7,
      status: "Active",
      experience: "18 years",
      gender: "Male",
      patients: 112,
      email: "james.wilson@example.com",
      phone: "(555) 456-7890"
    },
    { 
      id: 5, 
      name: "Dr. Sophia Patel", 
      specialty: "Dermatology", 
      hospital: "Skin & Care Clinic",
      rating: 4.8,
      status: "Active",
      experience: "8 years",
      gender: "Female",
      patients: 165,
      email: "sophia.patel@example.com",
      phone: "(555) 567-8901"
    },
    { 
      id: 6, 
      name: "Dr. Robert Kim", 
      specialty: "Ophthalmology", 
      hospital: "Vision Care Center",
      rating: 4.6,
      status: "Active",
      experience: "14 years",
      gender: "Male",
      patients: 89,
      email: "robert.kim@example.com",
      phone: "(555) 678-9012"
    },
    { 
      id: 7, 
      name: "Dr. Lisa Thompson", 
      specialty: "Obstetrics & Gynecology", 
      hospital: "Women's Health Clinic",
      rating: 4.9,
      status: "Active",
      experience: "16 years",
      gender: "Female",
      patients: 187,
      email: "lisa.thompson@example.com",
      phone: "(555) 789-0123"
    },
    { 
      id: 8, 
      name: "Dr. David Brown", 
      specialty: "Psychiatry", 
      hospital: "Mental Health Institute",
      rating: 4.7,
      status: "Active",
      experience: "11 years",
      gender: "Male",
      patients: 76,
      email: "david.brown@example.com",
      phone: "(555) 890-1234"
    },
    { 
      id: 9, 
      name: "Dr. Maria Gonzalez", 
      specialty: "Endocrinology", 
      hospital: "Diabetes & Hormone Center",
      rating: 4.8,
      status: "Active",
      experience: "9 years",
      gender: "Female",
      patients: 94,
      email: "maria.gonzalez@example.com",
      phone: "(555) 901-2345"
    },
    { 
      id: 10, 
      name: "Dr. Andrew Davis", 
      specialty: "Gastroenterology", 
      hospital: "Digestive Health Center",
      rating: 4.6,
      status: "Active",
      experience: "13 years",
      gender: "Male",
      patients: 108,
      email: "andrew.davis@example.com",
      phone: "(555) 012-3456"
    },
    { 
      id: 11, 
      name: "Dr. Jessica Lee", 
      specialty: "Rheumatology", 
      hospital: "Joint & Arthritis Center",
      rating: 4.7,
      status: "Active",
      experience: "7 years",
      gender: "Female",
      patients: 67,
      email: "jessica.lee@example.com",
      phone: "(555) 123-4567"
    },
    { 
      id: 12, 
      name: "Dr. Thomas Martin", 
      specialty: "Pulmonology", 
      hospital: "Respiratory Care Institute",
      rating: 4.8,
      status: "Active",
      experience: "20 years",
      gender: "Male",
      patients: 132,
      email: "thomas.martin@example.com",
      phone: "(555) 234-5678"
    },
    { 
      id: 13, 
      name: "Dr. Olivia White", 
      specialty: "Hematology", 
      hospital: "Blood Disorders Clinic",
      rating: 4.9,
      status: "Pending",
      experience: "5 years",
      gender: "Female",
      patients: 0,
      email: "olivia.white@example.com",
      phone: "(555) 345-6789"
    },
    { 
      id: 14, 
      name: "Dr. Daniel Jackson", 
      specialty: "Urology", 
      hospital: "Men's Health Center",
      rating: 0,
      status: "Pending",
      experience: "15 years",
      gender: "Male",
      patients: 0,
      email: "daniel.jackson@example.com",
      phone: "(555) 456-7890"
    },
    { 
      id: 15, 
      name: "Dr. Samantha Clark", 
      specialty: "Family Medicine", 
      hospital: "Community Health Clinic",
      rating: 0,
      status: "Pending",
      experience: "3 years",
      gender: "Female",
      patients: 0,
      email: "samantha.clark@example.com",
      phone: "(555) 567-8901"
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Doctors Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Import Roster</Button>
          <Button>Add New Doctor</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search doctors..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hospitals</SelectItem>
              <SelectItem value="metro">Metro General</SelectItem>
              <SelectItem value="city">City Medical</SelectItem>
              <SelectItem value="childrens">Children's Hospital</SelectItem>
              <SelectItem value="womens">Women's Health</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="active">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">Active (12)</TabsTrigger>
          <TabsTrigger value="pending">Pending (3)</TabsTrigger>
          <TabsTrigger value="suspended">Suspended (0)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid gap-4">
            {doctors
              .filter(doctor => doctor.status === "Active")
              .map(doctor => (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-muted">
                          <UserCog className="h-6 w-6" />
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{doctor.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{doctor.specialty}</span>
                            <span className="mx-1">•</span>
                            <span>{doctor.hospital}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{doctor.rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Badge 
                            className="ml-2 bg-green-100 text-green-800 border-green-200"
                          >
                            Active
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">{doctor.experience} experience</span>
                      </div>
                    </div>
                    <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                      <div className="text-sm flex space-x-4">
                        <div>
                          <span className="text-muted-foreground">Patients:</span> {doctor.patients}
                        </div>
                        <div className="hidden sm:block">
                          <span className="text-muted-foreground">Email:</span> {doctor.email}
                        </div>
                        <div className="hidden md:block">
                          <span className="text-muted-foreground">Phone:</span> {doctor.phone}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                            <DropdownMenuItem>Adjust Permissions</DropdownMenuItem>
                            <DropdownMenuItem>Assign Patients</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <div className="grid gap-4">
            {doctors
              .filter(doctor => doctor.status === "Pending")
              .map(doctor => (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-muted">
                          <UserCog className="h-6 w-6" />
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{doctor.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{doctor.specialty}</span>
                            <span className="mx-1">•</span>
                            <span>{doctor.hospital}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge 
                          className="bg-yellow-100 text-yellow-800 border-yellow-200"
                        >
                          Pending Approval
                        </Badge>
                        <span className="text-sm text-muted-foreground mt-1">{doctor.experience} experience</span>
                      </div>
                    </div>
                    <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                      <div className="text-sm flex space-x-4">
                        <div>
                          <span className="text-muted-foreground">Email:</span> {doctor.email}
                        </div>
                        <div className="hidden md:block">
                          <span className="text-muted-foreground">Phone:</span> {doctor.phone}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View Application</Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="h-8 w-8 text-green-600 bg-green-50 hover:bg-green-100">
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="suspended">
          <Card>
            <CardHeader>
              <CardTitle>Suspended Doctors</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <UserCog className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Suspended Doctors</h3>
              <p className="text-muted-foreground mb-4">There are currently no suspended doctor accounts</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Doctors;