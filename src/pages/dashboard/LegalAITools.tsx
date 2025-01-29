import { useState, useEffect } from "react";
import { SearchTools } from "@/components/legal-ai/SearchTools";
import { CategoryCard } from "@/components/legal-ai/CategoryCard";
import { categories } from "@/data/legalAICategories";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const LegalAITools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadBookmarks();
    trackPageView();
  }, []);

  const loadBookmarks = async () => {
    const { data, error } = await supabase
      .from('ai_agent_bookmarks')
      .select('agent_name');
    
    if (error) {
      console.error('Error loading bookmarks:', error);
      return;
    }

    setBookmarks(data.map(b => b.agent_name));
  };

  const trackPageView = async () => {
    const { error } = await supabase
      .from('ai_agent_analytics')
      .insert({
        interaction_type: 'page_view',
        session_duration: 0,
        agent_name: 'all'
      });

    if (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const toggleBookmark = async (agentName: string) => {
    const isBookmarked = bookmarks.includes(agentName);
    
    if (isBookmarked) {
      const { error } = await supabase
        .from('ai_agent_bookmarks')
        .delete()
        .eq('agent_name', agentName);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove bookmark",
          variant: "destructive",
        });
        return;
      }

      setBookmarks(prev => prev.filter(b => b !== agentName));
      toast({
        title: "Bookmark removed",
        description: `${agentName} has been removed from your bookmarks`,
      });
    } else {
      const { error } = await supabase
        .from('ai_agent_bookmarks')
        .insert({ agent_name: agentName });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add bookmark",
          variant: "destructive",
        });
        return;
      }

      setBookmarks(prev => [...prev, agentName]);
      toast({
        title: "Bookmark added",
        description: `${agentName} has been added to your bookmarks`,
      });
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.agents.some(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="space-y-8 p-6">
      <SearchTools searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="relative">
            <CategoryCard
              title={category.title}
              description={category.description}
              icon={category.icon}
              agentCount={category.agentCount}
              agents={category.agents}
            />
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleBookmark(category.title)}
              >
                {bookmarks.includes(category.title) ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalAITools;