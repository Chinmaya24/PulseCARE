
import { useState } from "react";
import { 
  Apple, 
  Calendar, 
  Check, 
  ChevronRight, 
  Download, 
  DrumstickIcon, 
  Fish, 
  Flower2, 
  Loader2, 
  Salad, 
  Search, 
  ShoppingCart, 
  Utensils, 
  Wheat 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FoodItem {
  id: string;
  name: string;
  category: "fruit" | "vegetable" | "grain" | "protein" | "dairy" | "other";
  benefits: string[];
  restrictions?: string[];
}

interface MealPlan {
  id: string;
  title: string;
  description: string;
  tags: string[];
  meals: {
    time: string;
    name: string;
    items: string[];
    nutrition?: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  }[];
}

const PatientDietaryPlan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("hypertension");
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample food data
  const foodData: FoodItem[] = [
    {
      id: "1",
      name: "Bananas",
      category: "fruit",
      benefits: [
        "Rich in potassium which helps lower blood pressure",
        "Good source of fiber",
        "Low in sodium"
      ],
      restrictions: []
    },
    {
      id: "2",
      name: "Spinach",
      category: "vegetable",
      benefits: [
        "High in nitrates which help lower blood pressure",
        "Rich in antioxidants",
        "Good source of folate, potassium, and magnesium"
      ],
      restrictions: []
    },
    {
      id: "3",
      name: "Whole Grains",
      category: "grain",
      benefits: [
        "High in fiber which helps lower cholesterol",
        "Helps regulate blood sugar",
        "Contains important nutrients like B vitamins"
      ],
      restrictions: []
    },
    {
      id: "4",
      name: "Salmon",
      category: "protein",
      benefits: [
        "Rich in omega-3 fatty acids which reduce inflammation",
        "High-quality protein source",
        "Contains vitamin D and selenium"
      ],
      restrictions: []
    },
    {
      id: "5",
      name: "Yogurt",
      category: "dairy",
      benefits: [
        "Good source of calcium and protein",
        "Contains probiotics for gut health",
        "May help lower blood pressure"
      ],
      restrictions: ["Choose low-fat, unsweetened versions"]
    },
    {
      id: "6",
      name: "Berries",
      category: "fruit",
      benefits: [
        "High in antioxidants",
        "Low glycemic index",
        "Rich in fiber"
      ],
      restrictions: []
    },
    {
      id: "7",
      name: "Olive Oil",
      category: "other",
      benefits: [
        "Contains healthy monounsaturated fats",
        "Rich in antioxidants",
        "May help lower blood pressure"
      ],
      restrictions: ["Use in moderation due to high calorie content"]
    },
    {
      id: "8",
      name: "Beans and Lentils",
      category: "protein",
      benefits: [
        "Excellent source of plant protein",
        "High in fiber",
        "Help reduce blood cholesterol"
      ],
      restrictions: []
    },
  ];

  // Sample meal plans
  const mealPlans: MealPlan[] = [
    {
      id: "1",
      title: "DASH Diet Plan",
      description: "Dietary Approaches to Stop Hypertension - designed to help lower blood pressure.",
      tags: ["hypertension", "heart-health", "low-sodium"],
      meals: [
        {
          time: "Breakfast (7:30 AM)",
          name: "Whole Grain Start",
          items: [
            "1 cup cooked oatmeal with cinnamon",
            "1 banana",
            "1/4 cup chopped walnuts",
            "1 cup low-fat milk"
          ],
          nutrition: {
            calories: 420,
            protein: 18,
            carbs: 56,
            fat: 16
          }
        },
        {
          time: "Snack (10:00 AM)",
          name: "Fruit Break",
          items: [
            "1 medium apple",
            "1 tablespoon unsalted almond butter"
          ],
          nutrition: {
            calories: 165,
            protein: 3,
            carbs: 25,
            fat: 8
          }
        },
        {
          time: "Lunch (12:30 PM)",
          name: "Mediterranean Bowl",
          items: [
            "2 cups mixed greens",
            "3 oz grilled chicken breast",
            "1/4 cup quinoa",
            "1/4 avocado, sliced",
            "2 tablespoons olive oil and lemon dressing"
          ],
          nutrition: {
            calories: 380,
            protein: 29,
            carbs: 18,
            fat: 22
          }
        },
        {
          time: "Snack (3:30 PM)",
          name: "Yogurt Parfait",
          items: [
            "6 oz plain Greek yogurt",
            "1/2 cup berries",
            "1 tablespoon honey"
          ],
          nutrition: {
            calories: 195,
            protein: 17,
            carbs: 26,
            fat: 2
          }
        },
        {
          time: "Dinner (6:30 PM)",
          name: "Salmon & Veggies",
          items: [
            "4 oz baked salmon with herbs",
            "1 cup steamed broccoli",
            "1/2 cup brown rice",
            "Lemon-dill sauce (yogurt based)"
          ],
          nutrition: {
            calories: 445,
            protein: 35,
            carbs: 42,
            fat: 16
          }
        }
      ]
    },
    {
      id: "2",
      title: "Diabetes-Friendly Meal Plan",
      description: "Balanced meals with a focus on blood sugar management.",
      tags: ["diabetes", "low-glycemic", "balanced"],
      meals: [
        {
          time: "Breakfast (7:30 AM)",
          name: "Protein-Rich Start",
          items: [
            "2 eggs scrambled with spinach and tomatoes",
            "1 slice whole grain toast",
            "1/4 avocado",
            "1 cup unsweetened tea"
          ],
          nutrition: {
            calories: 340,
            protein: 20,
            carbs: 15,
            fat: 22
          }
        },
        {
          time: "Snack (10:00 AM)",
          name: "Protein Snack",
          items: [
            "1/4 cup mixed nuts",
            "1 small apple"
          ],
          nutrition: {
            calories: 220,
            protein: 6,
            carbs: 20,
            fat: 14
          }
        },
        {
          time: "Lunch (12:30 PM)",
          name: "Balanced Plate",
          items: [
            "3 oz grilled chicken",
            "1 cup roasted non-starchy vegetables",
            "1/3 cup quinoa",
            "1 tablespoon olive oil for cooking"
          ],
          nutrition: {
            calories: 355,
            protein: 30,
            carbs: 20,
            fat: 16
          }
        },
        {
          time: "Snack (3:30 PM)",
          name: "Protein & Fiber Combo",
          items: [
            "1/2 cup cottage cheese",
            "1/2 cup berries"
          ],
          nutrition: {
            calories: 140,
            protein: 16,
            carbs: 10,
            fat: 3
          }
        },
        {
          time: "Dinner (6:30 PM)",
          name: "Mediterranean Plate",
          items: [
            "4 oz baked white fish",
            "1 cup steamed green beans",
            "1/2 cup cauliflower rice",
            "Lemon and herb sauce"
          ],
          nutrition: {
            calories: 320,
            protein: 38,
            carbs: 15,
            fat: 12
          }
        }
      ]
    },
    {
      id: "3",
      title: "Heart-Healthy Diet",
      description: "Foods that promote cardiovascular health and cholesterol management.",
      tags: ["heart-disease", "cholesterol", "omega-3"],
      meals: [
        {
          time: "Breakfast (8:00 AM)",
          name: "Fiber-Rich Start",
          items: [
            "1/2 cup steel-cut oats",
            "1 tablespoon ground flaxseed",
            "1/2 cup berries",
            "1 cup unsweetened almond milk",
            "1/2 tablespoon honey (optional)"
          ],
          nutrition: {
            calories: 310,
            protein: 8,
            carbs: 42,
            fat: 12
          }
        },
        {
          time: "Lunch (12:30 PM)",
          name: "Plant-Based Bowl",
          items: [
            "1 cup lentil soup",
            "2 cups mixed green salad",
            "1 tablespoon olive oil dressing",
            "1 small whole grain roll"
          ],
          nutrition: {
            calories: 380,
            protein: 15,
            carbs: 45,
            fat: 16
          }
        },
        {
          time: "Snack (3:30 PM)",
          name: "Healthy Fats",
          items: [
            "1/4 cup unsalted nuts",
            "1 medium fruit"
          ],
          nutrition: {
            calories: 220,
            protein: 6,
            carbs: 15,
            fat: 17
          }
        },
        {
          time: "Dinner (7:00 PM)",
          name: "Omega-3 Rich Plate",
          items: [
            "4 oz grilled salmon",
            "1 cup steamed vegetables",
            "1/2 cup quinoa",
            "Fresh herbs and lemon"
          ],
          nutrition: {
            calories: 395,
            protein: 32,
            carbs: 30,
            fat: 16
          }
        }
      ]
    },
    {
      id: "4",
      title: "COPD-Friendly Meal Plan",
      description: "Easier to chew and digest foods that provide nutrition without causing breathlessness.",
      tags: ["respiratory", "energy-dense", "easy-to-eat"],
      meals: [
        {
          time: "Breakfast (8:00 AM)",
          name: "Easy Morning Start",
          items: [
            "1 cup Greek yogurt",
            "1/2 cup soft berries",
            "1 tablespoon honey",
            "2 tablespoons ground nuts"
          ],
          nutrition: {
            calories: 290,
            protein: 20,
            carbs: 30,
            fat: 10
          }
        },
        {
          time: "Lunch (12:00 PM)",
          name: "Nutrient-Dense Meal",
          items: [
            "1 cup vegetable soup (blended for easier eating)",
            "1/2 avocado on 1 slice whole grain toast",
            "1 soft boiled egg"
          ],
          nutrition: {
            calories: 350,
            protein: 15,
            carbs: 25,
            fat: 22
          }
        },
        {
          time: "Snack (3:00 PM)",
          name: "Energy Booster",
          items: [
            "1 banana",
            "2 tablespoons nut butter"
          ],
          nutrition: {
            calories: 250,
            protein: 7,
            carbs: 27,
            fat: 16
          }
        },
        {
          time: "Dinner (6:00 PM)",
          name: "Protein & Vegetables",
          items: [
            "3 oz tender baked chicken",
            "1 cup well-cooked vegetables",
            "1/2 cup mashed potatoes",
            "2 tablespoons gravy"
          ],
          nutrition: {
            calories: 380,
            protein: 25,
            carbs: 30,
            fat: 18
          }
        }
      ]
    }
  ];

  const filteredFoods = searchQuery
    ? foodData.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : foodData;

  // Get appropriate meal plans based on condition
  const getRecommendedPlans = () => {
    let plans = [];
    
    switch(selectedCondition) {
      case "hypertension":
        plans = mealPlans.filter(plan => 
          plan.tags.includes("hypertension") || plan.tags.includes("heart-health")
        );
        break;
      case "diabetes":
        plans = mealPlans.filter(plan => 
          plan.tags.includes("diabetes") || plan.tags.includes("low-glycemic")
        );
        break;
      case "heart-disease":
        plans = mealPlans.filter(plan => 
          plan.tags.includes("heart-disease") || plan.tags.includes("heart-health")
        );
        break;
      case "respiratory":
        plans = mealPlans.filter(plan => 
          plan.tags.includes("respiratory") || plan.tags.includes("easy-to-eat")
        );
        break;
      default:
        plans = mealPlans;
    }
    
    return plans;
  };

  const handlePlanSelect = (plan: MealPlan) => {
    setIsLoading(true);
    // Simulate loading state
    setTimeout(() => {
      setSelectedPlan(plan);
      setIsLoading(false);
    }, 800);
  };

  const handleBack = () => {
    setSelectedPlan(null);
  };

  // Get icon based on food category
  const getFoodIcon = (category: string) => {
    switch(category) {
      case "fruit": 
        return <Apple className="h-4 w-4" />;
      case "vegetable": 
        return <Salad className="h-4 w-4" />;
      case "grain": 
        return <Wheat className="h-4 w-4" />;
      case "protein": 
        return <DrumstickIcon className="h-4 w-4" />;
      case "dairy": 
        return <Fish className="h-4 w-4" />;
      default: 
        return <Flower2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dietary Recommendations</h1>
        <div className="relative max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search foods..."
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
      ) : selectedPlan ? (
        <Card className="w-full">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit mb-2"
              onClick={handleBack}
            >
              ← Back to plans
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedPlan.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {selectedPlan.description}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button size="sm" className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Generate Shopping List
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPlan.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedPlan.meals.map((meal, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{meal.time}</span>
                      </div>
                      <span className="text-lg font-medium">{meal.name}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Meal Items:</h4>
                        <ul className="space-y-2">
                          {meal.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {meal.nutrition && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Nutrition Information:</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Calories</span>
                                <span className="font-medium">{meal.nutrition.calories} kcal</span>
                              </div>
                              <Progress value={meal.nutrition.calories / 10} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Protein</span>
                                <span className="font-medium">{meal.nutrition.protein}g</span>
                              </div>
                              <Progress value={meal.nutrition.protein * 2} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Carbs</span>
                                <span className="font-medium">{meal.nutrition.carbs}g</span>
                              </div>
                              <Progress value={meal.nutrition.carbs} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Fat</span>
                                <span className="font-medium">{meal.nutrition.fat}g</span>
                              </div>
                              <Progress value={meal.nutrition.fat * 2} className="h-2" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meal Plan Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">Drink at least 8 glasses of water throughout the day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">Limit salt intake by avoiding processed foods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">Choose whole foods over processed options when possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">Adjust portion sizes based on your specific caloric needs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue="plans" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plans">
                <Utensils className="mr-2 h-4 w-4" />
                Meal Plans
              </TabsTrigger>
              <TabsTrigger value="foods">
                <Apple className="mr-2 h-4 w-4" />
                Recommended Foods
              </TabsTrigger>
            </TabsList>
            <TabsContent value="plans" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recommended Meal Plans</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-muted-foreground">Condition:</span>
                  <select
                    className="border rounded-md px-2 py-1 text-sm bg-background"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                  >
                    <option value="hypertension">Hypertension</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="heart-disease">Heart Disease</option>
                    <option value="respiratory">Respiratory Conditions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getRecommendedPlans().map((plan) => (
                  <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm text-muted-foreground mb-2">
                        Sample meals:
                      </div>
                      <ul className="space-y-1.5">
                        {plan.meals.slice(0, 2).map((meal, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{meal.time}:</span> {meal.name}
                          </li>
                        ))}
                        <li className="text-sm text-muted-foreground">
                          ... and {plan.meals.length - 2} more meals
                        </li>
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {plan.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => handlePlanSelect(plan)}
                      >
                        View Complete Plan
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="foods" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFoods.map((food) => (
                  <Card key={food.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <span className="p-1.5 mr-2 rounded-full bg-primary/10">
                          {getFoodIcon(food.category)}
                        </span>
                        {food.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-medium mb-1">Benefits:</h4>
                      <ul className="space-y-1 mb-3">
                        {food.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 mt-1">
                              <div className="h-1 w-1 rounded-full bg-green-600 dark:bg-green-400"></div>
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      {food.restrictions && food.restrictions.length > 0 && (
                        <>
                          <h4 className="text-sm font-medium mb-1">Considerations:</h4>
                          <ul className="space-y-1">
                            {food.restrictions.map((restriction, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-0.5 mt-1">
                                  <div className="h-1 w-1 rounded-full bg-yellow-600 dark:bg-yellow-400"></div>
                                </div>
                                <span>{restriction}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PatientDietaryPlan;
