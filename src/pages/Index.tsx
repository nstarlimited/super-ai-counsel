import { SmartSearch } from "@/components/home/SmartSearch";
import { WelcomeBanner } from "@/components/home/WelcomeBanner";
import { QuickAccess } from "@/components/home/QuickAccess";
import { DeadlinesAlerts } from "@/components/home/DeadlinesAlerts";
import { LegalNews } from "@/components/home/LegalNews";
import { JobOpportunities } from "@/components/home/JobOpportunities";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <SmartSearch />
          <WelcomeBanner />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAccess />
            <DeadlinesAlerts />
            <div className="lg:col-span-1">
              <LegalNews />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <JobOpportunities />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;