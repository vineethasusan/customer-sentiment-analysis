
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Users, Shield, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Index = () => {
  const features = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Private & Anonymous",
      description: "End-to-end encryption with option to remain anonymous during consultations."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Professional Network",
      description: "Connect with verified mentors, officials, and medical practitioners globally."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Security Assured",
      description: "GDPR & HIPAA compliant platform with strict privacy certifications."
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Multiple Formats",
      description: "Choose between video calls, live chat, or messaging for your consultations."
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              SecureConnect: <span className="text-primary">Privacy-Focused</span> Consultations
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Connect anonymously with mentors, officials, and medical practitioners for guidance and support, with privacy at the core of every interaction.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link to="/secure-connect">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 left-[15%] w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Privacy-First Professional Consultations</h2>
            <p className="text-lg text-muted-foreground">
              Our platform ensures your privacy while connecting you with the professionals you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Connect With Professionals</h2>
            <p className="text-lg text-muted-foreground">
              Find the right expert for your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" /> Mentors & Coaches
                </h3>
                <p className="text-muted-foreground mb-4">
                  Career guidance, personal development, and professional mentorship from industry experts.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/secure-connect">Find a Mentor</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" /> Officials
                </h3>
                <p className="text-muted-foreground mb-4">
                  Legal advisors, financial consultants, and government representatives for official guidance.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/secure-connect">Consult an Official</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Video className="mr-2 h-5 w-5 text-primary" /> Medical Practitioners
                </h3>
                <p className="text-muted-foreground mb-4">
                  Doctors, therapists, and counselors for health consultations and mental wellness support.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/secure-connect">Book a Practitioner</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready for Private Consultations?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join SecureConnect today and connect with professionals while maintaining your privacy.
            </p>
            <Button size="lg" asChild>
              <Link to="/secure-connect">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
