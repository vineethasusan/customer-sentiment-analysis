
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, TrendingDown, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";

// Mock Data
const sentimentData = [
  { name: "Positive", value: 65, color: "#34D399" },
  { name: "Neutral", value: 20, color: "#60A5FA" },
  { name: "Negative", value: 15, color: "#F87171" },
];

const trendsData = [
  { month: "Jan", positive: 54, neutral: 22, negative: 24 },
  { month: "Feb", positive: 58, neutral: 21, negative: 21 },
  { month: "Mar", positive: 61, neutral: 19, negative: 20 },
  { month: "Apr", positive: 57, neutral: 23, negative: 20 },
  { month: "May", positive: 63, neutral: 21, negative: 16 },
  { month: "Jun", positive: 65, neutral: 20, negative: 15 },
];

const keywordsData = [
  { keyword: "Quality", count: 87, sentiment: "positive" },
  { keyword: "Delivery", count: 65, sentiment: "positive" },
  { keyword: "Price", count: 54, sentiment: "negative" },
  { keyword: "Customer Service", count: 76, sentiment: "positive" },
  { keyword: "Packaging", count: 43, sentiment: "neutral" },
  { keyword: "Durability", count: 38, sentiment: "negative" },
];

const recentReviews = [
  {
    id: 1,
    text: "The product quality exceeded my expectations. Will definitely purchase again!",
    sentiment: "positive",
    date: "2023-06-10",
    score: 0.92,
  },
  {
    id: 2,
    text: "Delivery was on time, but the packaging could be improved.",
    sentiment: "neutral",
    date: "2023-06-09",
    score: 0.51,
  },
  {
    id: 3,
    text: "Customer service was excellent when I had an issue with my order.",
    sentiment: "positive",
    date: "2023-06-08",
    score: 0.87,
  },
  {
    id: 4,
    text: "The price is too high for the quality received. Disappointed.",
    sentiment: "negative",
    date: "2023-06-07",
    score: 0.21,
  },
];

const productPerformance = [
  { product: "Product A", positive: 78, neutral: 15, negative: 7 },
  { product: "Product B", positive: 62, neutral: 23, negative: 15 },
  { product: "Product C", positive: 45, neutral: 30, negative: 25 },
  { product: "Product D", positive: 85, neutral: 10, negative: 5 },
];

