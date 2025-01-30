import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ThumbsUp, BookMarked, Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceModal } from "./CreateResourceModal";

export function KnowledgeHub() {
  const { data: resources, isLoading } = useQuery({
    queryKey: ["knowledge_resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("knowledge_resources")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Knowledge Hub</h2>
        <CreateResourceModal />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources?.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{resource.category}</Badge>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
              <div className="flex items-center gap-6 text-sm mt-auto">
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
    </div>
  );
}