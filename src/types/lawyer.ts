import { Database } from "@/integrations/supabase/types";

export type LawyerProfile = Database["public"]["Tables"]["lawyer_profiles"]["Row"];

export interface Lawyer {
  id: string;
  user_id?: string | null;
  firm_name: string | null;
  specializations: string[];
  years_experience: number;
  languages: string[];
  hourly_rate: number;
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  location: string;
  availability_status: string;
  created_at?: string | null;
  updated_at?: string | null;
  is_featured: boolean;
  success_rate: number;
  response_time: string;
  education: any[];
  certifications: any[];
  bar_memberships: any[];
  awards: any[];
  professional_associations: any[];
  consultation_fee: number;
  video_consultation_available: boolean;
  accepts_document_sharing: boolean;
  liability_insurance_verified: boolean;
  membership_type: string;
  case_history: any[];
  verification_status: string;
  verification_documents: any[];
  profiles?: {
    avatar_url: string | null;
  };
  avatar_url?: string;
}