import { Building2, GraduationCap, Heart, Home, Users } from "lucide-react";

const industries = [
  {
    icon: Home,
    title: "Real Estate",
    description: "Legal advice for housing contracts, property disputes, and tenant agreements",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Support for compliance, student rights, and academic contracts",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Guidance on HIPAA compliance, patient rights, and malpractice",
  },
  {
    icon: Building2,
    title: "Small Business",
    description: "Support for startups, contracts, and intellectual property",
  },
  {
    icon: Users,
    title: "Individuals",
    description: "Help with family law, wills, and personal injury claims",
  },
];

export const Industries = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Industries We Serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <industry.icon className="w-8 h-8 text-accent mr-3" />
                <h3 className="text-xl font-semibold text-primary">{industry.title}</h3>
              </div>
              <p className="text-gray-600">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};