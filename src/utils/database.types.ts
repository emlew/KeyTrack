export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          description: string | null
          id: number
          location: string | null
          name: string | null
          time: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          location?: string | null
          name?: string | null
          time?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          location?: string | null
          name?: string | null
          time?: string | null
        }
        Relationships: []
      }
      hours: {
        Row: {
          created_at: string
          date_completed: string | null
          event_id: number | null
          has_event: boolean
          hours: number
          id: number
          is_approved: boolean
          shift_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date_completed?: string | null
          event_id?: number | null
          has_event: boolean
          hours: number
          id?: number
          is_approved: boolean
          shift_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date_completed?: string | null
          event_id?: number | null
          has_event?: boolean
          hours?: number
          id?: number
          is_approved?: boolean
          shift_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hours_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hours_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: number
          is_admin: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          is_admin?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          is_admin?: boolean
        }
        Relationships: []
      }
      shifts: {
        Row: {
          created_at: string
          end_time: string | null
          event_id: number | null
          id: number
          is_full: boolean | null
          start_time: string | null
          workers_needed: number | null
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          event_id?: number | null
          id?: number
          is_full?: boolean | null
          start_time?: string | null
          workers_needed?: number | null
        }
        Update: {
          created_at?: string
          end_time?: string | null
          event_id?: number | null
          id?: number
          is_full?: boolean | null
          start_time?: string | null
          workers_needed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          created_at: string
          email: string
          id: number
          shift: number
          event_id: number
        }
        Insert: {
          created_at?: string
          email?: string
          id?: number
          shift: number
          event_id: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          shift?: number
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workers_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "workers_shift_fkey"
            columns: ["shift"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_workers_by_event: {
        Args: {
          event: number
        }
        Returns: {
          id: number
          created_at: string
          email: string
          shift: number
        }[]
      }
      manage_workers_by_shifts: {
        Args: {
          shifts_to_add: number[]
          shifts_to_delete: number[]
        }
        Returns: undefined
      }
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
