import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Globe, MapPin, Plus, Search, Users } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const NGOs = () => {
  const ngos = [
    {
      id: 1,
      name: "Green Earth Foundation",
      mission: "Environmental protection and awareness",
      location: "Bangalore",
      type: "Environment",
      status: "Active",
    },
    {
      id: 2,
      name: "Smile For All",
      mission: "Education access for underprivileged children",
      location: "Mumbai",
      type: "Education",
      status: "Active",
    },
    {
      id: 3,
      name: "HealthFirst Initiative",
      mission: "Affordable healthcare in rural India",
      location: "Rajasthan",
      type: "Healthcare",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Hunger Warriors",
      mission: "Ending hunger through food drives",
      location: "Chennai",
      type: "Food & Nutrition",
      status: "Active",
    },
    {
      id: 5,
      name: "Shelter Hope",
      mission: "Providing shelter for the homeless",
      location: "Delhi",
      type: "Housing",
      status: "Active",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">NGO Directory</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add NGO
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search NGOs..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Environment">Environment</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Food & Nutrition">Food & Nutrition</SelectItem>
            <SelectItem value="Housing">Housing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        {["all", "active", "inactive"].map(tab => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{tab === "all" ? "All NGOs" : `${tab.charAt(0).toUpperCase() + tab.slice(1)} NGOs`}</span>
                  <Badge variant="outline">
                    {
                      ngos.filter(ngo =>
                        tab === "all" ? true : ngo.status.toLowerCase() === tab
                      ).length
                    } NGOs
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ngos
                    .filter(ngo =>
                      tab === "all" ? true : ngo.status.toLowerCase() === tab
                    )
                    .map(ngo => (
                      <div
                        key={ngo.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10 border-2 border-muted">
                            <Users className="h-5 w-5" />
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{ngo.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              {ngo.mission.length > 40
                                ? ngo.mission.slice(0, 40) + "..."
                                : ngo.mission}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {ngo.location}
                              <span className="mx-2">•</span>
                              <Globe className="h-3 w-3 mr-1" />
                              {ngo.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm">View</Button>
                          <Button size="sm" variant="outline">Contact</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default NGOs