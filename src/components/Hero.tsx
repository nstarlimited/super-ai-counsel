import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center bg-white pt-16">
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black animate-float">
            Your 24/7 AI-Powered Personal Lawyer
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-gray-700 max-w-2xl">
            Get instant legal support, document creation, and expert advice—whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-lg py-6">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10 text-lg py-6">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="/lovable-uploads/a83d8219-1d07-4bfc-9fff-d3ba4208af93.png"
            alt="Professional Legal Counsel"
            className="rounded-lg shadow-xl w-full max-w-md mx-auto object-cover"
          />
        </div>
      </div>
      
      {/* AI Chatbot Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="rounded-full w-16 h-16 bg-[#F97316] hover:bg-[#F97316]/90 shadow-lg"
          onClick={() => console.log('Chat opened')}
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};