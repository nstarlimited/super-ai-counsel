import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const LegalNews = () => {
  const { data: news } = useQuery({
    queryKey: ["legal-news"],
    queryFn: async () => {
      const { data } = await supabase.from("legal_news").select("*");
      return data || [];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Legal News & Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news?.map((item) => (
            <div key={item.id} className="border-b pb-3 last:border-0">
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{item.source}</span>
                <span className="text-xs text-gray-500">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-gray-400 mt-2">*This is mock data for beta testing</div>
      </CardContent>
    </Card>
  );
};