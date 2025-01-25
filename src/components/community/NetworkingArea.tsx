import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Award, MapPin } from "lucide-react";

const MOCK_MEMBERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Corporate Lawyer",
    location: "New York, USA",
    expertise: ["M&A", "Securities"],
    connections: 234,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "IP Attorney",
    location: "San Francisco, USA",
    expertise: ["Patents", "Trademarks"],
    connections: 189,
  },
  {
    id: 3,
    name: "Emma Williams",
    title: "Criminal Defense Attorney",
    location: "Chicago, USA",
    expertise: ["Criminal Law", "Appeals"],
    connections: 156,
  },
];

export function NetworkingArea() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_MEMBERS.map((member) => (
        <Card key={member.id}>
          <CardHeader>
            <CardTitle className="text-xl">{member.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{member.title}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{member.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              <span>{member.connections} Connections</span>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                Connect
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}