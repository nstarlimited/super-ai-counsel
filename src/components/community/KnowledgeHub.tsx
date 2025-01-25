import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ThumbsUp, BookMarked } from "lucide-react";

const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Guide to Contract Law",
    description: "Comprehensive guide covering contract formation, terms, and enforcement.",
    category: "Contracts",
    likes: 234,
    bookmarks: 156,
  },
  {
    id: 2,
    title: "Legal Research Techniques",
    description: "Learn effective legal research methods and tools.",
    category: "Research",
    likes: 189,
    bookmarks: 123,
  },
  {
    id: 3,
    title: "Understanding Civil Procedure",
    description: "Step-by-step guide to civil litigation procedures.",
    category: "Civil Law",
    likes: 167,
    bookmarks: 98,
  },
];

export function KnowledgeHub() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_RESOURCES.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{resource.category}</Badge>
            </div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {resource.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{resource.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                <span>{resource.bookmarks}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}