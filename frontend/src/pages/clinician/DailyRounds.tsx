import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Calendar, CalendarClock, Check, Clock, ClipboardList, Search, Thermometer, User } from "lucide-react";

const DailyRounds = () => {
  // Sample rounds data
  const rounds = [
    { 
      id: 1, 
      patient: "Michael Brown", 
      room: "302-A", 
      time: "8:30 AM", 
      status: "Due", 
      vitals: { bp: "145/95", temp: "99.2°F", pulse: "82", resp: "18" },
      age: 62,
      condition: "Diabetes Type 2",
      notes: "Patient reported feeling dizzy this morning. Check blood sugar levels."
    },
    { 
      id: 2, 
      patient: "Sarah Jones", 
      room: "305-B", 
      time: "9:00 AM", 
      status: "Due", 
      vitals: { bp: "135/85", temp: "98.6°F", pulse: "75", resp: "16" },
      age: 45,
      condition: "Hypertension",
      notes: "Review blood pressure medication effectiveness. Patient complained of headaches."
    },
    { 
      id: 3, 
      patient: "Thomas Anderson", 
      room: "310-A", 
      time: "9:30 AM", 
      status: "Due", 
      vitals: { bp: "140/90", temp: "98.8°F", pulse: "78", resp: "17" },
      age: 58,
      condition: "Coronary Heart Disease",
      notes: "Scheduled for ECG later today. Assess chest pain levels."
    },
    { 
      id: 4, 
      patient: "Robert Johnson", 
      room: "312-B", 
      time: "10:00 AM", 
      status: "Due", 
      vitals: { bp: "125/78", temp: "98.2°F", pulse: "72", resp: "15" },
      age: 73,
      condition: "Arthritis",
      notes: "Evaluate mobility progress. New pain management regimen started yesterday."
    },
    { 
      id: 5, 
      patient: "Emma Williams", 
      room: "307-A", 
      time: "10:30 AM", 
      status: "Due", 
      vitals: { bp: "118/75", temp: "98.4°F", pulse: "80", resp: "16" },
      age: 35,
      condition: "Pregnancy",
      notes: "33 weeks pregnant. Check fetal heart rate and movement."
    },
    { 
      id: 6, 
      patient: "James Wilson", 
      room: "304-A", 
      time: "11:00 AM", 
      status: "Due", 
      vitals: { bp: "130/82", temp: "99.0°F", pulse: "76", resp: "18" },
      age: 55,
      condition: "Post-surgery recovery",
      notes: "Check surgical wound. Patient reported moderate pain levels (5/10)."
    },
    { 
      id: 7, 
      patient: "Jennifer Garcia", 
      room: "308-B", 
      time: "11:30 AM", 
      status: "Due", 
      vitals: { bp: "120/80", temp: "98.6°F", pulse: "70", resp: "16" },
      age: 41,
      condition: "Migraine",
      notes: "Assess effectiveness of new migraine medication. Patient had episode yesterday."
    },
    { 
      id: 8, 
      patient: "Lisa Martinez", 
      room: "301-C", 
      time: "1:30 PM", 
      status: "Due", 
      vitals: { bp: "115/75", temp: "98.2°F", pulse: "68", resp: "15" },
      age: 32,
      condition: "Anxiety Disorder",
      notes: "Follow up on anxiety levels. Patient started new therapy sessions."
    },
    { 
      id: 9, 
      patient: "David Smith", 
      room: "309-A", 
      time: "2:00 PM", 
      status: "Due", 
      vitals: { bp: "122/78", temp: "98.8°F", pulse: "74", resp: "17" },
      age: 28,
      condition: "Asthma",
      notes: "Check respiratory function. Patient experienced mild attack yesterday."
    },
    { 
      id: 10, 
      patient: "Olivia Taylor", 
      room: "311-B", 
      time: "2:30 PM", 
      status: "Due", 
      vitals: { bp: "110/70", temp: "98.4°F", pulse: "65", resp: "14" },
      age: 25,
      condition: "Allergies",
      notes: "Assess effectiveness of antihistamine treatment. Skin rash still present."
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Daily Rounds</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Change Date
          </Button>
          <Button>
            <ClipboardList className="mr-2 h-4 w-4" />
            Start Rounds
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-medium">Today's Schedule</h2>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search patients..." className="w-80" />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="morning">Morning</TabsTrigger>
          <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="morning">
          <div className="grid gap-4">
            {rounds.filter(round => round.time.includes("AM")).map(round => (
              <Card key={round.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Checkbox id={`check-${round.id}`} />
                      <div>
                        <h3 className="font-medium">{round.patient}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          <span>{round.age} yrs</span>
                          <span className="mx-1">•</span>
                          <span>{round.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{round.time}</span>
                        <span className="mx-2">•</span>
                        <span>Room {round.room}</span>
                      </div>
                      <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-200">
                        {round.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 px-6 py-3 flex flex-col">
                    <div className="flex space-x-6 mb-2">
                      <div className="flex items-center text-sm">
                        <Thermometer className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Temp:</span>
                        <span>{round.vitals.temp}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Activity className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">BP:</span>
                        <span>{round.vitals.bp}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-1">Pulse:</span>
                        <span>{round.vitals.pulse}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-1">Resp:</span>
                        <span>{round.vitals.resp}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Notes:</span> {round.notes}
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">Complete Round</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="afternoon">
          <div className="grid gap-4">
            {rounds.filter(round => round.time.includes("PM")).map(round => (
              <Card key={round.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Checkbox id={`check-${round.id}`} />
                      <div>
                        <h3 className="font-medium">{round.patient}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          <span>{round.age} yrs</span>
                          <span className="mx-1">•</span>
                          <span>{round.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{round.time}</span>
                        <span className="mx-2">•</span>
                        <span>Room {round.room}</span>
                      </div>
                      <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-200">
                        {round.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 px-6 py-3 flex flex-col">
                    <div className="flex space-x-6 mb-2">
                      <div className="flex items-center text-sm">
                        <Thermometer className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Temp:</span>
                        <span>{round.vitals.temp}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Activity className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">BP:</span>
                        <span>{round.vitals.bp}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-1">Pulse:</span>
                        <span>{round.vitals.pulse}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-1">Resp:</span>
                        <span>{round.vitals.resp}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Notes:</span> {round.notes}
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">Complete Round</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid gap-4">
            <div className="text-center py-8 text-muted-foreground">
              <Check className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <h3 className="text-lg font-medium">No completed rounds yet</h3>
              <p>Completed rounds will appear here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyRounds;