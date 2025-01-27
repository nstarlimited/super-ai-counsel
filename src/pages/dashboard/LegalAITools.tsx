import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Scale,
  FileText,
  Shield,
  BarChart,
  Briefcase,
  MessageSquare,
  Gavel,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";
import { CategoryCard } from "@/components/legal-ai/CategoryCard";
import { AgentCard } from "@/components/legal-ai/AgentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    id: 1,
    title: "Research and Insights",
    description: "AI-powered tools for legal research, analytics, and sentiment analysis",
    icon: Scale,
    agentCount: 3,
    agents: [
      {
        name: "Legal Research Assistant",
        description: "Rapidly analyze case law, statutes, and legal precedents",
        status: "available" as const,
        rating: 4.8,
      },
      {
        name: "Analytics Engine",
        description: "Data-driven insights into market trends and litigation risks",
        status: "available" as const,
        rating: 4.5,
      },
    ],
  },
  {
    id: 2,
    title: "Document Management",
    description: "Automated document review, contract analysis, and legal writing assistance",
    icon: FileText,
    agentCount: 3,
    agents: [
      {
        name: "Document Reviewer",
        description: "Automate review of legal documents and discovery materials",
        status: "available" as const,
        rating: 4.7,
      },
      {
        name: "Contract Analyzer",
        description: "Analyze contracts for risks and compliance",
        status: "busy" as const,
        rating: 4.6,
      },
    ],
  },
  // ... Add more categories as needed
];

const keywords = [
  "Legal Research",
  "Contract Analysis",
  "Compliance",
  "Document Review",
  "Analytics",
  "E-Discovery",
  "Legal Writing",
  "Case Law",
];

export const LegalAITools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 p-6">
      {/* Quick Access and Search */}
      <div className="space-y-6">
        <Card className="p-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2">
              {keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search AI tools and agents..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Legal Research Assistant</CommandItem>
              <CommandItem>Contract Analysis</CommandItem>
              <CommandItem>Document Review</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            agentCount={category.agentCount}
          />
        ))}
      </div>

      {/* Agent Listings */}
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id.toString()}>
            <AccordionTrigger className="text-lg font-semibold">
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {category.agents.map((agent) => (
                  <AgentCard
                    key={agent.name}
                    name={agent.name}
                    description={agent.description}
                    status={agent.status}
                    rating={agent.rating}
                    onQuickStart={() => console.log("Quick Start:", agent.name)}
                    onViewDetails={() => console.log("View Details:", agent.name)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};