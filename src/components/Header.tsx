import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
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
            <div className="flex items-center space-x-4">
              {isDashboard ? (
                <Button 
                  variant="ghost" 
                  className="text-black hover:text-black/80"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};