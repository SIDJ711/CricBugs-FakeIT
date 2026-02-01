import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Bug, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatDelay: 1
          }}
          className="inline-block mb-8"
        >
          <Bug className="w-24 h-24 text-primary" />
        </motion.div>

        <h1 className="font-display text-7xl text-primary mb-4">404</h1>
        <h2 className="font-display text-3xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Looks like this page went for a duck. 🦆
          <br />
          Even the third umpire can't find it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-12">
          Error Code: OUT_CAUGHT_BEHIND
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
