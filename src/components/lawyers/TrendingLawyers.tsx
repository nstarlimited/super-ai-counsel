import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LawyerCard } from "./LawyerCard";
import { Lawyer } from "@/types/lawyer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TrendingLawyers = () => {
  const { data: trendingLawyers } = useQuery({
    queryKey: ["trending-lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*, profiles(avatar_url)")
        .order("booking_count", { ascending: false })
        .limit(6);

      if (error) throw error;
      
      return data.map((lawyer): Lawyer => ({
        ...lawyer,
        awards: lawyer.awards as any[] || [],
        bar_memberships: lawyer.bar_memberships as any[] || [],
        case_history: lawyer.case_history as any[] || [],
        certifications: lawyer.certifications as any[] || [],
        education: lawyer.education as any[] || [],
        professional_associations: lawyer.professional_associations as any[] || [],
        verification_documents: lawyer.verification_documents as any[] || [],
        languages: lawyer.languages || [],
        specializations: lawyer.specializations || [],
        is_verified: lawyer.is_verified || false,
        video_consultation_available: lawyer.video_consultation_available || false,
        accepts_document_sharing: lawyer.accepts_document_sharing || false,
        liability_insurance_verified: lawyer.liability_insurance_verified || false,
        success_rate: lawyer.success_rate || 0,
        total_reviews: lawyer.total_reviews || 0,
        rating: lawyer.rating || 0,
        hourly_rate: lawyer.hourly_rate || 0,
        consultation_fee: lawyer.consultation_fee || 0,
        years_experience: lawyer.years_experience || 0,
        availability_status: lawyer.availability_status || 'unavailable',
        membership_type: lawyer.membership_type || 'basic',
        verification_status: lawyer.verification_status || 'pending',
        location: lawyer.location || '',
        response_time: lawyer.response_time || '',
      }));
    },
  });

  if (!trendingLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trending Lawyers</h2>
      <Tabs defaultValue="most-booked">
        <TabsList>
          <TabsTrigger value="most-booked">Most Booked This Week</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="most-booked" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} onSelect={() => {}} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="top-rated" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} onSelect={() => {}} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};