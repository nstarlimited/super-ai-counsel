import { CheckCircle, MessageCircle, Shield, FileText, Globe, Clock } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Legal Document Creation",
    description: "Generate and review legal documents instantly with AI assistance",
  },
  {
    icon: MessageCircle,
    title: "Instant Legal Advice",
    description: "Get immediate responses to your legal questions 24/7",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Bank-grade encryption and security for all your legal documents",
  },
  {
    icon: Globe,
    title: "Multi-jurisdiction Support",
    description: "Legal support across multiple states and countries",
  },
  {
    icon: Clock,
    title: "Emergency Legal Help",
    description: "Priority support for urgent legal matters",
  },
  {
    icon: CheckCircle,
    title: "Compliance Monitoring",
    description: "Stay updated with changing legal requirements",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Why Choose AI Personal Lawyer?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="w-8 h-8 text-accent mr-3" />
                <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};