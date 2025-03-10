
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Globe, 
  Users, 
  GraduationCap, 
  Filter, 
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for the location selection
const continents = [
  { id: "as", name: "Asia" },
  { id: "eu", name: "Europe" },
  { id: "na", name: "North America" },
  { id: "sa", name: "South America" },
  { id: "af", name: "Africa" },
  { id: "oc", name: "Oceania" },
];

const countriesByContinent: Record<string, Array<{ id: string; name: string }>> = {
  as: [
    { id: "in", name: "India" },
    { id: "jp", name: "Japan" },
    { id: "cn", name: "China" },
  ],
  eu: [
    { id: "uk", name: "United Kingdom" },
    { id: "fr", name: "France" },
    { id: "de", name: "Germany" },
  ],
  na: [
    { id: "us", name: "United States" },
    { id: "ca", name: "Canada" },
    { id: "mx", name: "Mexico" },
  ],
  sa: [
    { id: "br", name: "Brazil" },
    { id: "ar", name: "Argentina" },
    { id: "co", name: "Colombia" },
  ],
  af: [
    { id: "za", name: "South Africa" },
    { id: "ng", name: "Nigeria" },
    { id: "eg", name: "Egypt" },
  ],
  oc: [
    { id: "au", name: "Australia" },
    { id: "nz", name: "New Zealand" },
    { id: "fj", name: "Fiji" },
  ],
};

const provincesByCountry: Record<string, Array<{ id: string; name: string }>> = {
  in: [
    { id: "mh", name: "Maharashtra" },
    { id: "dl", name: "Delhi" },
    { id: "ka", name: "Karnataka" },
    { id: "tn", name: "Tamil Nadu" },
  ],
  us: [
    { id: "ca", name: "California" },
    { id: "ny", name: "New York" },
    { id: "tx", name: "Texas" },
    { id: "fl", name: "Florida" },
  ],
  uk: [
    { id: "ln", name: "London" },
    { id: "mc", name: "Manchester" },
    { id: "bm", name: "Birmingham" },
    { id: "ed", name: "Edinburgh" },
  ],
};

// Mock data for mentors
const mentorCategories = [
  "Career Development",
  "Technology",
  "Finance",
  "Leadership",
  "Health & Wellness"
];

const mentorsByProvince: Record<string, Array<{
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  image: string;
  specialties: string[];
}>> = {
  mh: [
    {
      id: "m1",
      name: "Priya Sharma",
      title: "Senior Tech Consultant",
      category: "Technology",
      rating: 4.8,
      image: "/placeholder.svg",
      specialties: ["Web Development", "Cloud Architecture", "AI Applications"]
    },
    {
      id: "m2",
      name: "Rajesh Patel",
      title: "Financial Advisor",
      category: "Finance",
      rating: 4.9,
      image: "/placeholder.svg",
      specialties: ["Investment Strategy", "Retirement Planning", "Tax Optimization"]
    },
  ],
  ca: [
    {
      id: "m3",
      name: "Sarah Johnson",
      title: "Executive Coach",
      category: "Leadership",
      rating: 4.7,
      image: "/placeholder.svg",
      specialties: ["Team Management", "Strategic Planning", "Executive Presence"]
    },
    {
      id: "m4",
      name: "Michael Chen",
      title: "Tech Entrepreneur",
      category: "Technology",
      rating: 4.9,
      image: "/placeholder.svg",
      specialties: ["Startup Growth", "Product Development", "Tech Innovation"]
    },
  ],
  ln: [
    {
      id: "m5",
      name: "Emma Williams",
      title: "Career Strategist",
      category: "Career Development",
      rating: 4.6,
      image: "/placeholder.svg",
      specialties: ["Career Transitions", "Personal Branding", "Interview Preparation"]
    },
    {
      id: "m6",
      name: "James Taylor",
      title: "Wellness Coach",
      category: "Health & Wellness",
      rating: 4.8,
      image: "/placeholder.svg",
      specialties: ["Work-Life Balance", "Stress Management", "Productivity"]
    },
  ],
};

