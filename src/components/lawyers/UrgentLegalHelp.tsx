import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LawyerCard } from "./LawyerCard";
import { Lawyer } from "@/types/lawyer";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

export const UrgentLegalHelp = () => {
  const { data: urgentLawyers } = useQuery({
    queryKey: ["urgent-lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*, profiles(avatar_url)")
        .eq("immediate_consultation", true)
        .eq("availability_status", "available")
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

  if (!urgentLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <h2 className="text-2xl font-bold">Urgent Legal Help – Available Now</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary">
          <Clock className="h-4 w-4 mr-1" />
          24/7 Available
        </Badge>
        <Badge variant="secondary">Emergency Services</Badge>
        <Badge variant="secondary">Pro Bono Options</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {urgentLawyers.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};