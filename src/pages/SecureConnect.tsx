
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Globe, Video, MessageSquare, CreditCard, Lock, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const SecureConnect = () => {
  const [activeTab, setActiveTab] = useState<"mentors" | "officials" | "medical">("mentors");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Privacy Banner */}
      <Alert className="mb-8 border-blue-100 bg-blue-50">
        <Lock className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <span className="font-medium">Privacy Assured:</span> All consultations are anonymous and encrypted end-to-end.
        </AlertDescription>
      </Alert>

      {/* Hero Section */}
      <motion.section
        className="text-center mb-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="mb-6">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1">
            Privacy-First Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Connect <span className="text-primary">Securely</span>. <br />
            Get Expert Guidance.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Anonymous consultations with verified professionals from around the world.
          </p>
        </motion.div>

        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="rounded-full">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Browse Professionals
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="mb-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-10">
          How SecureConnect Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy Guaranteed</h3>
            <p className="text-muted-foreground">
              Remain anonymous with end-to-end encrypted consultations and secure messaging.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-muted-foreground">
              Connect with professionals from around the world, filtered by location and language.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
            <p className="text-muted-foreground">
              Choose video calls, live chat, or messaging based on your comfort and needs.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Professional Categories */}
      <motion.section
        className="mb-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-10">
          Professional Categories
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === "mentors" ? "default" : "outline"}
            onClick={() => setActiveTab("mentors")}
            className="rounded-full"
          >
            Mentors & Career Coaches
          </Button>
          <Button 
            variant={activeTab === "officials" ? "default" : "outline"}
            onClick={() => setActiveTab("officials")}
            className="rounded-full"
          >
            Officials & Legal Experts
          </Button>
          <Button 
            variant={activeTab === "medical" ? "default" : "outline"}
            onClick={() => setActiveTab("medical")}
            className="rounded-full"
          >
            Medical Practitioners
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === "mentors" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Mentors & Career Coaches</h3>
              <p className="text-muted-foreground">
                Get guidance on career development, skill acquisition, and professional growth from experienced mentors and coaches.
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li>Career transition guidance</li>
                <li>Resume and interview preparation</li>
                <li>Leadership development</li>
                <li>Technical skill mentorship</li>
              </ul>
            </div>
          )}

          {activeTab === "officials" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Officials & Legal Experts</h3>
              <p className="text-muted-foreground">
                Consult with legal professionals, financial advisors, and government representatives on sensitive matters.
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li>Legal consultation and advice</li>
                <li>Financial planning and guidance</li>
                <li>Tax assistance and compliance</li>
                <li>Government program navigation</li>
              </ul>
            </div>
          )}

          {activeTab === "medical" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Medical Practitioners</h3>
              <p className="text-muted-foreground">
                Connect with doctors, therapists, and counselors for healthcare guidance and mental wellness support.
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li>Mental health counseling</li>
                <li>General medical consultation</li>
                <li>Specialized healthcare advice</li>
                <li>Wellness and preventive care</li>
              </ul>
            </div>
          )}
        </div>
      </motion.section>

      {/* Trust & Security */}
      <motion.section
        className="mb-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-10">
          Trust & Security
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-xl font-semibold">Privacy Certification</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Our platform complies with global privacy standards including GDPR and HIPAA to ensure your information remains secure.
            </p>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Certified Secure
            </Badge>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-amber-500 mr-2" />
              <h3 className="text-xl font-semibold">Verified Professionals</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              All professionals on our platform are thoroughly vetted and verified to ensure you receive guidance from qualified experts.
            </p>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              100% Verified
            </Badge>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center py-16 px-4 bg-primary/5 rounded-2xl"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">
          Ready to Connect Securely?
        </motion.h2>
        <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of users who trust SecureConnect for private professional guidance.
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="rounded-full">
            Create an Account
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Learn More
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default SecureConnect;
