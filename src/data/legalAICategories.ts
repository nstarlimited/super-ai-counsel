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
import { LucideIcon } from "lucide-react";

export interface Agent {
  name: string;
  description: string;
  status: "available" | "busy";
  rating: number;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  agentCount: number;
  agents: Agent[];
}

export const categories: Category[] = [
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
        status: "available",
        rating: 4.8,
      },
      {
        name: "Analytics Engine",
        description: "Data-driven insights into market trends and litigation risks",
        status: "available",
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
        status: "available",
        rating: 4.7,
      },
      {
        name: "Contract Analyzer",
        description: "Analyze contracts for risks and compliance",
        status: "busy",
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
        status: "available",
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
        status: "available",
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
        status: "available",
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
        status: "available",
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
        status: "available",
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
        status: "available",
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
        status: "available",
        rating: 4.8,
      },
    ],
  },
];

export const keywords = [
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
