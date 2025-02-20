
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    trial: "14-day free trial",
    description: "Perfect for individuals needing basic legal support",
    features: [
      "Basic legal document templates",
      "Limited AI legal assistance (5 queries/month)",
      "Email support (24-48h response)",
      "Access to basic legal resources",
      "One 30-min consultation/month",
      "Basic document review",
      "Access to public forums",
      "Basic case tracking",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    trial: "14-day free trial",
    description: "Ideal for businesses and professionals",
    features: [
      "All Basic features",
      "Unlimited AI legal assistance",
      "Priority support (4-8h response)",
      "Advanced document templates",
      "Three 30-min consultations/month",
      "Advanced document review",
      "Priority access to lawyers",
      "Custom legal forms",
      "Group legal sessions",
      "Client portal access",
      "Case management tools",
      "Legal deadline reminders",
    ],
  },
  {
    name: "Lifetime",
    price: "$149",
    period: " one-time",
    trial: "14-day free trial",
    description: "Best value for long-term access",
    features: [
      "All Professional features",
      "Lifetime access to platform",
      "VIP support (1-2h response)",
      "Exclusive legal webinars",
      "Premium document templates",
      "Unlimited document storage",
      "Advanced analytics",
      "Priority booking with top-rated lawyers",
      "Custom legal strategy sessions",
      "Emergency legal support",
      "White-label reports",
      "API access",
    ],
  },
];

export const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Choose Your Plan
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          All plans include a 14-day free trial. No credit card required to start.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                plan.name === "Professional" ? "border-2 border-secondary" : ""
              }`}
            >
              {plan.name === "Professional" && (
                <div className="absolute top-0 right-0 bg-secondary text-primary px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
                <p className="text-sm text-secondary mt-2">{plan.trial}</p>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={
                  plan.name === "Professional"
                    ? "bg-secondary text-primary hover:bg-secondary/90"
                    : "bg-primary hover:bg-primary/90"
                }
                onClick={() => navigate('/auth')}
              >
                Start Free Trial
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">
          Need a custom plan? <a href="#contact" className="text-secondary hover:underline">Contact us</a>
        </p>
      </div>
    </section>
  );
};
