import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-white pt-20">
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black animate-float">
            Your 24/7 AI-Powered Personal Lawyer
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-700 max-w-3xl">
            Get instant legal support, document creation, and expert advice—whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80"
            alt="Professional Lawyer"
            className="rounded-lg shadow-xl w-full max-w-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};