import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does AI Personal Lawyer work?",
    answer: "Our platform uses advanced AI to provide instant legal guidance, document creation, and advice. It analyzes your specific situation and provides tailored legal solutions based on current laws and regulations.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use bank-grade encryption and follow strict security protocols to protect your data. All information is stored securely and treated with the highest level of confidentiality.",
  },
  {
    question: "What types of legal documents can I create?",
    answer: "You can create various legal documents including contracts, agreements, wills, and more. Our AI assists in customizing these documents to your specific needs while ensuring legal compliance.",
  },
  {
    question: "How much does it cost?",
    answer: "We offer flexible pricing plans starting from our free tier. Check our pricing section for detailed information about our packages and what's included in each.",
  },
  {
    question: "Can I get help in emergency situations?",
    answer: "Yes, our platform provides 24/7 access to legal resources and priority support for urgent matters through our premium plans.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};