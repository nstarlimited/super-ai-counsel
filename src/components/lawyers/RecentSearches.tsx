import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Search } from "lucide-react";

export const RecentSearches = () => {
  const { data: searches } = useQuery({
    queryKey: ["recent-searches"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("lawyer_search_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  if (!searches?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Searches</h2>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {searches.map((search) => (
            <Button
              key={search.id}
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                // Implement search rerun logic
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              <div className="flex flex-col items-start">
                <span>{search.search_query}</span>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(search.created_at).toLocaleDateString()}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};