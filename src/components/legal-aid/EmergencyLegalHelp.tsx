import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Clock, AlertTriangle, Phone, BookOpen, Users, History } from "lucide-react";
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

      <Tabs defaultValue="request" className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="request">Request Help</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="request">
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
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief title of emergency"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your situation..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Your location (City, State)"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                  Submit Emergency Request
                </Button>
              </form>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>We aim to respond within 1 hour</span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4" />
                  Hotline Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">24/7 Emergency Legal Support</p>
                <Button variant="link" className="mt-2 p-0">1-800-LEGAL-HELP</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4" />
                  Quick Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Access immediate legal guidance</p>
                <Button variant="link" className="mt-2 p-0">View Resources</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4" />
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Connect with support groups</p>
                <Button variant="link" className="mt-2 p-0">Join Community</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Legal Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Resources will be fetched from emergency_resources table */}
                <p className="text-muted-foreground">Loading resources...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directory">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Legal Professionals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Directory will be populated from profiles with emergency expertise */}
                <p className="text-muted-foreground">Loading directory...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stories">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Stories will be fetched from success_stories table */}
                <p className="text-muted-foreground">Loading success stories...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}