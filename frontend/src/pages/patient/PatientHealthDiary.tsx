import { useState, useEffect } from "react";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ClipboardEdit, 
  Download, 
  PlusCircle, 
  Save, 
  Trash2, 
  XCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format, parse, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { toast } from "sonner";

// Interface for diary entry
interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: "great" | "good" | "okay" | "bad" | "awful";
  symptoms: string[];
  painLevel: number;
}

// Mock service for diary entries
const diaryService = {
  getDiaryEntries: async (): Promise<DiaryEntry[]> => {
    // In a real implementation, this would fetch from an API
    const savedEntries = localStorage.getItem('healthDiaryEntries');
    if (savedEntries) {
      // Parse the dates back to Date objects
      const entries = JSON.parse(savedEntries);
      return entries.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
    }
    return [];
  },

  saveDiaryEntry: async (entry: DiaryEntry): Promise<DiaryEntry> => {
    // In a real implementation, this would save to an API
    const savedEntries = localStorage.getItem('healthDiaryEntries');
    let entries = savedEntries ? JSON.parse(savedEntries) : [];
    
    // Check if this is an update or new entry
    const existingIndex = entries.findIndex((e: any) => e.id === entry.id);
    
    if (existingIndex >= 0) {
      // Update existing entry
      entries[existingIndex] = {...entry, date: entry.date.toISOString()};
    } else {
      // Add new entry
      entries.push({...entry, date: entry.date.toISOString()});
    }
    
    localStorage.setItem('healthDiaryEntries', JSON.stringify(entries));
    
    return entry;
  },

  deleteDiaryEntry: async (id: string): Promise<void> => {
    // In a real implementation, this would delete from an API
    const savedEntries = localStorage.getItem('healthDiaryEntries');
    if (savedEntries) {
      let entries = JSON.parse(savedEntries);
      entries = entries.filter((e: any) => e.id !== id);
      localStorage.setItem('healthDiaryEntries', JSON.stringify(entries));
    }
  },
};

// Symptom options for selection
const symptomOptions = [
  "Headache",
  "Nausea",
  "Dizziness",
  "Fatigue",
  "Shortness of breath",
  "Chest pain",
  "Cough",
  "Fever",
  "Chills",
  "Muscle aches",
  "Joint pain",
  "Sore throat",
  "Abdominal pain",
  "Bloating",
  "Diarrhea",
  "Constipation",
  "Loss of appetite",
  "Increased appetite",
  "Anxiety",
  "Depression",
  "Insomnia",
  "Rash",
  "Swelling",
  "Numbness",
  "Tingling"
];

