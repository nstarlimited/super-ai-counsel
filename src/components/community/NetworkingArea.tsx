import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MessageModal } from "./MessageModal";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  city: string | null;
  country: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface Connection {
  id: string;
  requester_id: string;
  recipient_id: string;
  status: string;
}

export function NetworkingArea() {
  const { toast } = useToast();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        fetchConnections(user.id);
      }
    };
    getUser();
  }, []);

  const fetchConnections = async (userId: string) => {
    const { data } = await supabase
      .from("user_connections")
      .select("*")
      .or(`requester_id.eq.${userId},recipient_id.eq.${userId}`);
    if (data) {
      setConnections(data);
    }
  };

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const handleConnect = async (userId: string, userName: string) => {
    try {
      if (!currentUserId) {
        toast({
          title: "Authentication required",
          description: "Please sign in to connect with other users.",
          variant: "destructive",
        });
        return;
      }

      const existingConnection = connections.find(
        conn => (conn.requester_id === currentUserId && conn.recipient_id === userId) ||
                (conn.recipient_id === currentUserId && conn.requester_id === userId)
      );

      if (existingConnection) {
        toast({
          title: "Connection exists",
          description: `You already have a connection with ${userName}.`,
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("user_connections")
        .insert([{
          requester_id: currentUserId,
          recipient_id: userId,
        }]);

      if (error) throw error;

      fetchConnections(currentUserId);

      toast({
        title: "Connection request sent!",
        description: `Your connection request has been sent to ${userName}.`,
      });
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Error sending connection request",
        description: "There was an error sending your connection request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getConnectionStatus = (profileId: string) => {
    const connection = connections.find(
      conn => (conn.requester_id === profileId && conn.recipient_id === currentUserId) ||
              (conn.recipient_id === profileId && conn.requester_id === currentUserId)
    );
    return connection?.status || null;
  };

  const getInitials = (firstName: string | null, lastName: string | null) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`;
  };

  if (isLoading) {
    return <div>Loading profiles...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {profiles?.map((profile) => {
        if (profile.id === currentUserId) return null;
        const connectionStatus = getConnectionStatus(profile.id);
        
        return (
          <Card key={profile.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={profile.avatar_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
                    alt={`${profile.first_name} ${profile.last_name}`} 
                  />
                  <AvatarFallback>{getInitials(profile.first_name, profile.last_name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">
                    {profile.first_name} {profile.last_name}
                  </CardTitle>
                  {profile.bio && (
                    <p className="text-sm text-gray-500 mt-1">{profile.bio}</p>
                  )}
                </div>
                {connectionStatus && (
                  <Badge variant="secondary">
                    {connectionStatus}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.city && profile.country && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.city}, {profile.country}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleConnect(profile.id, `${profile.first_name} ${profile.last_name}`)}
                  disabled={!!connectionStatus}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {connectionStatus ? connectionStatus : "Connect"}
                </Button>
                <MessageModal 
                  recipientId={profile.id}
                  recipientName={`${profile.first_name} ${profile.last_name}`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}