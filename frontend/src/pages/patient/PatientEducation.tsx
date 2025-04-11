
import { useState } from "react";
import { Heart, Info, Loader2, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types for our disease data
interface DiseaseInfo {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  preventions: string[];
  imageUrl?: string;
  category: "heart" | "diabetes" | "respiratory" | "other";
}

const PatientEducation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample disease information
  const diseaseData: DiseaseInfo[] = [
    {
      id: "1",
      name: "Hypertension",
      description: "Hypertension, or high blood pressure, is a common condition where the long-term force of blood against your artery walls is high enough that it may eventually cause health problems.",
      symptoms: [
        "Headaches",
        "Shortness of breath",
        "Nosebleeds",
        "Flushing",
        "Dizziness",
        "Chest pain",
        "Visual changes",
        "Blood in urine"
      ],
      treatments: [
        "Healthy lifestyle changes",
        "Medications such as diuretics, ACE inhibitors, ARBs",
        "Regular monitoring",
        "Reducing sodium intake",
        "Regular exercise"
      ],
      preventions: [
        "Maintain a healthy weight",
        "Exercise regularly",
        "Eat a diet rich in fruits, vegetables, and low-fat dairy",
        "Reduce sodium in your diet",
        "Limit alcohol consumption",
        "Quit smoking",
        "Manage stress"
      ],
      category: "heart"
    },
    {
      id: "2",
      name: "Type 2 Diabetes",
      description: "Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose), which is an important source of fuel for your body.",
      symptoms: [
        "Increased thirst",
        "Frequent urination",
        "Increased hunger",
        "Unintended weight loss",
        "Fatigue",
        "Blurred vision",
        "Slow-healing sores",
        "Frequent infections"
      ],
      treatments: [
        "Healthy eating",
        "Regular exercise",
        "Weight loss",
        "Diabetes medications or insulin therapy",
        "Blood sugar monitoring"
      ],
      preventions: [
        "Lose excess weight",
        "Be more physically active",
        "Eat healthy foods",
        "Control your blood pressure and cholesterol",
        "Get regular health screenings"
      ],
      category: "diabetes"
    },
    {
      id: "3",
      name: "Asthma",
      description: "Asthma is a condition in which your airways narrow and swell and produce extra mucus, which can make breathing difficult and trigger coughing, wheezing, and shortness of breath.",
      symptoms: [
        "Shortness of breath",
        "Chest tightness or pain",
        "Trouble sleeping caused by shortness of breath",
        "Wheezing when exhaling",
        "Coughing or wheezing attacks worsened by respiratory virus"
      ],
      treatments: [
        "Quick-relief medications",
        "Long-term control medications",
        "Bronchial thermoplasty",
        "Breathing exercises",
        "Avoiding triggers"
      ],
      preventions: [
        "Identify and avoid asthma triggers",
        "Get vaccinated for influenza and pneumonia",
        "Monitor your breathing",
        "Take prescribed medications",
        "Follow your asthma action plan"
      ],
      category: "respiratory"
    },
    {
      id: "4",
      name: "Coronary Artery Disease",
      description: "Coronary artery disease develops when the major blood vessels that supply your heart become damaged or diseased, often due to cholesterol-containing deposits (plaques).",
      symptoms: [
        "Chest pain (angina)",
        "Shortness of breath",
        "Pain in the arms or shoulders",
        "Weakness or fatigue",
        "Heart attack (in severe cases)"
      ],
      treatments: [
        "Lifestyle changes",
        "Medications to control blood pressure and cholesterol",
        "Surgical procedures",
        "Cardiac rehabilitation"
      ],
      preventions: [
        "Quit smoking",
        "Exercise regularly",
        "Maintain a healthy weight",
        "Eat a heart-healthy diet",
        "Manage stress",
        "Control other health conditions"
      ],
      category: "heart"
    },
    {
      id: "5",
      name: "Chronic Obstructive Pulmonary Disease (COPD)",
      description: "COPD is a chronic inflammatory lung disease that causes obstructed airflow from the lungs, making it difficult to breathe.",
      symptoms: [
        "Shortness of breath",
        "Wheezing",
        "Chest tightness",
        "Chronic cough with mucus",
        "Frequent respiratory infections",
        "Fatigue",
        "Unintended weight loss (in later stages)"
      ],
      treatments: [
        "Smoking cessation",
        "Medications (bronchodilators, inhaled steroids)",
        "Lung therapies (oxygen therapy, pulmonary rehabilitation)",
        "Managing complications"
      ],
      preventions: [
        "Don't smoke, or stop smoking",
        "Avoid secondhand smoke and chemical fumes",
        "Get vaccinated",
        "Prevent respiratory infections"
      ],
      category: "respiratory"
    },
  ];

  const filteredDiseases = searchQuery
    ? diseaseData.filter(disease => 
        disease.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : diseaseData;

  const handleDiseaseSelect = (disease: DiseaseInfo) => {
    setIsLoading(true);
    // Simulate loading state
    setTimeout(() => {
      setSelectedDisease(disease);
      setIsLoading(false);
    }, 800);
  };

  const handleBack = () => {
    setSelectedDisease(null);
  };

  // Group diseases by category
  const heartDiseases = diseaseData.filter(d => d.category === "heart");
  const diabetesDiseases = diseaseData.filter(d => d.category === "diabetes");
  const respiratoryDiseases = diseaseData.filter(d => d.category === "respiratory");
  const otherDiseases = diseaseData.filter(d => d.category === "other");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Health Education</h1>
        <div className="relative max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conditions..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : selectedDisease ? (
        <Card className="w-full">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit mb-2"
              onClick={handleBack}
            >
              ← Back to list
            </Button>
            <CardTitle className="text-2xl">{selectedDisease.name}</CardTitle>
            <CardDescription className="text-base">
              {selectedDisease.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {selectedDisease.description}
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border border-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">What You Should Know</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learning about your condition is the first step to better health. Talk to your doctor about your symptoms and follow your treatment plan carefully.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="symptoms" className="mt-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Common symptoms of {selectedDisease.name} include:
                  </p>
                  <ul className="space-y-2">
                    {selectedDisease.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-300">When to See a Doctor</h3>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300/80">
                      Contact your healthcare provider immediately if you experience severe or persistent symptoms, or if your condition worsens suddenly.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="treatment" className="mt-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Treatment options for {selectedDisease.name} may include:
                  </p>
                  <ul className="space-y-2">
                    {selectedDisease.treatments.map((treatment, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-medium text-blue-800 dark:text-blue-300">Treatment Reminder</h3>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300/80">
                      Always take medications as prescribed by your doctor and attend all follow-up appointments. Never change your treatment plan without consulting your healthcare provider.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="prevention" className="mt-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Ways to prevent or manage {selectedDisease.name}:
                  </p>
                  <ul className="space-y-2">
                    {selectedDisease.preventions.map((prevention, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                        </div>
                        <span>{prevention}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h3 className="font-medium text-green-800 dark:text-green-300">Lifestyle Matters</h3>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300/80">
                      Making healthy lifestyle choices is an important part of managing your condition. Small changes can lead to significant improvements in your health over time.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Share Information</Button>
            <Button>Ask Your Doctor</Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader className="bg-red-50 dark:bg-red-900/10 rounded-t-lg border-b border-red-100 dark:border-red-900/20">
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <Heart className="h-5 w-5" />
                  Heart Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ScrollArea className="h-60">
                  <div className="space-y-3">
                    {heartDiseases.map((disease) => (
                      <Button
                        key={disease.id}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => handleDiseaseSelect(disease)}
                      >
                        {disease.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg border-b border-blue-100 dark:border-blue-900/20">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Info className="h-5 w-5" />
                  Diabetes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ScrollArea className="h-60">
                  <div className="space-y-3">
                    {diabetesDiseases.map((disease) => (
                      <Button
                        key={disease.id}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => handleDiseaseSelect(disease)}
                      >
                        {disease.name}
                      </Button>
                    ))}
                    {/* Additional placeholder items since we have few diabetes entries */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {}}
                    >
                      Type 1 Diabetes
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {}}
                    >
                      Gestational Diabetes
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {}}
                    >
                      Prediabetes
                    </Button>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="bg-green-50 dark:bg-green-900/10 rounded-t-lg border-b border-green-100 dark:border-green-900/20">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Info className="h-5 w-5" />
                  Respiratory Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ScrollArea className="h-60">
                  <div className="space-y-3">
                    {respiratoryDiseases.map((disease) => (
                      <Button
                        key={disease.id}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => handleDiseaseSelect(disease)}
                      >
                        {disease.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>All Health Conditions</CardTitle>
              <CardDescription>
                Browse our library of health information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDiseases.map((disease) => (
                  <Button
                    key={disease.id}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                    onClick={() => handleDiseaseSelect(disease)}
                  >
                    <span className="font-medium">{disease.name}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      {disease.description.substring(0, 100)}...
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Load More Conditions</Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default PatientEducation;