const PatientHealthDiary = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEntry, setCurrentEntry] = useState<DiaryEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEntryDialog, setShowEntryDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  
  // Default new entry template
  const newEntryTemplate: Omit<DiaryEntry, 'id'> = {
    date: new Date(),
    title: "",
    content: "",
    mood: "okay",
    symptoms: [],
    painLevel: 0
  };

  // Load diary entries on component mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        const entries = await diaryService.getDiaryEntries();
        setDiaryEntries(entries);
        
        // If we have entries and no selected date, select the most recent entry date
        if (entries.length > 0 && !selectedDate) {
          const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());
          setSelectedDate(sortedEntries[0].date);
        }
      } catch (error) {
        console.error("Error loading diary entries:", error);
        toast.error("Failed to load your diary entries");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEntries();
  }, []);

  // Update current entry when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const entry = diaryEntries.find(entry => 
        isSameDay(entry.date, selectedDate)
      );
      
      setCurrentEntry(entry || null);
      setIsEditing(false);
    } else {
      setCurrentEntry(null);
    }
  }, [selectedDate, diaryEntries]);

  // Create a new entry
  const handleNewEntry = () => {
    const newDate = selectedDate || new Date();
    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      ...newEntryTemplate,
      date: newDate
    };
    
    setCurrentEntry(newEntry);
    setSelectedDate(newDate);
    setIsEditing(true);
  };

  // Edit current entry
  const handleEditEntry = () => {
    setIsEditing(true);
  };

  // Save current entry
  const handleSaveEntry = async () => {
    if (!currentEntry) return;
    
    try {
      await diaryService.saveDiaryEntry(currentEntry);
      
      // Update local state
      setDiaryEntries(prev => {
        const existingIndex = prev.findIndex(e => e.id === currentEntry.id);
        if (existingIndex >= 0) {
          // Update existing
          const updated = [...prev];
          updated[existingIndex] = currentEntry;
          return updated;
        } else {
          // Add new
          return [...prev, currentEntry];
        }
      });
      
      setIsEditing(false);
      toast.success("Diary entry saved successfully");
    } catch (error) {
      console.error("Error saving diary entry:", error);
      toast.error("Failed to save your diary entry");
    }
  };

  // Delete current entry
  const handleDeleteEntry = async () => {
    if (!currentEntry) return;
    
    try {
      await diaryService.deleteDiaryEntry(currentEntry.id);
      
      // Update local state
      setDiaryEntries(prev => prev.filter(e => e.id !== currentEntry.id));
      setCurrentEntry(null);
      setShowDeleteDialog(false);
      
      // Find another entry to select
      if (diaryEntries.length > 1) {
        const remainingEntries = diaryEntries.filter(e => e.id !== currentEntry.id);
        const sortedEntries = [...remainingEntries].sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
        setSelectedDate(sortedEntries[0].date);
      } else {
        setSelectedDate(null);
      }
      
      toast.success("Diary entry deleted successfully");
    } catch (error) {
      console.error("Error deleting diary entry:", error);
      toast.error("Failed to delete your diary entry");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (currentEntry && !diaryEntries.some(e => e.id === currentEntry.id)) {
      // If this was a new entry that hasn't been saved, clear it
      setCurrentEntry(null);
    } else {
      // Restore the entry from our saved entries
      const savedEntry = diaryEntries.find(e => 
        currentEntry && e.id === currentEntry.id
      );
      setCurrentEntry(savedEntry || null);
    }
    
    setIsEditing(false);
  };

  // Add a symptom to the current entry
  const handleAddSymptom = () => {
    if (!currentEntry || !selectedSymptom) return;
    
    if (!currentEntry.symptoms.includes(selectedSymptom)) {
      setCurrentEntry({
        ...currentEntry,
        symptoms: [...currentEntry.symptoms, selectedSymptom]
      });
    }
    
    setSelectedSymptom("");
  };

  // Remove a symptom from the current entry
  const handleRemoveSymptom = (symptom: string) => {
    if (!currentEntry) return;
    
    setCurrentEntry({
      ...currentEntry,
      symptoms: currentEntry.symptoms.filter(s => s !== symptom)
    });
  };

  // Get days that have diary entries for the calendar
  const getDaysWithEntries = () => {
    if (!currentDate) return [];
    
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Convert to yyyy-MM-dd string format for comparison
    return daysInMonth.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const hasEntry = diaryEntries.some(entry => 
        format(entry.date, 'yyyy-MM-dd') === dayStr
      );
      
      return {
        date: day,
        hasEntry
      };
    });
  };

  const daysWithEntries = getDaysWithEntries();

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Handle entry export
  const handleExportEntries = () => {
    try {
      // Format entries for export
      const exportData = JSON.stringify(diaryEntries, null, 2);
      
      // Create a blob and download link
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `health-diary-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Health diary exported successfully");
    } catch (error) {
      console.error("Error exporting diary entries:", error);
      toast.error("Failed to export your diary entries");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Health Diary</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportEntries}>
            <Download className="mr-2 h-4 w-4" />
            Export Diary
          </Button>
          <Button onClick={handleNewEntry}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view your entry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">{format(currentDate, 'MMMM yyyy')}</h3>
                <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Add empty cells for days before the first of the month */}
                {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                  <div key={`empty-start-${i}`} className="h-10 w-10" />
                ))}
                
                {/* Days of the month */}
                {daysWithEntries.map(({ date, hasEntry }) => {
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  return (
                    <button
                      key={date.toString()}
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-sm relative ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : hasEntry
                            ? 'hover:bg-primary/10'
                            : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {format(date, 'd')}
                      {hasEntry && !isSelected && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Entry Summary</h4>
              {isLoading ? (
                <div className="text-center py-4 text-muted-foreground">
                  Loading entries...
                </div>
              ) : diaryEntries.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No diary entries yet. Create your first one!
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {diaryEntries
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map(entry => {
                      const isSelected = selectedDate && isSameDay(entry.date, selectedDate);
                      return (
                        <button
                          key={entry.id}
                          className={`w-full text-left p-2 rounded-md border text-sm ${
                            isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedDate(entry.date)}
                        >
                          <div className="font-medium">{format(entry.date, 'MMM d, yyyy')}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{entry.title}</div>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedDate 
                  ? `Entry for ${format(selectedDate, 'MMMM d, yyyy')}` 
                  : 'Health Diary Entry'}
              </CardTitle>
              {currentEntry && !isEditing && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" onClick={handleEditEntry}>
                    <ClipboardEdit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
            <CardDescription>
              {isEditing
                ? "Record how you're feeling today"
                : currentEntry 
                  ? "Your recorded health information"
                  : "Select a date with an entry or create a new one"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-60 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : !currentEntry ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No entry selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a date with an entry or create a new one
                </p>
                <Button onClick={handleNewEntry}>Create New Entry</Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Title</label>
                  {isEditing ? (
                    <Input
                      value={currentEntry.title}
                      onChange={e => setCurrentEntry({...currentEntry, title: e.target.value})}
                      placeholder="Enter a title for your entry"
                    />
                  ) : (
                    <div className="text-lg font-medium">
                      {currentEntry.title || "Untitled Entry"}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">How are you feeling today?</label>
                  {isEditing ? (
                    <Select
                      value={currentEntry.mood}
                      onValueChange={(value: any) => setCurrentEntry({...currentEntry, mood: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="great">Great - Feeling excellent</SelectItem>
                        <SelectItem value="good">Good - Feeling well</SelectItem>
                        <SelectItem value="okay">Okay - Feeling normal</SelectItem>
                        <SelectItem value="bad">Bad - Not feeling well</SelectItem>
                        <SelectItem value="awful">Awful - Feeling terrible</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      currentEntry.mood === 'great' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      currentEntry.mood === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      currentEntry.mood === 'okay' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      currentEntry.mood === 'bad' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {currentEntry.mood.charAt(0).toUpperCase() + currentEntry.mood.slice(1)}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Pain Level (0-10)</label>
                  {isEditing ? (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs">No Pain</span>
                        <span className="text-xs">Severe Pain</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={currentEntry.painLevel}
                        onChange={e => setCurrentEntry({...currentEntry, painLevel: parseInt(e.target.value)})}
                        className="w-full"
                      />
                      <div className="text-center mt-1 font-medium">
                        {currentEntry.painLevel}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`text-lg font-bold ${
                        currentEntry.painLevel >= 7 ? 'text-red-500' :
                        currentEntry.painLevel >= 4 ? 'text-orange-500' :
                        currentEntry.painLevel >= 1 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {currentEntry.painLevel}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentEntry.painLevel === 0 ? 'No pain' :
                         currentEntry.painLevel <= 3 ? 'Mild pain' :
                         currentEntry.painLevel <= 6 ? 'Moderate pain' : 'Severe pain'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Symptoms</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Select
                          value={selectedSymptom}
                          onValueChange={setSelectedSymptom}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select symptom" />
                          </SelectTrigger>
                          <SelectContent>
                            {symptomOptions.map(symptom => (
                              <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="outline" 
                          onClick={handleAddSymptom}
                          disabled={!selectedSymptom}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {currentEntry.symptoms.map(symptom => (
                          <div 
                            key={symptom}
                            className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm"
                          >
                            {symptom}
                            <button 
                              onClick={() => handleRemoveSymptom(symptom)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {currentEntry.symptoms.length === 0 && (
                          <div className="text-sm text-muted-foreground">
                            No symptoms added yet
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentEntry.symptoms.map(symptom => (
                        <div 
                          key={symptom}
                          className="bg-muted px-2 py-1 rounded-md text-sm"
                        >
                          {symptom}
                        </div>
                      ))}
                      {currentEntry.symptoms.length === 0 && (
                        <div className="text-sm text-muted-foreground">
                          No symptoms recorded
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Notes</label>
                  {isEditing ? (
                    <Textarea
                      value={currentEntry.content}
                      onChange={e => setCurrentEntry({...currentEntry, content: e.target.value})}
                      placeholder="Write your thoughts, symptoms, or anything you want to record about your health today..."
                      className="min-h-[150px]"
                    />
                  ) : (
                    <div className="bg-muted/30 p-4 rounded-md min-h-[100px] whitespace-pre-line">
                      {currentEntry.content || <span className="text-muted-foreground">No notes recorded</span>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          {currentEntry && isEditing && (
            <CardFooter className="border-t flex justify-between pt-6">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveEntry}>Save Entry</Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Entry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this diary entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteEntry}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientHealthDiary;