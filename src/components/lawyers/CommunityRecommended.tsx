import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LawyerCard } from "./LawyerCard";
import { Lawyer } from "@/types/lawyer";

export const CommunityRecommended = () => {
  const { data: recommendedLawyers } = useQuery({
    queryKey: ["community-recommended-lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select(`
          *,
          profiles(avatar_url),
          lawyer_reviews(count)
        `)
        .gt("rating", 4)
        .gt("total_reviews", 5)
        .order("rating", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Lawyer[];
    },
  });

  if (!recommendedLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Community Recommended</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedLawyers.map((lawyer) => (
          <LawyerCard
            key={lawyer.id}
            lawyer={lawyer}
            onSelect={() => {}}
            viewMode="grid"
          />
        ))}
      </div>
    </div>
  );
};