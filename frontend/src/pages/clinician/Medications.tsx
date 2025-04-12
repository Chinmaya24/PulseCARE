import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BadgePlus, Check, Clock, PackageSearch, Pill, Search, User, X } from "lucide-react";
import { useState } from "react";

const Medications = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  
  // Sample patients data
  const patients = [
    { id: "1", name: "Sarah Jones", age: 45, condition: "Hypertension" },
    { id: "2", name: "Michael Brown", age: 62, condition: "Diabetes Type 2" },
    { id: "3", name: "Emma Williams", age: 35, condition: "Pregnancy" },
    { id: "4", name: "James Wilson", age: 55, condition: "Post-surgery recovery" },
    { id: "5", name: "David Smith", age: 28, condition: "Asthma" },
    { id: "6", name: "Jennifer Garcia", age: 41, condition: "Migraine" },
    { id: "7", name: "Robert Johnson", age: 73, condition: "Arthritis" },
    { id: "8", name: "Lisa Martinez", age: 32, condition: "Anxiety Disorder" },
    { id: "9", name: "Thomas Anderson", age: 58, condition: "Coronary Heart Disease" },
    { id: "10", name: "Olivia Taylor", age: 25, condition: "Allergies" },
  ];

  // Sample medications data
  const medications = [
    { id: "1", name: "Lisinopril", type: "ACE Inhibitor", dosages: ["5mg", "10mg", "20mg"], form: "Tablet" },
    { id: "2", name: "Metformin", type: "Antidiabetic", dosages: ["500mg", "850mg", "1000mg"], form: "Tablet" },
    { id: "3", name: "Atorvastatin", type: "Statin", dosages: ["10mg", "20mg", "40mg", "80mg"], form: "Tablet" },
    { id: "4", name: "Levothyroxine", type: "Thyroid Hormone", dosages: ["25mcg", "50mcg", "75mcg", "88mcg", "100mcg"], form: "Tablet" },
    { id: "5", name: "Amlodipine", type: "Calcium Channel Blocker", dosages: ["2.5mg", "5mg", "10mg"], form: "Tablet" },
    { id: "6", name: "Albuterol", type: "Bronchodilator", dosages: ["2mg", "4mg"], form: "Tablet", inhaler: "90mcg/actuation" },
    { id: "7", name: "Omeprazole", type: "Proton Pump Inhibitor", dosages: ["10mg", "20mg", "40mg"], form: "Capsule" },
    { id: "8", name: "Losartan", type: "Angiotensin II Receptor Blocker", dosages: ["25mg", "50mg", "100mg"], form: "Tablet" },
    { id: "9", name: "Gabapentin", type: "Anticonvulsant", dosages: ["100mg", "300mg", "400mg", "600mg", "800mg"], form: "Capsule" },
    { id: "10", name: "Sertraline", type: "SSRI", dosages: ["25mg", "50mg", "100mg"], form: "Tablet" },
    { id: "11", name: "Simvastatin", type: "Statin", dosages: ["5mg", "10mg", "20mg", "40mg"], form: "Tablet" },
    { id: "12", name: "Prednisone", type: "Corticosteroid", dosages: ["1mg", "2.5mg", "5mg", "10mg", "20mg", "50mg"], form: "Tablet" },
    { id: "13", name: "Amoxicillin", type: "Antibiotic", dosages: ["250mg", "500mg"], form: "Capsule" },
    { id: "14", name: "Hydrochlorothiazide", type: "Diuretic", dosages: ["12.5mg", "25mg", "50mg"], form: "Tablet" },
    { id: "15", name: "Acetaminophen", type: "Analgesic", dosages: ["325mg", "500mg", "650mg"], form: "Tablet" },
  ];
  
  // Sample active prescriptions
  const activePrescriptions = [
    { 
      id: "1", 
      patient: "Sarah Jones", 
      medication: "Lisinopril 10mg", 
      instructions: "Take once daily in the morning", 
      duration: "90 days",
      startDate: "2025-04-01",
      status: "Active"
    },
    { 
      id: "2", 
      patient: "Michael Brown", 
      medication: "Metformin 500mg", 
      instructions: "Take twice daily with meals", 
      duration: "180 days",
      startDate: "2025-03-15",
      status: "Active"
    },
    { 
      id: "3", 
      patient: "Emma Williams", 
      medication: "Prenatal vitamins", 
      instructions: "Take once daily with food", 
      duration: "180 days",
      startDate: "2025-02-20",
      status: "Active"
    },
    { 
      id: "4", 
      patient: "James Wilson", 
      medication: "Acetaminophen 500mg", 
      instructions: "Take as needed for pain, not to exceed 4000mg per day", 
      duration: "30 days",
      startDate: "2025-04-05",
      status: "Active"
    },
    { 
      id: "5", 
      patient: "David Smith", 
      medication: "Albuterol inhaler", 
      instructions: "Two puffs every 4-6 hours as needed for shortness of breath", 
      duration: "30 days",
      startDate: "2025-03-28",
      status: "Active"
    },
  ];

  // Get selected medication details
  const selectedMed = medications.find(med => med.id === selectedMedication);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Medications</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <PackageSearch className="mr-2 h-4 w-4" />
            Drug Directory
          </Button>
          <Button>
            <BadgePlus className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </div>
      </div>

      <Tabs defaultValue="prescribe" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="prescribe">
            <Pill className="mr-2 h-4 w-4" />
            Prescribe
          </TabsTrigger>
          <TabsTrigger value="active">
            <Check className="mr-2 h-4 w-4" />
            Active
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prescribe">
          <Card>
            <CardHeader>
              <CardTitle>Create New Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Select Patient</Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map(patient => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} ({patient.age} yrs)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedPatient && (
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h3 className="font-medium">Patient Details</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p>Age: {patients.find(p => p.id === selectedPatient)?.age} years</p>
                        <p>Condition: {patients.find(p => p.id === selectedPatient)?.condition}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="medication">Select Medication</Label>
                    <div className="flex space-x-2">
                      <Select value={selectedMedication} onValueChange={setSelectedMedication}>
                        <SelectTrigger id="medication" className="flex-1">
                          <SelectValue placeholder="Select medication" />
                        </SelectTrigger>
                        <SelectContent>
                          {medications.map(med => (
                            <SelectItem key={med.id} value={med.id}>
                              {med.name} ({med.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {selectedMed && (
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h3 className="font-medium">{selectedMed.name}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p>Class: {selectedMed.type}</p>
                        <p>Form: {selectedMed.form}</p>
                        <p>Available strengths: {selectedMed.dosages.join(", ")}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedMed && (
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Select Dosage</Label>
                      <Select>
                        <SelectTrigger id="dosage">
                          <SelectValue placeholder="Select dosage" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedMed.dosages.map(dosage => (
                            <SelectItem key={dosage} value={dosage}>
                              {dosage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once_daily">Once daily</SelectItem>
                        <SelectItem value="twice_daily">Twice daily</SelectItem>
                        <SelectItem value="three_times">Three times daily</SelectItem>
                        <SelectItem value="four_times">Four times daily</SelectItem>
                        <SelectItem value="every_morning">Every morning</SelectItem>
                        <SelectItem value="every_evening">Every evening</SelectItem>
                        <SelectItem value="as_needed">As needed (PRN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <div className="flex space-x-2">
                      <Input type="number" id="duration" placeholder="Duration" />
                      <Select defaultValue="days">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea id="instructions" placeholder="e.g. Take with food, avoid alcohol, etc." />
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button disabled={!selectedPatient || !selectedMedication}>Create Prescription</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="grid gap-4">
            {activePrescriptions.map(prescription => (
              <Card key={prescription.id}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{prescription.patient}</h3>
                        <div className="text-sm text-muted-foreground">
                          {prescription.medication}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-right">
                        <span className="block">Started: {prescription.startDate}</span>
                        <span className="block text-muted-foreground">Duration: {prescription.duration}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Pill className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 px-6 py-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Instructions:</span> {prescription.instructions}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Medication History</h3>
              <p className="text-muted-foreground mb-4">View past prescriptions and medication histories</p>
              <div className="flex justify-center">
                <Button>View Archived Prescriptions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Medications;