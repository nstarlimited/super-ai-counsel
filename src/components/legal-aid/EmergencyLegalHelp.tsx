import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Clock, AlertTriangle, Phone, BookOpen, Users, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EmergencyResource {
  id: string;
  title: string;
  description: string;
  resource_type: string;
  url: string;
}

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  outcome: string;
  case_type: string;
}

export function EmergencyLegalHelp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [resources, setResources] = useState<EmergencyResource[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
    fetchStories();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_resources')
        .select('*');
      
      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*');
      
      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching success stories:', error);
    }
  };

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
              {resources.map((resource) => (
                <Card key={resource.id} className="p-4">
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                  <p className="text-muted-foreground mt-1">{resource.description}</p>
                  {resource.url && (
                    <Button variant="link" className="mt-2 p-0" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Access Resource
                      </a>
                    </Button>
                  )}
                </Card>
              ))}
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
              <p className="text-muted-foreground">
                Contact our emergency response team at 1-800-LEGAL-911
              </p>
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
              {stories.map((story) => (
                <Card key={story.id} className="p-4">
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{story.description}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Outcome: </span>
                    <span className="text-sm text-muted-foreground">{story.outcome}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-sm font-medium">Case Type: </span>
                    <span className="text-sm text-muted-foreground">{story.case_type}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
