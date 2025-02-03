import { Database } from "@/integrations/supabase/types";

export type LawyerProfile = Database["public"]["Tables"]["lawyer_profiles"]["Row"];

export interface Lawyer extends LawyerProfile {
  profiles?: {
    avatar_url: string | null;
  };
  avatar_url?: string;
  accepts_document_sharing: boolean;
  availability_status: string;
  awards: any[];
  bar_memberships: any[];
  case_history: any[];
  certifications: any[];
  consultation_fee: number;
  education: any[];
  firm_name: string | null;
  hourly_rate: number;
  id: string;
  is_featured: boolean;
  is_verified: boolean;
  languages: string[];
  liability_insurance_verified: boolean;
  location: string;
  membership_type: string;
  professional_associations: any[];
  rating: number;
  response_time: string;
  specializations: string[];
  success_rate: number;
  total_reviews: number;
  verification_documents: any[];
  verification_status: string;
  video_consultation_available: boolean;
  years_experience: number;
}