import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import { SmartSearch } from "@/components/home/SmartSearch";
import { WelcomeBanner } from "@/components/home/WelcomeBanner";
import { QuickAccess } from "@/components/home/QuickAccess";
import { DeadlinesAlerts } from "@/components/home/DeadlinesAlerts";
import { LegalNews } from "@/components/home/LegalNews";
import { JobOpportunities } from "@/components/home/JobOpportunities";
import CommunityFeatures from "./dashboard/CommunityFeatures";
import { LegalAITools } from "./dashboard/LegalAITools";
import { EmergencyLegalHelp } from "./dashboard/EmergencyLegalHelp";
import FindLawyer from "./dashboard/FindLawyer";

const DashboardHome = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <SmartSearch />
    <WelcomeBanner />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <QuickAccess />
      <DeadlinesAlerts />
      <LegalNews />
      <JobOpportunities />
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-73px)] w-full">
            <DashboardSidebar />
            <SidebarInset className="flex-1 p-6">
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="community/*" element={<CommunityFeatures />} />
                <Route path="ask-ai" element={<LegalAITools />} />
                <Route path="emergency" element={<EmergencyLegalHelp />} />
                <Route path="find-lawyer" element={<FindLawyer />} />
              </Routes>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Dashboard;