const Dashboard = () => {
  const [animatedData, setAnimatedData] = useState(
    sentimentData.map((item) => ({ ...item, value: 0 }))
  );
  
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Animate data on load
    const timer = setTimeout(() => {
      setAnimatedData(sentimentData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "#34D399";
      case "neutral":
        return "#60A5FA";
      case "negative":
        return "#F87171";
      default:
        return "#60A5FA";
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Positive
          </Badge>
        );
      case "neutral":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Neutral
          </Badge>
        );
      case "negative":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Negative
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
          <h1 className="text-3xl font-bold tracking-tight">Sentiment Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Analyze customer review sentiment and discover trends
          </p>
        </div>
        
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full lg:w-auto mt-4 lg:mt-0"
        >
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="overview" className="mt-0 space-y-6">
            {/* Overview Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="animate-fade-in" style={{ "--index": "0" } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Positive Sentiment
                    </CardTitle>
                    <CardDescription>Overall customer satisfaction</CardDescription>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-700" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{animatedData[0]?.value}%</div>
                  <Progress
                    value={animatedData[0]?.value}
                    className="h-2 mt-2"
                    indicatorClassName="bg-sentiment-positive"
                  />
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">4%</span> 
                    <span>from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "1" } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Neutral Sentiment
                    </CardTitle>
                    <CardDescription>Mixed customer feedback</CardDescription>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-1 bg-blue-700 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{animatedData[1]?.value}%</div>
                  <Progress
                    value={animatedData[1]?.value}
                    className="h-2 mt-2"
                    indicatorClassName="bg-sentiment-neutral"
                  />
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <span>No significant change</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "2" } as React.CSSProperties}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Negative Sentiment
                    </CardTitle>
                    <CardDescription>Customer dissatisfaction</CardDescription>
                  </div>
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-700" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{animatedData[2]?.value}%</div>
                  <Progress
                    value={animatedData[2]?.value}
                    className="h-2 mt-2"
                    indicatorClassName="bg-sentiment-negative"
                  />
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <ArrowUpRight className="w-3 h-3 text-red-600 rotate-180" />
                    <span className="text-green-600 font-medium">3%</span> 
                    <span>decrease from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in col-span-1 md:col-span-2" style={{ "--index": "3" } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                  <CardDescription>
                    Overall sentiment breakdown of customer reviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={animatedData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                          animationBegin={0}
                          animationDuration={1500}
                        >
                          {animatedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "4" } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Top Keywords</CardTitle>
                  <CardDescription>
                    Most frequently mentioned terms in reviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keywordsData.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{keyword.keyword}</span>
                          {getSentimentBadge(keyword.sentiment)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {keyword.count} mentions
                          </span>
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getSentimentColor(keyword.sentiment) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ "--index": "5" } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>
                    Latest customer feedback with sentiment analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="p-3 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          {getSentimentBadge(review.sentiment)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{review.text}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Sentiment Score:
                          </span>
                          <Progress
                            value={review.score * 100}
                            className="h-1.5 w-24"
                            indicatorClassName={`bg-${
                              review.sentiment === "positive"
                                ? "sentiment-positive"
                                : review.sentiment === "neutral"
                                ? "sentiment-neutral"
                                : "sentiment-negative"
                            }`}
                          />
                          <span className="text-xs font-medium">
                            {(review.score * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0 space-y-6">
            {/* Trends Content */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Sentiment Trends Over Time</CardTitle>
                <CardDescription>
                  Monthly sentiment breakdown showing positive, neutral, and negative trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="positive"
                        stroke="#34D399"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Positive"
                      />
                      <Line
                        type="monotone"
                        dataKey="neutral"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        name="Neutral"
                      />
                      <Line
                        type="monotone"
                        dataKey="negative"
                        stroke="#F87171"
                        strokeWidth={2}
                        name="Negative"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Sentiment Velocity</CardTitle>
                  <CardDescription>
                    Rate of change in sentiment metrics over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Positive Growth</span>
                        <span className="text-green-600 text-sm">+7.4%</span>
                      </div>
                      <Progress
                        value={74}
                        className="h-2"
                        indicatorClassName="bg-sentiment-positive"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Neutral Change</span>
                        <span className="text-blue-600 text-sm">-2.1%</span>
                      </div>
                      <Progress
                        value={21}
                        className="h-2"
                        indicatorClassName="bg-sentiment-neutral"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Negative Reduction</span>
                        <span className="text-green-600 text-sm">-5.3%</span>
                      </div>
                      <Progress
                        value={53}
                        className="h-2"
                        indicatorClassName="bg-sentiment-negative"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Key Events</CardTitle>
                  <CardDescription>
                    Notable events that influenced customer sentiment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="w-2 bg-green-500 h-full rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Product Update</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Positive Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Major feature update in April led to 8% increase in positive reviews
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="w-2 bg-red-500 h-full rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Shipping Delays</span>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            Negative Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Logistical issues in February caused temporary spike in negative reviews
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="w-2 bg-green-500 h-full rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Customer Service Improvement</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Positive Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          New support team training in May improved response times and satisfaction
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-0 space-y-6">
            {/* Products Content */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Product Performance Comparison</CardTitle>
                <CardDescription>
                  Sentiment analysis across different products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontalPoints={[0, 100]} opacity={0.2} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="product" width={100} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="positive" stackId="a" fill="#34D399" name="Positive" />
                      <Bar dataKey="neutral" stackId="a" fill="#60A5FA" name="Neutral" />
                      <Bar dataKey="negative" stackId="a" fill="#F87171" name="Negative" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Top Performing Product</CardTitle>
                  <CardDescription>
                    Product with the highest positive sentiment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <div className="text-green-700 text-2xl font-bold">D</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Product D</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        85% Positive
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        10% Neutral
                      </Badge>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        5% Negative
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Product D receives consistently excellent reviews for quality, durability, and customer support.
                    </p>
                    <Button variant="outline" size="sm">
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Improvement Opportunity</CardTitle>
                  <CardDescription>
                    Product with the most potential for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <div className="text-amber-700 text-2xl font-bold">C</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Product C</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        45% Positive
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        30% Neutral
                      </Badge>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        25% Negative
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Product C has the highest negative sentiment rate. Key issues include pricing concerns and durability problems.
                    </p>
                    <Button variant="outline" size="sm">
                      View Improvement Plan
                    </Button>
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
