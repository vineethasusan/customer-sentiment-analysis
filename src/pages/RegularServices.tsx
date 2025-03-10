
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, Activity, Sun, Users, Video, MessageSquare, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for available services
const freeServices = [
  {
    id: "fs1",
    title: "Beginner Yoga Session",
    description: "Introduction to basic yoga poses and breathing techniques",
    schedule: "Daily, 8:00 AM - 9:00 AM",
    instructor: "Anita Patel",
    category: "Yoga",
    participants: 18,
    icon: Activity,
  },
  {
    id: "fs2",
    title: "Ayurvedic Wellness Talk",
    description: "Learn about natural health practices from Ayurvedic traditions",
    schedule: "Tuesday & Thursday, 6:00 PM - 7:00 PM",
    instructor: "Dr. Rahul Sharma",
    category: "Ayush",
    participants: 42,
    icon: Sun,
  },
  {
    id: "fs3",
    title: "Meditation for Beginners",
    description: "Simple meditation techniques for stress reduction",
    schedule: "Monday, Wednesday, Friday, 7:30 AM - 8:00 AM",
    instructor: "Sarah Williams",
    category: "Wellness",
    participants: 24,
    icon: Heart,
  },
  {
    id: "fs4",
    title: "Nutrition Basics",
    description: "Essential nutrition knowledge for a balanced diet",
    schedule: "Saturday, 10:00 AM - 11:00 AM",
    instructor: "Dr. Michael Chen",
    category: "Health",
    participants: 31,
    icon: Sun,
  },
];

const paidWorkshops = [
  {
    id: "pw1",
    title: "Advanced Yoga Workshop",
    description: "Deep dive into advanced yoga poses and techniques",
    schedule: "Saturday, 10:00 AM - 12:00 PM",
    instructor: "Maya Rodriguez",
    category: "Yoga",
    price: 25,
    duration: "2 hours",
    icon: Activity,
  },
  {
    id: "pw2",
    title: "Ayurvedic Cooking Class",
    description: "Learn to prepare nutritious meals using Ayurvedic principles",
    schedule: "Sunday, 4:00 PM - 6:00 PM",
    instructor: "Priya Kapoor",
    category: "Ayush",
    price: 35,
    duration: "2 hours",
    icon: Sun,
  },
  {
    id: "pw3",
    title: "Mindfulness Retreat",
    description: "A comprehensive session on mindfulness and meditation",
    schedule: "Last Sunday of month, 9:00 AM - 1:00 PM",
    instructor: "John Davis",
    category: "Wellness",
    price: 45,
    duration: "4 hours",
    icon: Heart,
  },
];

const professionalTalks = [
  {
    id: "pt1",
    title: "Mental Health in the Digital Age",
    description: "Expert discussion on maintaining mental health while using technology",
    speaker: "Dr. Elizabeth Cooper",
    date: "June 15, 2023",
    time: "7:00 PM - 8:30 PM",
    price: 15,
    format: "Live Webinar",
    icon: Video,
  },
  {
    id: "pt2",
    title: "Career Transitions: Finding Your Path",
    description: "Strategies for successful career changes and professional growth",
    speaker: "Robert Johnson, Career Coach",
    date: "June 22, 2023",
    time: "6:00 PM - 7:30 PM",
    price: 20,
    format: "Live Webinar",
    icon: Video,
  },
  {
    id: "pt3",
    title: "Financial Wellness for Professionals",
    description: "Essential financial planning advice for career-focused individuals",
    speaker: "Maria Gonzalez, Financial Advisor",
    date: "June 29, 2023",
    time: "7:00 PM - 8:30 PM",
    price: 25,
    format: "Live Webinar",
    icon: Video,
  },
];

