
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart, BarChart2, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

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
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </motion.div>
    </div>
  );
};

export default NotFound;