const MentorFinder = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  const handleContinentChange = (value: string) => {
    setSelectedContinent(value);
    setSelectedCountry("");
    setSelectedProvince("");
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedProvince("");
  };

  const filteredMentors = selectedProvince 
    ? mentorsByProvince[selectedProvince]?.filter(mentor => 
        (selectedCategory === "all" || mentor.category === selectedCategory) &&
        (!searchQuery || 
          mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ) 
    : [];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div 
        className="mb-8 text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Find Your Perfect Mentor
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select your location and preferences to connect with professional mentors in your area
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Location Selection Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location Selection
            </CardTitle>
            <CardDescription>
              Narrow down by geographic location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="continent">Continent</Label>
              <Select
                value={selectedContinent}
                onValueChange={handleContinentChange}
              >
                <SelectTrigger id="continent">
                  <SelectValue placeholder="Select continent" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map(continent => (
                    <SelectItem key={continent.id} value={continent.id}>
                      {continent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedContinent && (
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={selectedCountry}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesByContinent[selectedContinent]?.map(country => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedCountry && provincesByCountry[selectedCountry] && (
              <div className="space-y-2">
                <Label htmlFor="province">Province/State</Label>
                <Select
                  value={selectedProvince}
                  onValueChange={setSelectedProvince}
                >
                  <SelectTrigger id="province">
                    <SelectValue placeholder="Select province/state" />
                  </SelectTrigger>
                  <SelectContent>
                    {provincesByCountry[selectedCountry]?.map(province => (
                      <SelectItem key={province.id} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filter Options
            </CardTitle>
            <CardDescription>
              Refine your search with categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Mentor Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mentorCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search by name or specialty</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="search" 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="w-full"
            >
              Reset Filters
            </Button>
          </CardFooter>
        </Card>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Mentors Available
            </CardTitle>
            <CardDescription>
              {selectedProvince 
                ? `${filteredMentors.length} mentors in ${provincesByCountry[selectedCountry]?.find(p => p.id === selectedProvince)?.name || 'selected area'}`
                : 'Select a location to see available mentors'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              {selectedProvince ? (
                <>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {filteredMentors.length}
                  </div>
                  <p className="text-muted-foreground">
                    {selectedCategory 
                      ? `${selectedCategory} specialists` 
                      : 'Professional mentors'}
                  </p>
                </>
              ) : (
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              )}
            </div>
          </CardContent>
          {selectedProvince && (
            <CardFooter>
              <Button 
                variant="default" 
                className="w-full"
                disabled={!selectedProvince}
              >
                Browse All Mentors
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Mentor Results */}
      {selectedProvince && filteredMentors.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Available Mentors
            </h2>
            <div className="text-muted-foreground text-sm">
              Showing {filteredMentors.length} results
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.title}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                      ★ {mentor.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <span className="inline-block bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium mb-2">
                      {mentor.category}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <p className="font-medium text-foreground">Specialties:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {mentor.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedMentor(mentor)} className="w-full">
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Mentor Profile</DialogTitle>
                        <DialogDescription>
                          Connect with this mentor to start your journey
                        </DialogDescription>
                      </DialogHeader>
                      {selectedMentor && (
                        <div className="space-y-4 my-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                              <img 
                                src={selectedMentor.image} 
                                alt={selectedMentor.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{selectedMentor.name}</h3>
                              <p className="text-muted-foreground">{selectedMentor.title}</p>
                              <div className="flex items-center gap-1 text-amber-500 text-sm mt-1">
                                ★ {selectedMentor.rating} (125 reviews)
                              </div>
                            </div>
                          </div>
                          
                          <Tabs defaultValue="about">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="about">About</TabsTrigger>
                              <TabsTrigger value="sessions">Sessions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="about" className="space-y-4 pt-4">
                              <div>
                                <h4 className="font-semibold mb-2">Bio</h4>
                                <p className="text-muted-foreground">
                                  Experienced professional with expertise in {selectedMentor.category.toLowerCase()} 
                                  and a passion for mentoring. Specializing in {selectedMentor.specialties.join(", ")}.
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedMentor.specialties.map((specialty, index) => (
                                    <span key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs">
                                      {specialty}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="sessions" className="space-y-4 pt-4">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 border rounded-md">
                                  <div>
                                    <p className="font-medium">Initial Consultation</p>
                                    <p className="text-sm text-muted-foreground">30 minutes</p>
                                  </div>
                                  <Button size="sm">Book</Button>
                                </div>
                                <div className="flex justify-between items-center p-3 border rounded-md">
                                  <div>
                                    <p className="font-medium">Deep Dive Session</p>
                                    <p className="text-sm text-muted-foreground">60 minutes</p>
                                  </div>
                                  <Button size="sm">Book</Button>
                                </div>
                                <div className="flex justify-between items-center p-3 border rounded-md">
                                  <div>
                                    <p className="font-medium">Follow-up Meeting</p>
                                    <p className="text-sm text-muted-foreground">45 minutes</p>
                                  </div>
                                  <Button size="sm">Book</Button>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                          
                          <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline">Message</Button>
                            <Button>Book a Session</Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {selectedProvince && filteredMentors.length === 0 && (
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn't find mentors matching your criteria. Try changing your filters or selecting a different location.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedCategory("");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default MentorFinder;
