
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-6">
          Sorry, we couldn't find the page you're looking for
        </p>
        <p className="text-muted-foreground mb-8">
          The page at <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code> might have been removed or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="gap-2">
            <MoveLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
