import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CreateForumModal } from "./CreateForumModal";

export function ForumsList() {
  const { data: forums, isLoading } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forums")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading forums...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Forums</h2>
        <CreateForumModal />
      </div>

      {forums?.map((forum) => (
        <Card key={forum.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {forum.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{forum.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Category: {forum.category}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}