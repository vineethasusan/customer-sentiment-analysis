
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, MessageCircle, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          entry.target.classList.remove("opacity-0");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        animatedElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6 animate-fade-in">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium mb-4">
                  E-Commerce Analytics
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
                  Turn Customer Reviews Into 
                  <span className="text-primary block md:inline"> Actionable Insights</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
                  Unlock the power of sentiment analysis to understand customer feedback, identify trends, and make data-driven decisions that improve products and boost satisfaction.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button asChild size="lg" className="rounded-full gap-1">
                  <Link to="/dashboard">
                    Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/analyzer">
                    Try Analyzer
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative card-glass rounded-2xl overflow-hidden shadow-elevated">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 z-0" />
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto rounded-2xl z-10 relative" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-64 w-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 h-64 w-64 bg-purple-400/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">
              Key Features
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
              Understand Customer Sentiment Like Never Before
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced NLP technology helps you analyze customer reviews and extract valuable insights to improve products and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card-glass p-8 animate-on-scroll opacity-0" style={{"--index": "0"} as React.CSSProperties}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sentiment Classification</h3>
              <p className="text-gray-600">
                Automatically classify reviews as positive, negative, or neutral using sophisticated NLP algorithms.
              </p>
            </div>
            
            <div className="card-glass p-8 animate-on-scroll opacity-0" style={{"--index": "1"} as React.CSSProperties}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Analytics</h3>
              <p className="text-gray-600">
                Visualize sentiment trends and patterns with intuitive charts and interactive dashboards.
              </p>
            </div>
            
            <div className="card-glass p-8 animate-on-scroll opacity-0" style={{"--index": "2"} as React.CSSProperties}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trend Identification</h3>
              <p className="text-gray-600">
                Identify emerging trends and common themes in customer feedback to make proactive improvements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start Analyzing Customer Sentiment Today
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload your e-commerce reviews or try our analyzer with sample data to discover valuable insights that can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/analyzer">
                  Try Real-time Analysis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
