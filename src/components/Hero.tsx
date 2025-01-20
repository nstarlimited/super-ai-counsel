import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#243949] to-[#517fa4] text-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-float">
          Your 24/7 AI-Powered Personal Lawyer
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200">
          Get instant legal support, document creation, and expert advice—whenever you need it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
            Start Your Free Trial
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};