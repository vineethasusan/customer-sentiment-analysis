import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Shield, Video, MessageSquare, TrendingUp, 
  Activity, Globe, Calendar, Check, AlertTriangle,
  Map, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [viewMode, setViewMode] = useState("country"); // "country" or "state"
  
  const consultationData = [
    { name: "Jan", mentors: 65, officials: 45, medical: 35 },
    { name: "Feb", mentors: 70, officials: 48, medical: 40 },
    { name: "Mar", mentors: 85, officials: 55, medical: 45 },
    { name: "Apr", mentors: 78, officials: 60, medical: 50 },
    { name: "May", mentors: 90, officials: 62, medical: 55 },
    { name: "Jun", mentors: 100, officials: 70, medical: 60 },
    { name: "Jul", mentors: 110, officials: 75, medical: 65 },
  ];

  const globalUsersData = [
    { name: "North America", value: 35 },
    { name: "Europe", value: 25 },
    { name: "Asia", value: 20 },
    { name: "South America", value: 10 },
    { name: "Africa", value: 5 },
    { name: "Australia", value: 5 },
  ];

  const userGrowthData = [
    { name: "Jan", users: 1500 },
    { name: "Feb", users: 1800 },
    { name: "Mar", users: 2200 },
    { name: "Apr", users: 2500 },
    { name: "May", users: 3000 },
    { name: "Jun", users: 3500 },
    { name: "Jul", users: 4200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

  const stats = [
    { title: "Active Users", value: "4,235", icon: <Users className="h-8 w-8 text-blue-500" />, change: "+12%" },
    { title: "Secure Sessions", value: "18,432", icon: <Shield className="h-8 w-8 text-indigo-500" />, change: "+24%" },
    { title: "Video Calls", value: "7,849", icon: <Video className="h-8 w-8 text-green-500" />, change: "+18%" },
    { title: "Messages", value: "42,094", icon: <MessageSquare className="h-8 w-8 text-amber-500" />, change: "+32%" },
  ];

  const recentConsultations = [
    { id: 1, user: "User #28591", professional: "Career Coach", type: "Video Call", status: "Completed", duration: "45 min" },
    { id: 2, user: "User #34182", professional: "Legal Advisor", type: "Chat", status: "Completed", duration: "32 min" },
    { id: 3, user: "User #45920", professional: "Medical Practitioner", type: "Video Call", status: "Scheduled", duration: "30 min" },
    { id: 4, user: "User #39104", professional: "Financial Consultant", type: "Messaging", status: "In Progress", duration: "15 min" },
    { id: 5, user: "User #51023", professional: "Therapist", type: "Video Call", status: "Completed", duration: "60 min" },
  ];

  const countryData = [
    { name: "United States", users: 1850, sessions: 12500, growth: 15 },
    { name: "United Kingdom", users: 920, sessions: 6300, growth: 12 },
    { name: "Canada", users: 780, sessions: 5100, growth: 18 },
    { name: "Germany", users: 650, sessions: 4300, growth: 9 },
    { name: "Australia", users: 520, sessions: 3200, growth: 14 },
    { name: "France", users: 480, sessions: 2900, growth: 7 },
    { name: "India", users: 420, sessions: 2600, growth: 22 },
    { name: "Brazil", users: 380, sessions: 2200, growth: 19 },
    { name: "Japan", users: 340, sessions: 1800, growth: 5 },
    { name: "South Africa", users: 190, sessions: 1100, growth: 11 },
  ];

  const stateData = {
    "United States": [
      { name: "California", users: 480, sessions: 3200, growth: 17 },
      { name: "New York", users: 390, sessions: 2600, growth: 14 },
      { name: "Texas", users: 320, sessions: 2100, growth: 19 },
      { name: "Florida", users: 280, sessions: 1900, growth: 16 },
      { name: "Illinois", users: 210, sessions: 1400, growth: 11 },
      { name: "Others", users: 170, sessions: 1300, growth: 13 },
    ],
    "United Kingdom": [
      { name: "England", users: 620, sessions: 4200, growth: 13 },
      { name: "Scotland", users: 150, sessions: 1100, growth: 9 },
      { name: "Wales", users: 90, sessions: 650, growth: 8 },
      { name: "Northern Ireland", users: 60, sessions: 350, growth: 7 },
    ],
    "Canada": [
      { name: "Ontario", users: 290, sessions: 1900, growth: 20 },
      { name: "Quebec", users: 210, sessions: 1400, growth: 15 },
      { name: "British Columbia", users: 160, sessions: 1050, growth: 22 },
      { name: "Alberta", users: 120, sessions: 750, growth: 17 },
    ],
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setViewMode("state");
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setViewMode("country");
  };

  const getCurrentGeoData = () => {
    if (viewMode === "state" && selectedCountry && stateData[selectedCountry]) {
      return stateData[selectedCountry];
    }
    return countryData;
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor SecureConnect platform analytics and performance.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={fadeIn}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{stat.change}</span>
                  <span className="text-muted-foreground ml-1">vs last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs for different analysis */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="users">User Analysis</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="geography">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Platform Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={consultationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Area type="monotone" dataKey="mentors" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="officials" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="medical" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Global Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={globalUsersData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {globalUsersData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consultations">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consultationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="mentors" fill="#8884d8" name="Mentors" />
                      <Bar dataKey="officials" fill="#82ca9d" name="Officials" />
                      <Bar dataKey="medical" fill="#ffc658" name="Medical" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-muted/50 p-4">
                    <div className="font-medium">User</div>
                    <div className="font-medium">Professional</div>
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Status</div>
                    <div className="font-medium">Duration</div>
                  </div>
                  <div className="divide-y">
                    {recentConsultations.map((consultation) => (
                      <div key={consultation.id} className="grid grid-cols-5 p-4">
                        <div>{consultation.user}</div>
                        <div>{consultation.professional}</div>
                        <div className="flex items-center">
                          {consultation.type === "Video Call" && <Video className="h-4 w-4 mr-1" />}
                          {consultation.type === "Chat" && <MessageSquare className="h-4 w-4 mr-1" />}
                          {consultation.type}
                        </div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            consultation.status === "Completed" ? "bg-green-100 text-green-800" :
                            consultation.status === "Scheduled" ? "bg-blue-100 text-blue-800" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {consultation.status === "Completed" && <Check className="h-3 w-3 mr-1" />}
                            {consultation.status === "Scheduled" && <Calendar className="h-3 w-3 mr-1" />}
                            {consultation.status === "In Progress" && <Activity className="h-3 w-3 mr-1" />}
                            {consultation.status}
                          </span>
                        </div>
                        <div>{consultation.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>User Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={consultationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="mentors" stroke="#8884d8" />
                      <Line type="monotone" dataKey="officials" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="medical" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "18-24", value: 15 },
                          { name: "25-34", value: 35 },
                          { name: "35-44", value: 25 },
                          { name: "45-54", value: 15 },
                          { name: "55+", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {globalUsersData.map((entry, index) => (
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
                <CardTitle>User Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", retention: 85 },
                        { month: "Feb", retention: 82 },
                        { month: "Mar", retention: 88 },
                        { month: "Apr", retention: 90 },
                        { month: "May", retention: 89 },
                        { month: "Jun", retention: 92 },
                        { month: "Jul", retention: 94 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="retention" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Encryption Status</span>
                    <span className="flex items-center text-green-500">
                      <Check className="h-4 w-4 mr-1" />
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Privacy Certifications</span>
                    <span className="flex items-center text-green-500">
                      <Check className="h-4 w-4 mr-1" />
                      Valid
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Anonymous Sessions</span>
                    <span className="text-sm font-medium">2,458 (52%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Identity Verified Sessions</span>
                    <span className="text-sm font-medium">2,267 (48%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Security Alerts</span>
                    <span className="flex items-center text-amber-500">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      3 Minor
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", incidents: 2 },
                        { month: "Feb", incidents: 1 },
                        { month: "Mar", incidents: 3 },
                        { month: "Apr", incidents: 0 },
                        { month: "May", incidents: 1 },
                        { month: "Jun", incidents: 0 },
                        { month: "Jul", incidents: 1 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="incidents" stroke="#ff8042" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Security Certification Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">GDPR Compliance Audit</p>
                      <p className="text-sm text-muted-foreground">Completed January 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">HIPAA Certification</p>
                      <p className="text-sm text-muted-foreground">Completed March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">ISO 27001 Certification</p>
                      <p className="text-sm text-muted-foreground">Completed May 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Quarterly Security Assessment</p>
                      <p className="text-sm text-muted-foreground">Scheduled August 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Map className="h-5 w-5 mr-2 text-primary" />
                    {viewMode === "country" ? "Country Distribution" : `${selectedCountry} - State/Province Distribution`}
                  </CardTitle>
                </div>
                {viewMode === "state" && (
                  <Button variant="ghost" size="sm" onClick={handleBackToCountries} className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    Back to Countries
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getCurrentGeoData()}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 100,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="users" 
                        fill="#8884d8" 
                        name="Active Users"
                        onClick={viewMode === "country" ? (data) => handleCountrySelect(data.name) : null}
                        cursor={viewMode === "country" ? "pointer" : "default"}
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="growth" 
                        fill="#82ca9d" 
                        name="Growth Rate (%)" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {viewMode === "country" && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Click on any country bar to view state/province breakdown
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-primary" />
                    {viewMode === "country" ? "User Activity by Country" : `User Activity in ${selectedCountry}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getCurrentGeoData()}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="sessions"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {getCurrentGeoData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} sessions`, 'Activity']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Regional Growth Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getCurrentGeoData()}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="growth" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
