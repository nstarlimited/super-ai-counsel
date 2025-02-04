import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LawyerCard } from "./LawyerCard";
import { Lawyer } from "@/types/lawyer";

export const VerifiedLawyers = () => {
  const { data: verifiedLawyers } = useQuery({
    queryKey: ["verified-lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*, profiles(avatar_url)")
        .eq("is_verified", true)
        .eq("liability_insurance_verified", true)
        .order("rating", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Lawyer[];
    },
  });

  if (!verifiedLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Verified & Trusted Lawyers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {verifiedLawyers.map((lawyer) => (
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