
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, BarChart2, Lightbulb, Table, Bot, TrendingUp, Calendar, LineChart, Activity } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight mb-2">About PredictAI</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Transforming time series data into actionable business insights through advanced forecasting analysis
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="mb-12 overflow-hidden card-glass">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Our Mission
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4">Turning Data into Foresight</h2>
                  <p className="text-gray-600 mb-6">
                    PredictAI is dedicated to helping businesses understand future trends through advanced time series analysis and forecasting algorithms.
                  </p>
                  <p className="text-gray-600">
                    We transform historical data into clear, actionable predictions that drive strategic planning, optimize operations, and boost business growth.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                  <div className="max-w-xs text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-subtle">
                      <LineChart className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Data-Driven Predictions</h3>
                    <p className="text-sm text-gray-600">
                      Move beyond guesswork with AI-powered time series analysis that reveals what your future metrics will look like.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="card-glass">
              <CardContent className="pt-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Table className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. Data Collection</h3>
                <p className="text-sm text-gray-600">
                  Upload your time series data in CSV format, with a date column and at least one numeric value column.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-glass">
              <CardContent className="pt-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  Our advanced algorithms process the data to identify patterns, seasonality, and trends.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-glass">
              <CardContent className="pt-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. Forecast Generation</h3>
                <p className="text-sm text-gray-600">
                  View organized, visual predictions that highlight future trends and potential opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
            <div className="flex gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Temporal Pattern Detection</h3>
                <p className="text-sm text-gray-600">
                  Automatically identify seasonal patterns, cycles, and anomalies in your time series data.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Trend Analysis</h3>
                <p className="text-sm text-gray-600">
                  Track long-term trends and forecast future values with confidence intervals.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Anomaly Detection</h3>
                <p className="text-sm text-gray-600">
                  Identify outliers and anomalies that might represent opportunities or threats.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Visual Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Intuitive charts and graphs that make complex time series data easy to understand.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6">Technical Approach</h2>
          <Card className="card-glass mb-12">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Data Preprocessing</h3>
                  <p className="text-sm text-gray-600">
                    We clean and normalize time series data, handling missing values, resampling, and feature engineering before processing.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Time Series Models</h3>
                  <p className="text-sm text-gray-600">
                    Our system employs statistical models (ARIMA, Exponential Smoothing) and machine learning approaches (Prophet, LSTM) for forecasting.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Forecasting Algorithms</h3>
                  <p className="text-sm text-gray-600">
                    We use a combination of classical statistical methods and deep learning models to generate accurate predictions with confidence intervals.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Data Visualization</h3>
                  <p className="text-sm text-gray-600">
                    Interactive charts and dashboards built with modern visualization libraries help translate complex time series data into clear insights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Ready to forecast your future metrics?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-0">
              Start analyzing your time series data today and discover predictions that can transform your business planning.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
