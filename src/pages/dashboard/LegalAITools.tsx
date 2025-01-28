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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
  {
    id: 3,
    title: "Compliance and Regulatory",
    description: "Stay compliant with automated regulatory monitoring and updates",
    icon: Shield,
    agentCount: 2,
    agents: [
      {
        name: "Compliance Monitor",
        description: "Real-time regulatory compliance monitoring and alerts",
        status: "available" as const,
        rating: 4.6,
      },
    ],
  },
  {
    id: 4,
    title: "Predictive Analytics",
    description: "Predict case outcomes and analyze litigation trends",
    icon: BarChart,
    agentCount: 2,
    agents: [
      {
        name: "Case Predictor",
        description: "Predict case outcomes using historical data",
        status: "available" as const,
        rating: 4.4,
      },
    ],
  },
  {
    id: 5,
    title: "Practice Management",
    description: "Streamline your practice with AI-powered automation",
    icon: Briefcase,
    agentCount: 2,
    agents: [
      {
        name: "Practice Assistant",
        description: "Automate routine tasks and practice management",
        status: "available" as const,
        rating: 4.5,
      },
    ],
  },
  {
    id: 6,
    title: "Client Engagement",
    description: "Enhance client communication and service delivery",
    icon: MessageSquare,
    agentCount: 2,
    agents: [
      {
        name: "Client Portal",
        description: "AI-powered client communication and service platform",
        status: "available" as const,
        rating: 4.3,
      },
    ],
  },
  {
    id: 7,
    title: "Dispute Resolution",
    description: "AI tools for mediation and dispute resolution",
    icon: Gavel,
    agentCount: 2,
    agents: [
      {
        name: "Mediation Assistant",
        description: "AI-powered mediation and dispute resolution support",
        status: "available" as const,
        rating: 4.2,
      },
    ],
  },
  {
    id: 8,
    title: "Education and Training",
    description: "AI-powered legal education and training tools",
    icon: GraduationCap,
    agentCount: 2,
    agents: [
      {
        name: "Learning Assistant",
        description: "Personalized legal education and training",
        status: "available" as const,
        rating: 4.7,
      },
    ],
  },
  {
    id: 9,
    title: "Ethics and Bias Control",
    description: "Ensure ethical AI use and minimize bias in legal practice",
    icon: ShieldAlert,
    agentCount: 2,
    agents: [
      {
        name: "Ethics Guardian",
        description: "Monitor and control AI bias in legal applications",
        status: "available" as const,
        rating: 4.8,
      },
    ],
  },
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
  "Regulatory Updates",
  "Practice Management",
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
            agents={category.agents}
          />
        ))}
      </div>
    </div>
  );
};
