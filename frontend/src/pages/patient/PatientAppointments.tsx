import React, { useState } from "react";
import { Calendar, Clock, User, Plus, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { format, addDays, addHours, isAfter, isBefore, startOfToday } from "date-fns";

const generateTimeSlots = (date: Date) => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return [];
  }

  for (let hour = startHour; hour < endHour; hour++) {
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    
    const isAvailable = Math.random() > 0.3;
    
    slots.push({
      time: slotTime,
      available: isAvailable,
      doctor: hour % 3 === 0 ? "Dr. Sarah Johnson" : hour % 3 === 1 ? "Dr. Michael Chen" : "Dr. Priya Patel",
      specialty: hour % 3 === 0 ? "Cardiologist" : hour % 3 === 1 ? "Neurologist" : "Pediatrician",
    });
  }
  
  return slots;
};

const upcomingAppointments = [
  {
    id: "1",
    date: addDays(new Date(), 2),
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    reason: "Blood Pressure Checkup",
    status: "Confirmed",
  },
  {
    id: "2",
    date: addDays(new Date(), 5),
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    specialty: "Neurologist",
    reason: "Headache Consultation",
    status: "Pending",
  },
];

const pastAppointments = [
  {
    id: "3",
    date: addDays(new Date(), -10),
    time: "11:30 AM",
    doctor: "Dr. Priya Patel",
    specialty: "Pediatrician",
    reason: "Annual Checkup",
    status: "Completed",
    notes: "Recommended regular exercise and dietary changes.",
  },
  {
    id: "4",
    date: addDays(new Date(), -30),
    time: "9:15 AM",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    reason: "Heart Palpitations",
    status: "Completed",
    notes: "Prescribed medication for 3 months. Follow-up required.",
  },
];

const PatientAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState(selectedDate ? generateTimeSlots(selectedDate) : []);
  const [selectedSlot, setSelectedSlot] = useState<typeof availableSlots[0] | null>(null);
  const [appointmentReason, setAppointmentReason] = useState("");
  const [myAppointments, setMyAppointments] = useState(upcomingAppointments);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setAvailableSlots(generateTimeSlots(date));
      setSelectedSlot(null);
    }
  };
  
  const handleBookAppointment = () => {
    if (!selectedSlot || !appointmentReason.trim()) {
      toast({
        title: "Error",
        description: "Please select a time slot and provide a reason for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    const newAppointment = {
      id: `new-${Date.now()}`,
      date: selectedDate as Date,
      time: format(selectedSlot.time, "h:mm a"),
      doctor: selectedSlot.doctor,
      specialty: selectedSlot.specialty,
      reason: appointmentReason,
      status: "Pending",
    };
    
    setMyAppointments([newAppointment, ...myAppointments]);
    
    toast({
      title: "Appointment Booked",
      description: `Your appointment has been scheduled for ${format(selectedDate as Date, "MMMM d, yyyy")} at ${format(selectedSlot.time, "h:mm a")} with ${selectedSlot.doctor}.`,
      variant: "default",
    });
    
    setSelectedSlot(null);
    setAppointmentReason("");
    
    setTimeout(() => {
      toast({
        title: "Doctor Notified",
        description: `${selectedSlot.doctor} has been notified about the new appointment request.`,
        variant: "default",
      });
    }, 2000);
    
    setTimeout(() => {
      toast({
        title: "Admin Updated",
        description: "Admin dashboard has been updated with the new appointment request.",
        variant: "default",
      });
    }, 3500);
  };

  const handleCancelAppointment = (id: string) => {
    setMyAppointments(myAppointments.filter(apt => apt.id !== id));
    
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <Button 
          className="inline-flex items-center"
          onClick={() => document.getElementById("book-appointment")?.scrollIntoView({ behavior: "smooth" })}
        >
          <Plus className="mr-2 h-4 w-4" /> Book New Appointment
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid gap-4">
            {myAppointments.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any upcoming appointments.</p>
                  <Button 
                    className="inline-flex items-center"
                    onClick={() => document.getElementById("book-appointment")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Book New Appointment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              myAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden border-l-4 border-l-blue-500">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                      <div className="bg-muted p-6 text-center md:w-48 w-full flex flex-col items-center justify-center">
                        <Calendar className="h-8 w-8 text-primary mb-2" />
                        <p className="font-semibold">{format(appointment.date, "MMM d, yyyy")}</p>
                        <p className="text-muted-foreground">{appointment.time}</p>
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                            <p className="text-muted-foreground text-sm">{appointment.specialty}</p>
                            <p className="mt-2">{appointment.reason}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              appointment.status === "Confirmed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {appointment.status}
                            </span>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleCancelAppointment(appointment.id)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <div className="grid gap-4">
            {pastAppointments.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">You don't have any past appointments.</p>
                </CardContent>
              </Card>
            ) : (
              pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden border-l-4 border-l-gray-400">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                      <div className="bg-muted p-6 text-center md:w-48 w-full flex flex-col items-center justify-center">
                        <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="font-semibold">{format(appointment.date, "MMM d, yyyy")}</p>
                        <p className="text-muted-foreground">{appointment.time}</p>
                      </div>
                      <div className="p-6 flex-1">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                          <p className="text-muted-foreground text-sm">{appointment.specialty}</p>
                          <p className="mt-2">{appointment.reason}</p>
                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-md">
                              <p className="text-sm font-medium">Doctor's Notes:</p>
                              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div id="book-appointment" className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Book a New Appointment</CardTitle>
            <CardDescription>Select a date and available time slot to schedule your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-3">Select Date</h3>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  disabled={(date) => 
                    isBefore(date, startOfToday()) || 
                    isAfter(date, addDays(new Date(), 60)) ||
                    date.getDay() === 0 || 
                    date.getDay() === 6
                  }
                  initialFocus
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Available Time Slots</h3>
                {availableSlots.length === 0 ? (
                  <div className="flex items-center justify-center h-[240px] bg-muted/30 rounded-md">
                    <p className="text-muted-foreground">No time slots available for the selected date.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                    {availableSlots.map((slot, i) => (
                      <button
                        key={i}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.available ? slot : null)}
                        className={`flex justify-between items-center p-3 rounded-md transition-colors ${
                          !slot.available 
                            ? "bg-muted/30 text-muted-foreground cursor-not-allowed" 
                            : selectedSlot?.time === slot.time
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{format(slot.time, "h:mm a")}</span>
                        </div>
                        <div className="text-xs">
                          {slot.available ? (
                            <span>{slot.doctor}</span>
                          ) : (
                            <span>Unavailable</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {selectedSlot && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Appointment Details</h3>
                <div className="bg-muted/50 p-4 rounded-md mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{format(selectedSlot.time, "h:mm a")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Doctor</p>
                      <p className="font-medium">{selectedSlot.doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Specialty</p>
                      <p className="font-medium">{selectedSlot.specialty}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-medium">
                    Reason for Visit
                    <textarea 
                      className="w-full p-3 border rounded-md mt-1 min-h-[100px]"
                      placeholder="Please describe your symptoms or reason for this appointment..."
                      value={appointmentReason}
                      onChange={(e) => setAppointmentReason(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => {
              setSelectedSlot(null);
              setAppointmentReason("");
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookAppointment}
              disabled={!selectedSlot || !appointmentReason.trim()}
            >
              Book Appointment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PatientAppointments;
