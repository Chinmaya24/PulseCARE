
import { useNavigate } from "react-router-dom";
import { Activity, ArrowRight, Heart, HeartPulse, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary"></span>
            <span className="font-bold text-lg">PulseCare</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Smart Healthcare Assistant for Clinics and Patients
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              PulseCare digitizes patient rounds, simplifies data entry, detects adverse drug reactions, and provides personalized health insights to improve clinical workflows and patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/register")}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 container">
          <h2 className="text-3xl font-bold text-center mb-12">Built for Everyone in Healthcare</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <HeartPulse className="h-10 w-10 text-medical-primary mb-2" />
                <CardTitle>For Doctors</CardTitle>
                <CardDescription>
                  Streamline your workflow and improve patient care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-medical-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                    </div>
                    <span className="text-sm">Quick data entry for patient vitals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-medical-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                    </div>
                    <span className="text-sm">Voice-to-text clinical notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-medical-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                    </div>
                    <span className="text-sm">Automated ADR detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-medical-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                    </div>
                    <span className="text-sm">End-of-day summaries</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/login")}>
                  Doctor Login
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-patient-primary mb-2" />
                <CardTitle>For Patients</CardTitle>
                <CardDescription>
                  Take control of your health journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-patient-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-patient-primary"></div>
                    </div>
                    <span className="text-sm">Daily symptom logging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-patient-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-patient-primary"></div>
                    </div>
                    <span className="text-sm">Medication reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-patient-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-patient-primary"></div>
                    </div>
                    <span className="text-sm">Health education resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-patient-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-patient-primary"></div>
                    </div>
                    <span className="text-sm">3D visualizations of conditions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/login")}>
                  Patient Login
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-admin-primary mb-2" />
                <CardTitle>For Admins</CardTitle>
                <CardDescription>
                  Efficiently manage your healthcare platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-admin-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-admin-primary"></div>
                    </div>
                    <span className="text-sm">User management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-admin-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-admin-primary"></div>
                    </div>
                    <span className="text-sm">Appointment oversight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-admin-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-admin-primary"></div>
                    </div>
                    <span className="text-sm">Campaign approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-admin-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-admin-primary"></div>
                    </div>
                    <span className="text-sm">Analytics dashboard</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/login")}>
                  Admin Login
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-10 w-10 text-ngo-primary mb-2" />
                <CardTitle>For NGOs</CardTitle>
                <CardDescription>
                  Expand your impact in healthcare
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ngo-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-ngo-primary"></div>
                    </div>
                    <span className="text-sm">Campaign management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ngo-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-ngo-primary"></div>
                    </div>
                    <span className="text-sm">Patient referrals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ngo-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-ngo-primary"></div>
                    </div>
                    <span className="text-sm">Health drive organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ngo-primary/10 p-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-ngo-primary"></div>
                    </div>
                    <span className="text-sm">Impact reporting</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/login")}>
                  NGO Login
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-medical-primary/10 p-4 mb-4">
                  <HeartPulse className="h-8 w-8 text-medical-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ADR Detection</h3>
                <p className="text-muted-foreground">
                  Smart detection of adverse drug reactions using rule-based logic and machine learning algorithms.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-patient-primary/10 p-4 mb-4">
                  <Activity className="h-8 w-8 text-patient-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
                <p className="text-muted-foreground">
                  Comprehensive tracking of vitals, symptoms, and medication compliance with visual trends.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-admin-primary/10 p-4 mb-4">
                  <Users className="h-8 w-8 text-admin-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Seamless collaboration between doctors, patients, administrators, and NGOs for better care coordination.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="h-8 w-8 rounded-full bg-primary"></span>
              <span className="font-bold text-lg">PulseCare</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025 PulseCare. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
