import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "@/components/pricing/UpgradeButton";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm h-[73px]">
      <div className="h-full flex items-center">
        <div className={`${isDashboard ? 'pl-6' : 'container mx-auto px-6'} flex-1`}>
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold text-black">Super AI Counsel</span>
            </Link>
            {!isDashboard ? (
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
            ) : (
              <div className="flex items-center space-x-4">
                <UpgradeButton />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12">
                      <User className="h-8 w-8" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};