const RegularServices = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("free");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div 
        className="mb-8 text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Regular Services & Sessions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our free ongoing sessions, paid workshops, and professional talks
        </p>
      </motion.div>

      <Tabs 
        defaultValue="free" 
        className="space-y-6"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="free">Free Sessions</TabsTrigger>
          <TabsTrigger value="workshops">Paid Workshops</TabsTrigger>
          <TabsTrigger value="talks">Professional Talks</TabsTrigger>
        </TabsList>
        
        {/* Free Sessions Tab */}
        <TabsContent value="free" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{service.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{service.participants} participants</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{service.category} • Instructor: {service.instructor}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedService(service)} 
                        className="w-full"
                      >
                        Join Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Session Details</DialogTitle>
                        <DialogDescription>
                          Free ongoing session open to all members
                        </DialogDescription>
                      </DialogHeader>
                      {selectedService && selectedTab === "free" && (
                        <div className="space-y-4 my-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                              <selectedService.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{selectedService.title}</h3>
                              <p className="text-muted-foreground">{selectedService.category}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mt-4">
                            <p>{selectedService.description}</p>
                            
                            <div className="bg-muted p-4 rounded-md space-y-2">
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{selectedService.schedule}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Currently {selectedService.participants} regular participants</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Instructor: {selectedService.instructor}</span>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <p className="text-sm text-muted-foreground mb-4">
                                This is a free ongoing session available to all members. 
                                No registration required, just join at the scheduled time.
                              </p>
                              <div className="flex justify-end gap-3">
                                <Button>Join Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Paid Workshops Tab */}
        <TabsContent value="workshops" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidWorkshops.map((workshop) => (
              <Card key={workshop.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                    <workshop.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{workshop.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{workshop.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{workshop.category} • Instructor: {workshop.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <CreditCard className="mr-2 h-4 w-4 text-primary" />
                    <span>${workshop.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedService(workshop)} 
                        className="w-full"
                      >
                        Book Workshop
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Workshop Details</DialogTitle>
                        <DialogDescription>
                          Premium workshop with expert instruction
                        </DialogDescription>
                      </DialogHeader>
                      {selectedService && selectedTab === "workshops" && (
                        <div className="space-y-4 my-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                              <selectedService.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{selectedService.title}</h3>
                              <p className="text-muted-foreground">{selectedService.category}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mt-4">
                            <p>{selectedService.description}</p>
                            
                            <div className="bg-muted p-4 rounded-md space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{selectedService.schedule}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Duration: {selectedService.duration}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Instructor: {selectedService.instructor}</span>
                              </div>
                              <div className="flex items-center text-sm font-medium">
                                <CreditCard className="mr-2 h-4 w-4 text-primary" />
                                <span>Price: ${selectedService.price}</span>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <p className="text-sm text-muted-foreground mb-4">
                                This is a premium workshop with limited seats. 
                                Reserve your spot now by completing the booking process.
                              </p>
                              <div className="flex justify-end gap-3">
                                <Button variant="outline">Add to Calendar</Button>
                                <Button>Book Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Professional Talks Tab */}
        <TabsContent value="talks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professionalTalks.map((talk) => (
              <Card key={talk.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                    <talk.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{talk.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{talk.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{talk.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{talk.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{talk.format}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <CreditCard className="mr-2 h-4 w-4 text-primary" />
                    <span>${talk.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedService(talk)} 
                        className="w-full"
                      >
                        Book Talk
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Professional Talk Details</DialogTitle>
                        <DialogDescription>
                          Expert knowledge and insights
                        </DialogDescription>
                      </DialogHeader>
                      {selectedService && selectedTab === "talks" && (
                        <div className="space-y-4 my-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                              <selectedService.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{selectedService.title}</h3>
                              <p className="text-muted-foreground">{selectedService.format}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mt-4">
                            <p>{selectedService.description}</p>
                            
                            <div className="bg-muted p-4 rounded-md space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{selectedService.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{selectedService.time}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Speaker: {selectedService.speaker}</span>
                              </div>
                              <div className="flex items-center text-sm font-medium">
                                <CreditCard className="mr-2 h-4 w-4 text-primary" />
                                <span>Price: ${selectedService.price}</span>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <p className="text-sm text-muted-foreground mb-4">
                                This is a professional talk with limited seating. 
                                Secure your access by completing the registration.
                              </p>
                              <div className="flex justify-end gap-3">
                                <Button variant="outline">Add to Calendar</Button>
                                <Button>Register Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegularServices;
