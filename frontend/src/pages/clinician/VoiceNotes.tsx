import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Download, FileText, Mic, Pause, Play, Search, Share2, Square, Trash2, Upload, User } from "lucide-react";
import { useState } from "react";

const VoiceNotes = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");

  // Sample patients data
  const patients = [
    { id: "1", name: "Sarah Jones", age: 45 },
    { id: "2", name: "Michael Brown", age: 62 },
    { id: "3", name: "Emma Williams", age: 35 },
    { id: "4", name: "James Wilson", age: 55 },
    { id: "5", name: "David Smith", age: 28 },
    { id: "6", name: "Jennifer Garcia", age: 41 },
    { id: "7", name: "Robert Johnson", age: 73 },
    { id: "8", name: "Lisa Martinez", age: 32 },
    { id: "9", name: "Thomas Anderson", age: 58 },
    { id: "10", name: "Olivia Taylor", age: 25 },
  ];

  // Sample voice notes
  const voiceNotes = [
    {
      id: "1",
      title: "Initial assessment",
      patient: "Sarah Jones",
      duration: "1:24",
      date: "2025-04-12",
      time: "10:30 AM",
    },
    {
      id: "2",
      title: "Medication review",
      patient: "Michael Brown",
      duration: "2:45",
      date: "2025-04-10",
      time: "2:15 PM",
    },
    {
      id: "3",
      title: "Follow-up consultation",
      patient: "Emma Williams",
      duration: "3:10",
      date: "2025-04-08",
      time: "11:20 AM",
    },
    {
      id: "4",
      title: "Post-surgery observations",
      patient: "James Wilson",
      duration: "4:32",
      date: "2025-04-07",
      time: "4:45 PM",
    },
    {
      id: "5",
      title: "Treatment plan discussion",
      patient: "David Smith",
      duration: "2:18",
      date: "2025-04-05",
      time: "9:10 AM",
    },
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Voice Notes</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Audio
          </Button>
          <Button>
            <Mic className="mr-2 h-4 w-4" />
            New Recording
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Voice Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center space-x-2 mb-4">
                <Input type="text" placeholder="Search notes..." className="w-full" />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {voiceNotes.map(note => (
                  <div key={note.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{note.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          <span>{note.patient}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{note.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-right text-xs text-muted-foreground mr-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{note.date}</span>
                        </div>
                        <span>{note.time}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Record New Note</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter note title" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Associate with Patient</label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
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
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
                    <Avatar className="h-10 w-10 border-2 border-muted">
                      <User className="h-5 w-5" />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{patients.find(p => p.id === selectedPatient)?.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {patients.find(p => p.id === selectedPatient)?.age} years old
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <div className="bg-muted/50 p-6 rounded-md flex flex-col items-center justify-center">
                    <div className="w-full h-24 mb-4 bg-black/5 rounded-md flex items-center justify-center">
                      {isRecording ? (
                        <div className="flex flex-col items-center">
                          <div className="h-4 w-32 bg-gray-200 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-primary animate-pulse" style={{width: '60%'}}></div>
                          </div>
                          <span className="text-sm font-medium text-red-500">Recording...</span>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Mic className="h-8 w-8 mx-auto mb-1" />
                          <span>Ready to record</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {isRecording ? (
                        <>
                          <Button variant="outline" size="icon" onClick={toggleRecording}>
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={toggleRecording}>
                            <Square className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button onClick={toggleRecording} className="gap-2">
                          <Mic className="h-4 w-4" />
                          Start Recording
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                  <Button disabled={!isRecording} className="gap-2">
                    <FileText className="h-4 w-4" />
                    Save Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceNotes;