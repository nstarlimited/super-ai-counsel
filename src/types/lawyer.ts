import { Database } from "@/integrations/supabase/types";

export type LawyerProfile = Database["public"]["Tables"]["lawyer_profiles"]["Row"];

export interface Lawyer extends LawyerProfile {
  profiles?: {
    avatar_url: string | null;
  };
}