export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          goal: number
          raised: number
          backers: number
          days_left: number
          category: string | null
          creator_id: string
          created_at: string
          updated_at: string
          status: 'active' | 'funded' | 'closed'
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string
          goal: number
          raised?: number
          backers?: number
          days_left: number
          category?: string | null
          creator_id: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'funded' | 'closed'
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          goal?: number
          raised?: number
          backers?: number
          days_left?: number
          category?: string | null
          creator_id?: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'funded' | 'closed'
        }
      }
      pledges: {
        Row: {
          id: string
          project_id: string
          user_id: string
          amount: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          amount?: number
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
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
  }
}

