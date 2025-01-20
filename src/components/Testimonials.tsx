import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "The AI Personal Lawyer platform has been invaluable for my business. Quick legal advice whenever I need it!",
    rating: 5,
    industry: "Retail",
  },
  {
    name: "Michael Chen",
    role: "Healthcare Professional",
    content: "As a healthcare provider, having instant access to legal guidance has helped me navigate complex regulations.",
    rating: 5,
    industry: "Healthcare",
  },
  {
    name: "Emily Rodriguez",
    role: "Real Estate Agent",
    content: "This platform has streamlined my contract reviews and saved me countless hours. Highly recommended!",
    rating: 5,
    industry: "Real Estate",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-accent">{testimonial.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};