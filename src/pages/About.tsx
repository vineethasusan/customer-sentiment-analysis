
import { motion } from "framer-motion";
import { Shield, Users, Lock, Globe, Award, FileCheck, Building, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
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

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Privacy Officer",
      description: "With 15+ years in data security, Sarah leads our privacy initiatives and compliance strategies.",
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      name: "Michael Chen",
      role: "Head of Professional Network",
      description: "Michael oversees our global network of mentors, officials, and practitioners to ensure quality.",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      name: "Elena Rodriguez",
      role: "Technology Director",
      description: "Elena architects our secure infrastructure, focusing on end-to-end encryption and user anonymity.",
      icon: <Lock className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-20"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          variants={fadeIn}
        >
          About <span className="text-primary">SecureConnect</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          variants={fadeIn}
        >
          Founded on the principles of privacy, security, and accessibility, SecureConnect is revolutionizing how people connect with professionals for guidance and support.
        </motion.p>
        <motion.div 
          className="w-24 h-1 bg-primary mx-auto mb-8"
          variants={fadeIn}
        ></motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="grid md:grid-cols-2 gap-12 mb-24 items-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn}>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We believe that everyone deserves access to quality professional guidance without sacrificing their privacy. Our mission is to create a secure platform where users can connect anonymously with verified professionals from around the world.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you're seeking career mentorship, legal advice, or mental health support, SecureConnect provides the tools and technology to facilitate these connections with privacy at the core.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">End-to-End Encryption</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Global Access</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Certified Professionals</span>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="relative rounded-lg overflow-hidden h-80 bg-gradient-to-r from-primary/20 to-blue-100"
          variants={fadeIn}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="h-32 w-32 text-primary/40" />
          </div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="mb-24"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the experts behind SecureConnect who are passionate about privacy and professional connections.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {member.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-4">{member.role}</p>
              <p className="text-muted-foreground">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="mb-24"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide every decision we make at SecureConnect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <Lock className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              We prioritize user privacy in everything we build, ensuring complete anonymity when desired.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <Globe className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-muted-foreground">
              We remove geographic barriers to professional guidance with our worldwide network.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <Award className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">
              We verify all professionals on our platform to ensure users receive expert guidance.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <FileCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Compliance</h3>
            <p className="text-muted-foreground">
              We adhere to global privacy standards including GDPR and HIPAA regulations.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Industries Section */}
      <motion.section 
        className="mb-24"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SecureConnect provides privacy-focused consultation across multiple professional domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <Building className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Business & Career</h3>
            <p className="text-muted-foreground mb-4">
              Professional mentorship, career coaching, and business consultations.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/secure-connect">Learn More</Link>
            </Button>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <FileCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Legal & Official</h3>
            <p className="text-muted-foreground mb-4">
              Legal advice, financial guidance, and government service navigation.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/secure-connect">Learn More</Link>
            </Button>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <HeartPulse className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health & Wellness</h3>
            <p className="text-muted-foreground mb-4">
              Medical consultations, therapy sessions, and wellness coaching.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/secure-connect">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-primary/5 rounded-2xl p-8 text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-3xl font-bold mb-4"
          variants={fadeIn}
        >
          Ready to Connect Securely?
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
          variants={fadeIn}
        >
          Join thousands of users who trust SecureConnect for private professional guidance.
        </motion.p>
        <motion.div variants={fadeIn}>
          <Button size="lg" asChild>
            <Link to="/secure-connect">Get Started</Link>
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;
