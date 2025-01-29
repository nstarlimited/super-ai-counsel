import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { AgentDetailsDialog } from "./AgentDetailsDialog";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  agentCount: number;
  agents?: Array<{
    name: string;
    description: string;
    status: "available" | "busy";
    rating: number;
  }>;
}

export const CategoryCard = ({
  title,
  description,
  icon: Icon,
  agentCount,
  agents = [],
}: CategoryCardProps) => {
  const [selectedAgent, setSelectedAgent] = useState<CategoryCardProps["agents"][number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAgentClick = (agent: CategoryCardProps["agents"][number]) => {
    setSelectedAgent(agent);
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Badge variant="secondary" className="shrink-0">{agentCount} Agents</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          {agents.length > 0 && (
            <div className="space-y-2">
              {agents.map((agent) => (
                <Button
                  key={agent.name}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAgentClick(agent)}
                >
                  <span className="truncate">{agent.name}</span>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AgentDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        agent={selectedAgent}
      />
    </>
  );
};