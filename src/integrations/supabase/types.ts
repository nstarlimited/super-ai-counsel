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
