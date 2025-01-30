import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Competition {
  id: string;
  title: string;
  description: string;
  type: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  status: string;
  max_participants?: number;
}

interface CompetitionsListProps {
  competitions?: Competition[];
  isLoading: boolean;
}

export function CompetitionsList({ competitions, isLoading }: CompetitionsListProps) {
  const { toast } = useToast();

  const handleRegister = async (competitionId: string, title: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to register for competitions.",
          variant: "destructive",
        });
        return;
      }

      // Check if already registered using maybeSingle() instead of single()
      const { data: existingRegistration, error: checkError } = await supabase
        .from("competition_participants")
        .select()
        .eq("competition_id", competitionId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking registration:", checkError);
        throw checkError;
      }

      if (existingRegistration) {
        toast({
          title: "Already registered",
          description: "You are already registered for this competition.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("competition_participants")
        .insert([{
          competition_id: competitionId,
          user_id: user.id,
        }]);

      if (error) throw error;

      toast({
        title: "Registration successful!",
        description: `You have successfully registered for ${title}.`,
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error registering for the competition. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading competitions...</div>;
  }

  if (!competitions?.length) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No competitions found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {competitions?.map((competition) => (
        <Card key={competition.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{competition.title}</CardTitle>
              <Badge variant={competition.status === 'upcoming' ? 'secondary' : 'default'}>
                {competition.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow flex flex-col">
            <p className="text-sm text-muted-foreground">{competition.description}</p>
            
            <div className="space-y-2 flex-grow">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4" />
                <span>Type: {competition.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Starts: {format(new Date(competition.start_date), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Registration Deadline: {format(new Date(competition.registration_deadline), 'PPP')}</span>
              </div>
              {competition.max_participants && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Max Participants: {competition.max_participants}</span>
                </div>
              )}
            </div>

            <Button 
              className="w-full mt-auto"
              onClick={() => handleRegister(competition.id, competition.title)}
            >
              Register Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}