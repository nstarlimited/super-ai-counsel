import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Star } from "lucide-react";

interface AgentCardProps {
  name: string;
  description: string;
  status: "available" | "busy";
  rating: number;
  onQuickStart: () => void;
  onViewDetails: () => void;
}

export const AgentCard = ({
  name,
  description,
  status,
  rating,
  onQuickStart,
  onViewDetails,
}: AgentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={status === "available" ? "secondary" : "outline"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <Button onClick={onQuickStart} className="flex-1">
            Quick Start
          </Button>
          <Button variant="outline" onClick={onViewDetails} className="flex-1">
            Details
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};