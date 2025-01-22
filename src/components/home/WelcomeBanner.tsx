import { Button } from "@/components/ui/button";

export const WelcomeBanner = () => {
  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Welcome to Super AI Counsel</h1>
      <p className="mb-4">Your intelligent legal assistant is ready to help</p>
      <div className="flex gap-3">
        <Button variant="secondary">Quick Start Guide</Button>
        <Button variant="outline" className="text-white border-white hover:bg-white/10">
          View Tutorial
        </Button>
      </div>
      <div className="text-[10px] mt-2 text-gray-300">*This is mock data for beta testing</div>
    </div>
  );
};