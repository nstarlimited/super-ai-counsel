import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Shield, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function EmergencyLegalHelp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit an emergency legal help request.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("legal_aid_cases")
        .insert([
          {
            title,
            description,
            location,
            required_expertise: ["emergency"],
            posted_by: user.id,
            status: "urgent",
          },
        ]);

      if (error) throw error;

      toast({
        title: "Request submitted",
        description: "Your emergency legal help request has been submitted. A legal professional will contact you soon.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Emergency Legal Help</h2>
        <AlertTriangle className="h-6 w-6 text-red-500" />
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Request Immediate Assistance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Brief Title of Emergency
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Urgent Restraining Order Needed"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Describe Your Situation
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide details about your emergency legal situation..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Your Location
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
              Submit Emergency Request
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>We aim to respond to emergency requests within 1 hour</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}