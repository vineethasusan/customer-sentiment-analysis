
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, TrendingDown, BarChart2, LineChart as LineChartIcon, Activity } from "lucide-react";

// Mock data for time series forecasting
const forecastData = [
  { date: "2025-01", actual: 45, forecast: null },
  { date: "2025-02", actual: 52, forecast: null },
  { date: "2025-03", actual: 49, forecast: null },
  { date: "2025-04", actual: 63, forecast: null },
  { date: "2025-05", actual: 58, forecast: null },
  { date: "2025-06", actual: 64, forecast: null },
  { date: "2025-07", actual: 73, forecast: null },
  { date: "2025-08", actual: 78, forecast: null },
  { date: "2025-09", actual: 82, forecast: null },
  { date: "2025-10", actual: 79, forecast: null },
  { date: "2025-11", actual: 85, forecast: null },
  { date: "2025-12", actual: 89, forecast: null },
  { date: "2026-01", actual: null, forecast: 92 },
  { date: "2026-02", actual: null, forecast: 96 },
  { date: "2026-03", actual: null, forecast: 94 },
  { date: "2026-04", actual: null, forecast: 98 },
  { date: "2026-05", actual: null, forecast: 102 },
  { date: "2026-06", actual: null, forecast: 105 },
];

const modelPerformance = [
  { model: "ARIMA", accuracy: 92, trainingTime: 2.3, complexity: "Medium" },
  { model: "Prophet", accuracy: 94, trainingTime: 3.5, complexity: "Low" },
  { model: "LSTM", accuracy: 96, trainingTime: 8.7, complexity: "High" },
  { model: "XGBoost", accuracy: 91, trainingTime: 1.8, complexity: "Medium" },
];

const seasonalPatterns = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 47 },
  { month: "Mar", value: 53 },
  { month: "Apr", value: 58 },
  { month: "May", value: 62 },
  { month: "Jun", value: 68 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 78 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 68 },
  { month: "Nov", value: 58 },
  { month: "Dec", value: 48 },
];

const anomalies = [
  { date: "2025-03-15", expected: 51, actual: 32, impact: "high" },
  { date: "2025-06-22", expected: 65, actual: 85, impact: "medium" },
  { date: "2025-09-05", expected: 77, actual: 95, impact: "low" },
  { date: "2025-11-30", expected: 82, actual: 68, impact: "medium" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("forecasts");
  const [animatedForecastData, setAnimatedForecastData] = useState(
    forecastData.map((item) => ({ ...item, actual: 0, forecast: 0 }))
  );

  useEffect(() => {
    // Animate data on load
    const timer = setTimeout(() => {
      setAnimatedForecastData(forecastData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getImpactBadge = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            High Impact
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Medium Impact
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Low Impact
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forecasting Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor predictions, model performance, and detect anomalies
          </p>
        </div>
        
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full lg:w-auto mt-4 lg:mt-0"
        >
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="forecasts" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Forecasts</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Models</span>
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Anomalies</span>
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="forecasts" className="mt-0 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="animate-fade-in" style={{ "--index": "0" } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Forecast Accuracy
                    </CardTitle>
                    <CardDescription>Overall prediction quality</CardDescription>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-700" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">2.3%</span> 
                    <span>from last quarter</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "1" } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Mean Absolute Error
                    </CardTitle>
                    <CardDescription>Average prediction error</CardDescription>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-1 bg-blue-700 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.7</div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <ArrowUpRight className="w-3 h-3 text-green-600 rotate-180" />
                    <span className="text-green-600 font-medium">0.5</span> 
                    <span>lower than previous model</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "2" } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Forecast Horizon
                    </CardTitle>
                    <CardDescription>Future prediction range</CardDescription>
                  </div>
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-purple-700" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6 Months</div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <span>Next prediction: July 2026</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="animate-fade-in col-span-1" style={{ "--index": "3" } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Time Series Forecast</CardTitle>
                  <CardDescription>
                    Historical data with future predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={animatedForecastData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Historical Data"
                        />
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          stroke="#10b981"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 4 }}
                          name="Forecast"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in" style={{ "--index": "4" } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>
                    Monthly patterns detected in the data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={seasonalPatterns}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                          name="Seasonal Value"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "5" } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Growth Trends</CardTitle>
                  <CardDescription>
                    Year-over-year growth analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { quarter: "Q1", growth: 12 },
                          { quarter: "Q2", growth: 18 },
                          { quarter: "Q3", growth: 15 },
                          { quarter: "Q4", growth: 22 },
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                        <XAxis dataKey="quarter" />
                        <YAxis unit="%" />
                        <Tooltip formatter={(value) => [`${value}%`, "Growth"]} />
                        <Bar dataKey="growth" fill="#10b981" radius={[4, 4, 0, 0]} name="YoY Growth" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="mt-0 space-y-6">
            {/* Models Content */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
                <CardDescription>
                  Accuracy and training metrics for different forecasting models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={modelPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="model" />
                      <YAxis domain={[85, 100]} unit="%" />
                      <Tooltip formatter={(value, name) => {
                        if (name === "accuracy") return [`${value}%`, "Accuracy"];
                        return [value, name];
                      }} />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Best Performing Model</CardTitle>
                  <CardDescription>
                    Detailed metrics for LSTM model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <div className="text-blue-700 text-xl font-bold">LSTM</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Long Short-Term Memory</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        96% Accuracy
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Deep Learning
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      This neural network model excels at capturing long-term dependencies in time series data,
                      making it ideal for complex forecasting tasks.
                    </p>
                    <Button variant="outline" size="sm">
                      View Model Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Training Information</CardTitle>
                  <CardDescription>
                    Model training parameters and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modelPerformance.map((model, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                        <div className="w-2 bg-blue-500 h-full rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{model.model}</span>
                            <Badge className={`bg-${model.complexity === "High" ? "amber" : model.complexity === "Medium" ? "blue" : "green"}-100 text-${model.complexity === "High" ? "amber" : model.complexity === "Medium" ? "blue" : "green"}-800`}>
                              {model.complexity} Complexity
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-muted-foreground">Accuracy: {model.accuracy}%</span>
                            <span className="text-muted-foreground">Training: {model.trainingTime}s</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="mt-0 space-y-6">
            {/* Anomalies Content */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
                <CardDescription>
                  Significant deviations from expected patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={anomalies}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="expected"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Expected Value"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Actual Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Detected Anomalies</CardTitle>
                  <CardDescription>
                    Unusual patterns requiring investigation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {anomalies.map((anomaly, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                        <div className={`w-2 bg-${anomaly.impact === "high" ? "red" : anomaly.impact === "medium" ? "amber" : "green"}-500 h-full rounded-full`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Anomaly on {anomaly.date}</span>
                            {getImpactBadge(anomaly.impact)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Expected value: {anomaly.expected}, Actual value: {anomaly.actual}
                            <span className="ml-2 font-medium">
                              ({anomaly.actual > anomaly.expected ? "+" : ""}{((anomaly.actual - anomaly.expected) / anomaly.expected * 100).toFixed(1)}%)
                            </span>
                          </p>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
