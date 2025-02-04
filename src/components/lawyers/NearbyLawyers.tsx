import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LawyerCard } from "./LawyerCard";
import { Lawyer } from "@/types/lawyer";
import { Button } from "@/components/ui/button";
import { MapPin, Video } from "lucide-react";

export const NearbyLawyers = () => {
  const { data: nearbyLawyers } = useQuery({
    queryKey: ["nearby-lawyers"],
    queryFn: async () => {
      // In a real app, we would use the user's location
      const location = "Lagos"; // Hardcoded for demo
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*, profiles(avatar_url)")
        .eq("location", location)
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

  if (!nearbyLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lawyers Near You</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            In-Person
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4 mr-2" />
            Online
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nearbyLawyers.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};