import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Clock, Award, Zap, Shield, History } from "lucide-react";
import { toast } from "sonner";

interface AgentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: {
    name: string;
    description: string;
    status: "available" | "busy";
    rating: number;
  } | null;
}

export const AgentDetailsDialog = ({
  open,
  onOpenChange,
  agent,
}: AgentDetailsDialogProps) => {
  if (!agent) return null;

  const handleStartSession = () => {
    if (agent.status === "busy") {
      toast.error("This agent is currently busy. Please try again later.");
      return;
    }
    toast.success("Starting session with " + agent.name);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{agent.name}</DialogTitle>
            <Badge variant={agent.status === "available" ? "secondary" : "outline"}>
              {agent.status}
            </Badge>
          </div>
          <DialogDescription>{agent.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span>{agent.rating.toFixed(1)} Rating</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Features</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Real-time assistance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">24/7 availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Specialized expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Fast response time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Secure communication</span>
              </div>
              <div className="flex items-center space-x-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Chat history available</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              className="flex-1" 
              onClick={handleStartSession}
              disabled={agent.status === "busy"}
            >
              Start Session
            </Button>
            <Button variant="outline" className="flex-1">
              View Documentation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};