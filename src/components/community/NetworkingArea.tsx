import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MessageModal } from "./MessageModal";
import { useToast } from "@/components/ui/use-toast";

export function NetworkingArea() {
  const { toast } = useToast();
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const handleConnect = async (userId: string, userName: string) => {
    try {
      const { error } = await supabase
        .from("user_connections")
        .insert([{
          requester_id: (await supabase.auth.getUser()).data.user?.id,
          recipient_id: userId,
        }]);

      if (error) throw error;

      toast({
        title: "Connection request sent!",
        description: `Your connection request has been sent to ${userName}.`,
      });
    } catch (error) {
      toast({
        title: "Error sending connection request",
        description: "There was an error sending your connection request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading profiles...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {profiles?.map((profile) => (
        <Card key={profile.id}>
          <CardHeader>
            <CardTitle className="text-xl">
              {profile.first_name} {profile.last_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.city && profile.country && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{profile.city}, {profile.country}</span>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={() => handleConnect(profile.id, `${profile.first_name} ${profile.last_name}`)}
              >
                <Users className="h-4 w-4 mr-2" />
                Connect
              </Button>
              <MessageModal 
                recipientId={profile.id}
                recipientName={`${profile.first_name} ${profile.last_name}`}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}