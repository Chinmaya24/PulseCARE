import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Check, ChevronRight, LucideDroplet, Ruler, Search, Thermometer, User } from "lucide-react";
import { useState } from "react";

const RecordVitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPatient, setCurrentPatient] = useState<number | null>(null);

  // Sample patients vitals data
  const patientsVitals = [
    { 
      id: 1, 
      name: "Sarah Jones", 
      age: 45, 
      room: "305-B",
      lastRecorded: "2 hours ago",
      vitals: { 
        temperature: "98.6°F", 
        bloodPressure: "135/85", 
        heartRate: "75", 
        respiratoryRate: "16",
        oxygenSaturation: "97%",
        bloodGlucose: "110 mg/dL",
        weight: "68 kg",
        height: "165 cm"
      },
      status: "Normal"
    },
    { 
      id: 2, 
      name: "Michael Brown", 
      age: 62, 
      room: "302-A",
      lastRecorded: "1 hour ago",
      vitals: { 
        temperature: "99.2°F", 
        bloodPressure: "145/95", 
        heartRate: "82", 
        respiratoryRate: "18",
        oxygenSaturation: "94%",
        bloodGlucose: "180 mg/dL",
        weight: "78 kg",
        height: "178 cm"
      },
      status: "Abnormal"
    },
    { 
      id: 3, 
      name: "Emma Williams", 
      age: 35, 
      room: "307-A",
      lastRecorded: "3 hours ago",
      vitals: { 
        temperature: "98.4°F", 
        bloodPressure: "118/75", 
        heartRate: "80", 
        respiratoryRate: "16",
        oxygenSaturation: "99%",
        bloodGlucose: "95 mg/dL",
        weight: "65 kg",
        height: "170 cm"
      },
      status: "Normal"
    },
    { 
      id: 4, 
      name: "James Wilson", 
      age: 55, 
      room: "304-A",
      lastRecorded: "30 minutes ago",
      vitals: { 
        temperature: "99.0°F", 
        bloodPressure: "130/82", 
        heartRate: "76", 
        respiratoryRate: "18",
        oxygenSaturation: "96%",
        bloodGlucose: "105 mg/dL",
        weight: "82 kg",
        height: "182 cm"
      },
      status: "Normal"
    },
    { 
      id: 5, 
      name: "David Smith", 
      age: 28, 
      room: "309-A",
      lastRecorded: "4 hours ago",
      vitals: { 
        temperature: "98.8°F", 
        bloodPressure: "122/78", 
        heartRate: "74", 
        respiratoryRate: "17",
        oxygenSaturation: "98%",
        bloodGlucose: "100 mg/dL",
        weight: "75 kg",
        height: "175 cm"
      },
      status: "Normal"
    },
    { 
      id: 6, 
      name: "Jennifer Garcia", 
      age: 41, 
      room: "308-B",
      lastRecorded: "2 hours ago",
      vitals: { 
        temperature: "98.6°F", 
        bloodPressure: "120/80", 
        heartRate: "70", 
        respiratoryRate: "16",
        oxygenSaturation: "97%",
        bloodGlucose: "108 mg/dL",
        weight: "62 kg",
        height: "162 cm"
      },
      status: "Normal"
    },
    { 
      id: 7, 
      name: "Robert Johnson", 
      age: 73, 
      room: "312-B",
      lastRecorded: "1 hour ago",
      vitals: { 
        temperature: "98.2°F", 
        bloodPressure: "142/88", 
        heartRate: "72", 
        respiratoryRate: "15",
        oxygenSaturation: "93%",
        bloodGlucose: "125 mg/dL",
        weight: "70 kg",
        height: "172 cm"
      },
      status: "Abnormal"
    },
    { 
      id: 8, 
      name: "Lisa Martinez", 
      age: 32, 
      room: "301-C",
      lastRecorded: "3 hours ago",
      vitals: { 
        temperature: "98.2°F", 
        bloodPressure: "115/75", 
        heartRate: "68", 
        respiratoryRate: "15",
        oxygenSaturation: "99%",
        bloodGlucose: "90 mg/dL",
        weight: "58 kg",
        height: "160 cm"
      },
      status: "Normal"
    },
    { 
      id: 9, 
      name: "Thomas Anderson", 
      age: 58, 
      room: "310-A",
      lastRecorded: "45 minutes ago",
      vitals: { 
        temperature: "98.8°F", 
        bloodPressure: "140/90", 
        heartRate: "78", 
        respiratoryRate: "17",
        oxygenSaturation: "95%",
        bloodGlucose: "115 mg/dL",
        weight: "85 kg",
        height: "180 cm"
      },
      status: "Abnormal"
    },
    { 
      id: 10, 
      name: "Olivia Taylor", 
      age: 25, 
      room: "311-B",
      lastRecorded: "4 hours ago",
      vitals: { 
        temperature: "98.4°F", 
        bloodPressure: "110/70", 
        heartRate: "65", 
        respiratoryRate: "14",
        oxygenSaturation: "99%",
        bloodGlucose: "88 mg/dL",
        weight: "55 kg",
        height: "165 cm"
      },
      status: "Normal"
    },
  ];

  // Filter patients based on search term
  const filteredPatients = patientsVitals.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatient = currentPatient ? patientsVitals.find(p => p.id === currentPatient) : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Record Vitals</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Import Data</Button>
          <Button>New Reading</Button>
        </div>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input 
          type="text" 
          placeholder="Search patients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-medium mb-4">Patients</h2>
          <div className="space-y-3">
            {filteredPatients.map(patient => (
              <Card 
                key={patient.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${currentPatient === patient.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setCurrentPatient(patient.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border-2 border-muted">
                        <User className="h-5 w-5" />
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{patient.age} yrs</span>
                          <span className="mx-1">•</span>
                          <span>Room {patient.room}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        className={
                          patient.status === "Abnormal" 
                            ? "bg-red-100 text-red-800 border-red-200" 
                            : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {patient.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground mt-1">Last: {patient.lastRecorded}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Vitals Record</h2>
          {selectedPatient ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedPatient.name}</span>
                  <Button size="sm">Update Vitals</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Thermometer className="h-4 w-4 mr-1" />
                      <span>Temperature</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.temperature}</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Activity className="h-4 w-4 mr-1" />
                      <span>Blood Pressure</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.bloodPressure}</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Heart Rate</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.heartRate} bpm</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Respiratory Rate</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.respiratoryRate} breaths/min</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Oxygen Saturation</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.oxygenSaturation}</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <LucideDroplet className="h-4 w-4 mr-1" />
                      <span>Blood Glucose</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.bloodGlucose}</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Weight</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.weight}</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ruler className="h-4 w-4 mr-1" />
                      <span>Height</span>
                    </div>
                    <div className="text-lg font-medium">{selectedPatient.vitals.height}</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline">View History</Button>
                  <Button>Record New Vitals</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2" />
                <h3 className="text-lg font-medium">No patient selected</h3>
                <p>Select a patient from the list to view and record vitals</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordVitals;