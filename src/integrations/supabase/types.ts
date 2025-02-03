export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_agent_analytics: {
        Row: {
          agent_name: string
          created_at: string
          id: string
          interaction_type: string
          session_duration: number
          user_id: string | null
        }
        Insert: {
          agent_name: string
          created_at?: string
          id?: string
          interaction_type: string
          session_duration: number
          user_id?: string | null
        }
        Update: {
          agent_name?: string
          created_at?: string
          id?: string
          interaction_type?: string
          session_duration?: number
          user_id?: string | null
        }
        Relationships: []
      }
      ai_agent_bookmarks: {
        Row: {
          agent_name: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          agent_name: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          agent_name?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      case_applications: {
        Row: {
          applicant_id: string | null
          case_id: string | null
          created_at: string
          id: string
          message: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          applicant_id?: string | null
          case_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          applicant_id?: string | null
          case_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_applications_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_aid_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_updates: {
        Row: {
          case_id: string | null
          created_at: string
          id: string
          posted_by: string | null
          update_text: string
          update_type: string | null
        }
        Insert: {
          case_id?: string | null
          created_at?: string
          id?: string
          posted_by?: string | null
          update_text: string
          update_type?: string | null
        }
        Update: {
          case_id?: string | null
          created_at?: string
          id?: string
          posted_by?: string | null
          update_text?: string
          update_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_updates_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_aid_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_participants: {
        Row: {
          competition_id: string | null
          id: string
          registration_date: string
          status: string | null
          team_name: string | null
          user_id: string | null
        }
        Insert: {
          competition_id?: string | null
          id?: string
          registration_date?: string
          status?: string | null
          team_name?: string | null
          user_id?: string | null
        }
        Update: {
          competition_id?: string | null
          id?: string
          registration_date?: string
          status?: string | null
          team_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_participants_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          created_at: string
          description: string
          end_date: string
          id: string
          max_participants: number | null
          prize_details: Json | null
          registration_deadline: string
          rules: string | null
          start_date: string
          status: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          id?: string
          max_participants?: number | null
          prize_details?: Json | null
          registration_deadline: string
          rules?: string | null
          start_date: string
          status?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          max_participants?: number | null
          prize_details?: Json | null
          registration_deadline?: string
          rules?: string | null
          start_date?: string
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      emergency_resources: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          id: string
          resource_type: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          resource_type: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          resource_type?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          downvotes: number | null
          forum_id: string | null
          id: string
          title: string
          updated_at: string
          upvotes: number | null
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          downvotes?: number | null
          forum_id?: string | null
          id?: string
          title: string
          updated_at?: string
          upvotes?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          downvotes?: number | null
          forum_id?: string | null
          id?: string
          title?: string
          updated_at?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_forum_id_fkey"
            columns: ["forum_id"]
            isOneToOne: false
            referencedRelation: "forums"
            referencedColumns: ["id"]
          },
        ]
      }
      forums: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      group_events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          event_date: string
          group_id: string | null
          id: string
          is_online: boolean | null
          location: string | null
          max_participants: number | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          event_date: string
          group_id?: string | null
          id?: string
          is_online?: boolean | null
          location?: string | null
          max_participants?: number | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          event_date?: string
          group_id?: string | null
          id?: string
          is_online?: boolean | null
          location?: string | null
          max_participants?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_events_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_memberships: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string
          role: string
          status: string
          subscription_id: string | null
          subscription_status: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string
          role: string
          status?: string
          subscription_id?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string
          role?: string
          status?: string
          subscription_id?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          is_private: boolean | null
          max_members: number | null
          membership_type: string
          name: string
          price_id: string | null
          updated_at: string
          visibility: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          is_private?: boolean | null
          max_members?: number | null
          membership_type: string
          name: string
          price_id?: string | null
          updated_at?: string
          visibility?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          is_private?: boolean | null
          max_members?: number | null
          membership_type?: string
          name?: string
          price_id?: string | null
          updated_at?: string
          visibility?: string
        }
        Relationships: []
      }
      knowledge_resources: {
        Row: {
          bookmarks: number | null
          category: string
          content: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          likes: number | null
          title: string
        }
        Insert: {
          bookmarks?: number | null
          category: string
          content: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          likes?: number | null
          title: string
        }
        Update: {
          bookmarks?: number | null
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          likes?: number | null
          title?: string
        }
        Relationships: []
      }
      lawyer_consultations: {
        Row: {
          client_id: string | null
          consultation_type: string
          created_at: string
          duration_minutes: number
          id: string
          lawyer_id: string | null
          payment_amount: number
          payment_status: string | null
          scheduled_at: string
          status: string | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          consultation_type: string
          created_at?: string
          duration_minutes: number
          id?: string
          lawyer_id?: string | null
          payment_amount: number
          payment_status?: string | null
          scheduled_at: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          consultation_type?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          lawyer_id?: string | null
          payment_amount?: number
          payment_status?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_consultations_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_profiles: {
        Row: {
          accepts_document_sharing: boolean | null
          availability_status: string | null
          awards: Json | null
          bar_memberships: Json | null
          case_history: Json | null
          certifications: Json | null
          consultation_fee: number | null
          created_at: string | null
          education: Json | null
          firm_name: string | null
          hourly_rate: number | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          liability_insurance_verified: boolean | null
          location: string | null
          membership_type: string | null
          professional_associations: Json | null
          rating: number | null
          response_time: string | null
          specializations: string[] | null
          success_rate: number | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          verification_documents: Json | null
          verification_status: string | null
          video_consultation_available: boolean | null
          years_experience: number | null
        }
        Insert: {
          accepts_document_sharing?: boolean | null
          availability_status?: string | null
          awards?: Json | null
          bar_memberships?: Json | null
          case_history?: Json | null
          certifications?: Json | null
          consultation_fee?: number | null
          created_at?: string | null
          education?: Json | null
          firm_name?: string | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          liability_insurance_verified?: boolean | null
          location?: string | null
          membership_type?: string | null
          professional_associations?: Json | null
          rating?: number | null
          response_time?: string | null
          specializations?: string[] | null
          success_rate?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
          video_consultation_available?: boolean | null
          years_experience?: number | null
        }
        Update: {
          accepts_document_sharing?: boolean | null
          availability_status?: string | null
          awards?: Json | null
          bar_memberships?: Json | null
          case_history?: Json | null
          certifications?: Json | null
          consultation_fee?: number | null
          created_at?: string | null
          education?: Json | null
          firm_name?: string | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          liability_insurance_verified?: boolean | null
          location?: string | null
          membership_type?: string | null
          professional_associations?: Json | null
          rating?: number | null
          response_time?: string | null
          specializations?: string[] | null
          success_rate?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
          video_consultation_available?: boolean | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_profiles_profiles_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_review_categories: {
        Row: {
          communication_rating: number | null
          created_at: string
          id: string
          knowledge_rating: number | null
          review_id: string | null
          value_rating: number | null
        }
        Insert: {
          communication_rating?: number | null
          created_at?: string
          id?: string
          knowledge_rating?: number | null
          review_id?: string | null
          value_rating?: number | null
        }
        Update: {
          communication_rating?: number | null
          created_at?: string
          id?: string
          knowledge_rating?: number | null
          review_id?: string | null
          value_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_review_categories_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "lawyer_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_reviews: {
        Row: {
          created_at: string | null
          id: string
          lawyer_id: string | null
          rating: number | null
          review_text: string | null
          reviewer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lawyer_id?: string | null
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lawyer_id?: string | null
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_reviews_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_aid_cases: {
        Row: {
          assigned_to: string | null
          compensation_details: string | null
          created_at: string
          deadline: string | null
          description: string
          id: string
          is_pro_bono: boolean | null
          location: string | null
          posted_by: string | null
          required_expertise: string[]
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          compensation_details?: string | null
          created_at?: string
          deadline?: string | null
          description: string
          id?: string
          is_pro_bono?: boolean | null
          location?: string | null
          posted_by?: string | null
          required_expertise: string[]
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          compensation_details?: string | null
          created_at?: string
          deadline?: string | null
          description?: string
          id?: string
          is_pro_bono?: boolean | null
          location?: string | null
          posted_by?: string | null
          required_expertise?: string[]
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_jobs: {
        Row: {
          company: string
          created_at: string
          description: string | null
          id: string
          job_type: string
          location: string
          requirements: string[] | null
          salary_range: string | null
          title: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          id?: string
          job_type: string
          location: string
          requirements?: string[] | null
          salary_range?: string | null
          title: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          job_type?: string
          location?: string
          requirements?: string[] | null
          salary_range?: string | null
          title?: string
        }
        Relationships: []
      }
      legal_news: {
        Row: {
          category: string | null
          content: string
          id: string
          published_at: string
          source: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content: string
          id?: string
          published_at?: string
          source?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string
          id?: string
          published_at?: string
          source?: string | null
          title?: string
        }
        Relationships: []
      }
      live_sessions: {
        Row: {
          created_at: string
          description: string
          host_id: string | null
          id: string
          is_premium: boolean | null
          price_id: string | null
          recording_url: string | null
          scheduled_end: string
          scheduled_start: string
          status: string | null
          stream_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          host_id?: string | null
          id?: string
          is_premium?: boolean | null
          price_id?: string | null
          recording_url?: string | null
          scheduled_end: string
          scheduled_start: string
          status?: string | null
          stream_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          host_id?: string | null
          id?: string
          is_premium?: boolean | null
          price_id?: string | null
          recording_url?: string | null
          scheduled_end?: string
          scheduled_start?: string
          status?: string | null
          stream_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      session_participants: {
        Row: {
          id: string
          joined_at: string
          payment_id: string | null
          payment_status: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string
          payment_id?: string | null
          payment_status?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string
          payment_id?: string | null
          payment_status?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_questions: {
        Row: {
          answered_at: string | null
          created_at: string
          id: string
          question: string
          session_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          answered_at?: string | null
          created_at?: string
          id?: string
          question: string
          session_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          answered_at?: string | null
          created_at?: string
          id?: string
          question?: string
          session_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_questions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      success_stories: {
        Row: {
          case_type: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          outcome: string
          title: string
        }
        Insert: {
          case_type: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          outcome: string
          title: string
        }
        Update: {
          case_type?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          outcome?: string
          title?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_connections: {
        Row: {
          created_at: string
          id: string
          recipient_id: string | null
          requester_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          recipient_id?: string | null
          requester_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          recipient_id?: string | null
          requester_id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      user_deadlines: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          id: string
          priority: string | null
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_ratings: {
        Row: {
          created_at: string
          id: string
          rated_user_id: string | null
          rater_id: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          rated_user_id?: string | null
          rater_id?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          rated_user_id?: string | null
          rater_id?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      user_reviews: {
        Row: {
          created_at: string
          id: string
          review_text: string
          reviewed_user_id: string | null
          reviewer_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          review_text: string
          reviewed_user_id?: string | null
          reviewer_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          review_text?: string
          reviewed_user_id?: string | null
          reviewer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
