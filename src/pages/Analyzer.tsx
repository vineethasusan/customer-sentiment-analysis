
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { 
  Download, Filter, RefreshCcw, Search, 
  Calendar, ArrowUpRight, TrendingUp, TrendingDown,
  Globe, Zap, Users, Activity, ChevronDown
} from "lucide-react";

const Analyzer = () => {
  const [activeTab, setActiveTab] = useState("privacy");
  const [dateRange, setDateRange] = useState("lastMonth");
  const [region, setRegion] = useState("global");

  // Mock data for privacy metrics
  const privacyMetricsData = [
    { month: "Jan", anonymousRate: 65, encryptionCoverage: 98, privacySatisfaction: 89 },
    { month: "Feb", anonymousRate: 70, encryptionCoverage: 99, privacySatisfaction: 91 },
    { month: "Mar", anonymousRate: 72, encryptionCoverage: 99, privacySatisfaction: 92 },
    { month: "Apr", anonymousRate: 75, encryptionCoverage: 100, privacySatisfaction: 94 },
    { month: "May", anonymousRate: 78, encryptionCoverage: 100, privacySatisfaction: 95 },
    { month: "Jun", anonymousRate: 80, encryptionCoverage: 100, privacySatisfaction: 96 },
  ];

  // Mock data for professional categories
  const categoryData = [
    { name: "Mentors", value: 42 },
    { name: "Officials", value: 28 },
    { name: "Medical", value: 30 },
  ];

  // Mock data for service types
  const serviceTypeData = [
    { name: "Video Calls", value: 45 },
    { name: "Live Chat", value: 35 },
    { name: "Messaging", value: 20 },
  ];

  // Mock data for consultation insights
  const consultationData = [
    { category: "Career", avgDuration: 38, satisfaction: 92, count: 1250 },
    { category: "Legal", avgDuration: 45, satisfaction: 89, count: 980 },
    { category: "Financial", avgDuration: 42, satisfaction: 88, count: 820 },
    { category: "Mental Health", avgDuration: 55, satisfaction: 95, count: 1100 },
    { category: "Medical", avgDuration: 32, satisfaction: 91, count: 750 },
    { category: "Education", avgDuration: 40, satisfaction: 93, count: 650 },
  ];

  // Mock data for regional distribution
  const regionData = [
    { name: "North America", value: 35 },
    { name: "Europe", value: 25 },
    { name: "Asia", value: 20 },
    { name: "South America", value: 10 },
    { name: "Africa", value: 5 },
    { name: "Australia", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

  const metrics = [
    { 
      title: "Privacy Score", 
      value: "96%", 
      change: "+5%",
      trend: "up",
      description: "Overall platform privacy rating" 
    },
    { 
      title: "Anonymous Sessions", 
      value: "78%",
      change: "+3%",
      trend: "up",
      description: "Percentage of anonymous consultations" 
    },
    { 
      title: "Encryption Coverage", 
      value: "100%",
      change: "+1%",
      trend: "up",
      description: "End-to-end encryption implementation" 
    },
    { 
      title: "Satisfaction Rate", 
      value: "94%",
      change: "+2%",
      trend: "up",
      description: "User privacy satisfaction" 
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SecureConnect Analyzer</h1>
          <p className="text-muted-foreground">Detailed insights into platform usage, privacy, and consultations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastWeek">Last 7 days</SelectItem>
                <SelectItem value="lastMonth">Last 30 days</SelectItem>
                <SelectItem value="lastQuarter">Last 90 days</SelectItem>
                <SelectItem value="lastYear">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="northAmerica">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="other">Other Regions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
      >
        {metrics.map((metric, index) => (
          <motion.div key={index} variants={fadeIn}>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`flex items-center ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {metric.trend === "up" ? 
                      <TrendingUp className="h-4 w-4 mr-1" /> : 
                      <TrendingDown className="h-4 w-4 mr-1" />
                    }
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                    <span className="text-xs">View Details</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="privacy" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6 bg-muted/40">
          <TabsTrigger value="privacy">Privacy Analysis</TabsTrigger>
          <TabsTrigger value="consultations">Consultation Insights</TabsTrigger>
          <TabsTrigger value="professionals">Professional Categories</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Privacy Metrics Trend
                </CardTitle>
                <CardDescription>
                  Analyzing the evolution of privacy metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={privacyMetricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="anonymousRate" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }}
                        name="Anonymous Rate (%)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="encryptionCoverage" 
                        stroke="#82ca9d" 
                        name="Encryption Coverage (%)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="privacySatisfaction" 
                        stroke="#ffc658" 
                        name="Privacy Satisfaction (%)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Components Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "End-to-End Encryption", score: 98 },
                          { name: "Anonymity Options", score: 95 },
                          { name: "Data Protection", score: 97 },
                          { name: "Consent Management", score: 94 },
                          { name: "Data Retention", score: 92 },
                          { name: "Access Control", score: 96 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8884d8" name="Score (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Compliance Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">GDPR Compliance</span>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">Fully Compliant</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">HIPAA Compliance</span>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">Fully Compliant</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ISO 27001</span>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">Certified</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">CCPA Compliance</span>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">Fully Compliant</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="consultations">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Categories Performance</CardTitle>
                <CardDescription>
                  Average duration, satisfaction and volume by consultation category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={consultationData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 50,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avgDuration" fill="#8884d8" name="Avg. Duration (min)" />
                      <Bar dataKey="satisfaction" fill="#82ca9d" name="Satisfaction (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {serviceTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consultation Volume by Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { time: "6 AM", volume: 10 },
                          { time: "9 AM", volume: 45 },
                          { time: "12 PM", volume: 75 },
                          { time: "3 PM", volume: 85 },
                          { time: "6 PM", volume: 95 },
                          { time: "9 PM", volume: 60 },
                          { time: "12 AM", volume: 25 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="volume" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="professionals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Category Distribution</CardTitle>
                <CardDescription>
                  Breakdown of consultations by professional category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Experience Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: "Mentors", junior: 25, mid: 45, senior: 30 },
                        { category: "Officials", junior: 15, mid: 35, senior: 50 },
                        { category: "Medical", junior: 10, mid: 30, senior: 60 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="junior" stackId="a" fill="#8884d8" name="Junior (1-3 yrs)" />
                      <Bar dataKey="mid" stackId="a" fill="#82ca9d" name="Mid-level (4-7 yrs)" />
                      <Bar dataKey="senior" stackId="a" fill="#ffc658" name="Senior (8+ yrs)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Professional Specialization</CardTitle>
                <CardDescription>
                  Distribution of specialties within each professional category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Career Development", mentors: 35, officials: 5, medical: 0 },
                        { name: "Leadership", mentors: 25, officials: 10, medical: 0 },
                        { name: "Technical Skills", mentors: 40, officials: 0, medical: 0 },
                        { name: "Legal Advice", mentors: 0, officials: 40, medical: 0 },
                        { name: "Financial Guidance", mentors: 0, officials: 30, medical: 0 },
                        { name: "Government Services", mentors: 0, officials: 15, medical: 5 },
                        { name: "Mental Health", mentors: 0, officials: 0, medical: 40 },
                        { name: "Physical Health", mentors: 0, officials: 0, medical: 35 },
                        { name: "Wellness", mentors: 0, officials: 0, medical: 20 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="mentors" fill="#8884d8" name="Mentors" />
                      <Bar dataKey="officials" fill="#82ca9d" name="Officials" />
                      <Bar dataKey="medical" fill="#ffc658" name="Medical" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Regional Distribution
                </CardTitle>
                <CardDescription>
                  User distribution across global regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { language: "English", users: 45 },
                        { language: "Spanish", users: 15 },
                        { language: "French", users: 8 },
                        { language: "German", users: 7 },
                        { language: "Chinese", users: 12 },
                        { language: "Hindi", users: 6 },
                        { language: "Others", users: 7 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="language" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8" name="Users (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Regional Usage Patterns</CardTitle>
                <CardDescription>
                  Consultation patterns across different regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: "North America", video: 65, chat: 25, messaging: 10 },
                        { region: "Europe", video: 55, chat: 35, messaging: 10 },
                        { region: "Asia", video: 35, chat: 40, messaging: 25 },
                        { region: "South America", video: 45, chat: 35, messaging: 20 },
                        { region: "Africa", video: 30, chat: 40, messaging: 30 },
                        { region: "Australia", video: 60, chat: 30, messaging: 10 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="video" stackId="a" fill="#8884d8" name="Video Calls (%)" />
                      <Bar dataKey="chat" stackId="a" fill="#82ca9d" name="Live Chat (%)" />
                      <Bar dataKey="messaging" stackId="a" fill="#ffc658" name="Messaging (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Search Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-primary" />
              Advanced Analytics Search
            </CardTitle>
            <CardDescription>
              Search for specific metrics and create custom reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search-query">Search Query</Label>
                <div className="flex mt-1">
                  <Input id="search-query" placeholder="Search for metrics, regions, categories..." />
                  <Button className="ml-2">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col">
                <Label className="mb-1">Quick Filters</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Privacy Metrics</Button>
                  <Button variant="outline" size="sm">Top Regions</Button>
                  <Button variant="outline" size="sm">Growth Trends</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analyzer;
