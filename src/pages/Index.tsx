
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Database, LineChart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Index = () => {
  const features = [
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Easy Data Upload",
      description: "Upload CSV, Excel files or connect to APIs to import your time series data."
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Advanced Forecasting",
      description: "Leverage AI models like ARIMA, Prophet, LSTM and XGBoost for accurate predictions."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Interactive Visualizations",
      description: "Explore data with interactive charts and customize dashboards to your needs."
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Industry Templates",
      description: "Access pre-built templates for retail, finance, healthcare, and manufacturing."
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
              PredictAI: <span className="text-primary">Time Series Analytics</span> for Forecasting
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Advanced AI-powered forecasting to predict trends and drive data-driven decision making for your business.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link to="/analyzer">Try It Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
            <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Features for Accurate Forecasting</h2>
            <p className="text-lg text-muted-foreground">
              Our platform provides the tools you need to analyze historical data and predict future trends with confidence.
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Forecasting?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start analyzing your time series data and get accurate predictions in minutes.
            </p>
            <Button size="lg" asChild>
              <Link to="/analyzer">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
