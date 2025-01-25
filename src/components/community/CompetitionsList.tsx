import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users } from "lucide-react";
import { format } from "date-fns";

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
      {competitions.map((competition) => (
        <Card key={competition.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{competition.title}</CardTitle>
              <Badge variant={competition.status === 'upcoming' ? 'secondary' : 'default'}>
                {competition.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{competition.description}</p>
            
            <div className="space-y-2">
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

            <Button className="w-full">Register Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}