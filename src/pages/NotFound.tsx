
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart, BarChart2, Home, Github, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NotFound = () => {
  const location = useLocation();
  const [repoName, setRepoName] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <LineChart className="h-12 w-12 text-blue-600" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-24 w-24 bg-blue-400/10 rounded-full blur-3xl -z-10" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We couldn't find the time series data you're looking for. The page may have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/analyzer" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              Go to Analyzer
            </Link>
          </Button>
        </div>
        
        {/* GitHub Export Demo */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Export to GitHub Guide</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This is a demonstration of how the GitHub export dialog should appear. In the actual Lovable interface, 
            look for the GitHub icon in the top navigation bar.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
                GitHub Export Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Export to GitHub</DialogTitle>
                <DialogDescription>
                  Create a new GitHub repository for your project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="repo-name">Repository Name</Label>
                  <Input 
                    id="repo-name" 
                    placeholder="my-awesome-project" 
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This will create a new repository at github.com/yourusername/{repoName || "my-awesome-project"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repo-description">Repository Description (Optional)</Label>
                  <Input id="repo-description" placeholder="A project created with Lovable" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="repo-private" className="h-4 w-4" />
                  <Label htmlFor="repo-private" className="text-sm">Make repository private</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Create Repository</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="mt-4 bg-muted p-4 rounded-md text-left">
            <h3 className="text-sm font-medium mb-2">Troubleshooting Tips:</h3>
            <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
              <li>Make sure you're signed in to GitHub in your browser</li>
              <li>Clear your browser cache and cookies</li>
              <li>Try using a different browser</li>
              <li>Check if you have any browser extensions blocking popups</li>
              <li>Ensure your GitHub account has the necessary permissions</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
