import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Industries />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;