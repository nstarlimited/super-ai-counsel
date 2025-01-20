import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our services",
    features: [
      "Basic legal document templates",
      "Limited legal advice",
      "Access to knowledge base",
      "Email support",
    ],
  },
  {
    name: "Premium",
    price: "$49",
    period: "/month",
    description: "For individuals and small businesses",
    features: [
      "All Free features",
      "Unlimited document creation",
      "24/7 legal advice",
      "Priority support",
      "Custom document review",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "All Premium features",
      "Custom legal templates",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                {plan.period && <span className="text-gray-600">{plan.period}</span>}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={
                  plan.name === "Premium"
                    ? "bg-secondary text-primary hover:bg-secondary/90"
                    : "bg-primary hover:bg-primary/90"
                }
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};