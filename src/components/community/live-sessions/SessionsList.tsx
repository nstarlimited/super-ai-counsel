import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Users } from "lucide-react";
import { CreateSessionModal } from "./CreateSessionModal";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Session {
  id: string;
  title: string;
  description: string;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  is_premium: boolean;
}

export function SessionsList() {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["live-sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_sessions")
        .select("*")
        .order("scheduled_start", { ascending: true });
      
      if (error) throw error;
      return data as Session[];
    },
  });

  if (isLoading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Sessions</h2>
        <CreateSessionModal />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions?.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  {session.title}
                </CardTitle>
                <Badge variant={session.is_premium ? "secondary" : "default"}>
                  {session.is_premium ? "Premium" : "Free"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{session.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Starts: {format(new Date(session.scheduled_start), 'PPP p')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Ends: {format(new Date(session.scheduled_end), 'PPP p')}</span>
                </div>
              </div>
              <Button className="w-full">
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}