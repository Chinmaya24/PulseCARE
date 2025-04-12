import { useState } from "react";
import { 
  ChevronRight, 
  Download, 
  FileText, 
  Flame, 
  Globe, 
  Heart, 
  ImageIcon, 
  Loader2, 
  LucideIcon, 
  Microscope, 
  Play, 
  UploadIcon 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Visualization {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: "heart" | "lungs" | "digestive" | "brain" | "skeletal" | "other";
  date: string;
  duration: string;
  language: string;
  videoUrl?: string; // Made optional to handle visualizations without URLs
}

interface BodyArea {
  id: string;
  name: string;
  icon: LucideIcon;
}

const PatientVisualizations = () => {
  const [selectedTab, setSelectedTab] = useState("library");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedBodyArea, setSelectedBodyArea] = useState("");
  const [medicalDescription, setMedicalDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedVisualization, setSelectedVisualization] = useState<Visualization | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Sample visualization library
  const visualizations: Visualization[] = [
    {
      id: "1",
      title: "Hypertension and Blood Vessel Impact",
      description: "Visualization of how high blood pressure affects your blood vessels over time.",
      thumbnail: "https://i.pinimg.com/736x/dc/af/0e/dcaf0ed2ae957b6f050e72af7db15cd7.jpg",
      category: "heart",
      date: "October 15, 2025",
      duration: "4:32",
      language: "english",
      videoUrl: "https://youtu.be/sOwBDmu1Y0c?si=eYaBEfBta1M-8ZQk"
    },
    {
      id: "2",
      title: "Type 2 Diabetes Explained",
      description: "Visual explanation of insulin resistance and blood sugar management.",
      thumbnail: "https://media.post.rvohealth.io/wp-content/uploads/2020/09/doctor_glucosmeter_patient_hand-732x549-thumbnail-732x549.jpg",
      category: "other",
      date: "October 8, 2025",
      duration: "5:16",
      language: "english",
      videoUrl: "https://www.youtube.com/watch?v=4WQGK4LQzHs"
    },
    {
      id: "3",
      title: "Asthma and Bronchial Tubes",
      description: "How asthma affects your airways and breathing patterns.",
      thumbnail: "https://cdn.storymd.com/optimized/Ro68LDTXqx/thumbnail.webp",
      category: "lungs",
      date: "September 20, 2025",
      duration: "3:51",
      language: "english",
      videoUrl: "https://www.youtube.com/watch?v=PwLjZpqbRYg"
    },
    {
      id: "4",
      title: "मधुमेह की समझ (Diabetes Understanding)",
      description: "A comprehensive explanation of Type 2 Diabetes in Hindi.",
      thumbnail: "https://media.istockphoto.com/id/2159951400/video/woman-using-a-blood-glucose-test-to-check-her-blood-sugar.jpg?s=640x640&k=20&c=uWrwix5ZY43k9lz0jRUVHWTKq8tUZBJR8gMGXLU3nnU=",
      category: "other",
      date: "September 15, 2025",
      duration: "4:45",
      language: "hindi",
      videoUrl: "https://www.youtube.com/watch?v=wN_eBzQ0XjE"
    },
    {
      id: "5",
      title: "Heart Attack Progression",
      description: "Visualization of a heart attack from blockage to muscle damage.",
      thumbnail: "https://media.istockphoto.com/id/1128931450/photo/heart-attack-concept.jpg?s=612x612&w=0&k=20&c=XHOhTXhpZMSV6XIhXLbH6uvNQjZQS93b1UetGfqQXtI=",
      category: "heart",
      date: "August 28, 2025",
      duration: "6:12",
      language: "english",
      videoUrl: "https://www.youtube.com/watch?v=YAzxXJiBqLI"
    },
    {
      id: "6",
      title: "Alzheimer's Disease Progression",
      description: "How Alzheimer's affects the brain over time.",
      thumbnail: "https://ayurdhama.com/wp-content/uploads/2023/07/Alzheimers-disease-1.png",
      category: "brain",
      date: "August 10, 2025",
      duration: "7:24",
      language: "english",
      videoUrl: "https://www.youtube.com/watch?v=nKLL8eQ4p-E"
    }
  ];

  // Function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    // Handle different YouTube URL formats
    let videoId = "";
    
    // Format: https://youtu.be/VIDEOID
    if (url.includes("youtu.be")) {
      const parts = url.split("/");
      videoId = parts[parts.length - 1].split("?")[0];
    }
    // Format: https://www.youtube.com/watch?v=VIDEOID
    else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      videoId = urlParams.get("v") || "";
    }
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };
  
  // Function to get category gradient background
  const getCategoryGradient = (category: string): string => {
    switch(category) {
      case "heart":
        return "bg-gradient-to-br from-red-500/70 to-rose-700/70";
      case "lungs":
        return "bg-gradient-to-br from-blue-500/70 to-sky-700/70";
      case "digestive":
        return "bg-gradient-to-br from-orange-500/70 to-amber-700/70";
      case "brain":
        return "bg-gradient-to-br from-purple-500/70 to-violet-700/70";
      case "skeletal":
        return "bg-gradient-to-br from-gray-500/70 to-zinc-700/70";
      default:
        return "bg-gradient-to-br from-emerald-500/70 to-teal-700/70";
    }
  };
  
  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "heart":
        return <Heart className="h-3 w-3" />;
      case "lungs":
        return <Flame className="h-3 w-3" />;
      case "digestive":
        return <Flame className="h-3 w-3" />;
      case "brain":
        return <Flame className="h-3 w-3" />;
      case "skeletal":
        return <Flame className="h-3 w-3" />;
      default:
        return <Flame className="h-3 w-3" />;
    }
  };

  // Define body areas for selection
  const bodyAreas: BodyArea[] = [
    { id: "heart", name: "Heart & Cardiovascular", icon: Heart },
    { id: "lungs", name: "Lungs & Respiratory", icon: Flame },
    { id: "digestive", name: "Digestive System", icon: Flame },
    { id: "brain", name: "Brain & Nervous System", icon: Flame },
    { id: "skeletal", name: "Bones & Joints", icon: Flame },
    { id: "other", name: "Other Body Systems", icon: Flame }
  ];

  // Filter visualizations based on language
  const filteredVisualizations = visualizations.filter(
    vis => vis.language === selectedLanguage
  );

  const handleGenerateVisualization = () => {
    if (!selectedBodyArea) {
      toast.error("Please select a body area");
      return;
    }

    if (!medicalDescription) {
      toast.error("Please enter a medical description");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation process
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Add the "generated" visualization to the library
          const bodyAreaName = bodyAreas.find(area => area.id === selectedBodyArea)?.name || "";
          
          toast.success("Visualization successfully generated!");
          
          // Reset form
          setSelectedBodyArea("");
          setMedicalDescription("");
          setUploadedFiles([]);
          
          // Switch to library tab
          setSelectedTab("library");
          
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const filesArray = Array.from(e.target.files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...filesArray]);
      toast.success(`${e.target.files.length} file(s) uploaded successfully`);
    }
  };

  const handleVisualizationSelect = (visualization: Visualization) => {
    setSelectedVisualization(visualization);
    setIsVideoPlaying(false); // Reset video state when selecting a new visualization
  };

  const handleBackToLibrary = () => {
    setSelectedVisualization(null);
    setIsVideoPlaying(false);
  };

  const handlePlayVisualization = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">3D Health Visualizations</h1>
        <div className="flex items-center gap-2">
          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="kannada">Kannada</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
              <SelectItem value="telugu">Telugu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedVisualization ? (
        <Card className="w-full">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit mb-2"
              onClick={handleBackToLibrary}
            >
              ← Back to library
            </Button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{selectedVisualization.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {selectedVisualization.description}
                </CardDescription>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted-foreground">Created: {selectedVisualization.date}</span>
                  <span className="text-sm text-muted-foreground">Duration: {selectedVisualization.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button 
                  size="sm" 
                  className="flex items-center"
                  onClick={handlePlayVisualization}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center border overflow-hidden">
              {isVideoPlaying && selectedVisualization.videoUrl ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVisualization.videoUrl)}
                  className="w-full h-full"
                  title={selectedVisualization.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Click to play visualization</p>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handlePlayVisualization}
                  >
                    <Play className="h-4 w-4" />
                    Play Visualization
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">About This Visualization</h3>
                <p className="text-muted-foreground">
                  This 3D visualization explains {selectedVisualization.title.toLowerCase()} in an easy-to-understand format. 
                  The animation shows the progression, potential complications, and treatment approaches.
                </p>
                <h4 className="font-medium mt-4 mb-2">Key Points Covered:</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">Disease mechanism and progression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">Impact on surrounding tissues and organs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">How treatment approaches work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">Prevention strategies</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Discussion Points</h3>
                <p className="text-muted-foreground mb-4">
                  Consider discussing these topics with your healthcare provider:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-md border">
                    <p className="font-medium">How this condition affects your daily life</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Discuss specific symptoms and limitations you experience
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-md border">
                    <p className="font-medium">Treatment options specific to your case</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ask about medication, lifestyle changes, and new therapies
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-md border">
                    <p className="font-medium">Long-term management strategies</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Discuss monitoring, prevention of complications, and follow-up care
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline">Share With Doctor</Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Get Detailed Explanation
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">
              <Microscope className="mr-2 h-4 w-4" />
              Visualization Library
            </TabsTrigger>
            <TabsTrigger value="generate">
              <Flame className="mr-2 h-4 w-4" />
              Generate New Visualization
            </TabsTrigger>
          </TabsList>
          <TabsContent value="library" className="mt-6">
            {filteredVisualizations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVisualizations.map((vis) => (
                  <Card key={vis.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleVisualizationSelect(vis)}>
                    <div className="aspect-video bg-muted relative flex items-center justify-center">
                      {/* Image display with fallback */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: `url(${vis.thumbnail})` }}
                      />
                      
                      {/* Fallback gradient background if image fails */}
                      <div className={`absolute inset-0 z-0 ${getCategoryGradient(vis.category)}`} />
                      
                      {/* Category icon overlay */}
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1.5 z-10">
                        {getCategoryIcon(vis.category)}
                        <span>{vis.category.charAt(0).toUpperCase() + vis.category.slice(1)}</span>
                      </div>
                      
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                        {vis.duration}
                      </div>
                      <Button 
                        size="icon" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 z-10"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{vis.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{vis.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0 pb-3 text-sm text-muted-foreground">
                      {vis.date}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Globe className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium">No visualizations available</h3>
                <p className="text-muted-foreground mt-2">
                  No {selectedLanguage} visualizations are currently available. Try another language or generate a new visualization.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => setSelectedTab("generate")}
                >
                  Generate New Visualization
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="generate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate 3D Visualization</CardTitle>
                <CardDescription>
                  Create a personalized visualization of your medical condition for better understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Select Affected Body Area</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {bodyAreas.map((area) => {
                        const Icon = area.icon;
                        return (
                          <button
                            key={area.id}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                              selectedBodyArea === area.id 
                                ? "border-primary bg-primary/5" 
                                : "border-muted hover:border-primary/20"
                            }`}
                            onClick={() => setSelectedBodyArea(area.id)}
                          >
                            <Icon className={`h-8 w-8 mb-2 ${
                              selectedBodyArea === area.id ? "text-primary" : "text-muted-foreground"
                            }`} />
                            <span className={`text-sm ${
                              selectedBodyArea === area.id ? "text-primary font-medium" : ""
                            }`}>
                              {area.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Medical Condition Description</label>
                    <Textarea
                      placeholder="Describe the medical condition (e.g., 'Type 2 diabetes with higher than normal blood sugar levels')"
                      value={medicalDescription}
                      onChange={(e) => setMedicalDescription(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Upload Medical Reports/Images (Optional)</label>
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <UploadIcon className="h-8 w-8 text-muted-foreground/70" />
                        <p className="text-sm text-center text-muted-foreground">
                          Drag and drop files here or click to browse
                        </p>
                        <Input 
                          type="file" 
                          className="hidden" 
                          id="file-upload" 
                          onChange={handleFileUpload}
                          multiple
                        />
                        <label htmlFor="file-upload">
                          <Button variant="outline" size="sm" className="mt-2" type="button">
                            Select Files
                          </Button>
                        </label>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                          <ScrollArea className="h-24">
                            <ul className="space-y-1">
                              {uploadedFiles.map((file, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>{file}</span>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Visualization Language</label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="kannada">Kannada</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="outline" onClick={() => setSelectedTab("library")}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateVisualization} 
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating ({generationProgress}%)
                    </>
                  ) : (
                    <>
                      Generate Visualization
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PatientVisualizations;