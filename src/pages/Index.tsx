import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Industries />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;