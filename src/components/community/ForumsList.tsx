import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp, Users } from "lucide-react";

const MOCK_FORUMS = [
  {
    id: 1,
    title: "Corporate Law",
    description: "Discuss corporate law matters, mergers, acquisitions, and business regulations.",
    topics: 156,
    posts: 1243,
    trending: true,
  },
  {
    id: 2,
    title: "Criminal Law",
    description: "Exchange knowledge about criminal law procedures and cases.",
    topics: 98,
    posts: 876,
    trending: false,
  },
  {
    id: 3,
    title: "Intellectual Property",
    description: "Patents, trademarks, and copyright discussions.",
    topics: 134,
    posts: 967,
    trending: true,
  },
];

export function ForumsList() {
  return (
    <div className="space-y-6">
      {MOCK_FORUMS.map((forum) => (
        <Card key={forum.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {forum.title}
                {forum.trending && (
                  <TrendingUp className="h-4 w-4 text-secondary" />
                )}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{forum.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{forum.topics} Topics</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{forum.posts} Posts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}