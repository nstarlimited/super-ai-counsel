import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold text-black">Super AI Counsel</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-black hover:text-black/80"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
              onClick={() => navigate('/auth')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};