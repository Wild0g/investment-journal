// Database schema types for Investment Journal
// Generated for Supabase TypeScript integration

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          investment_experience: 'beginner' | 'intermediate' | 'advanced' | null
          risk_tolerance: 'conservative' | 'moderate' | 'aggressive' | null
          preferred_currency: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          investment_experience?: 'beginner' | 'intermediate' | 'advanced' | null
          risk_tolerance?: 'conservative' | 'moderate' | 'aggressive' | null
          preferred_currency?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          investment_experience?: 'beginner' | 'intermediate' | 'advanced' | null
          risk_tolerance?: 'conservative' | 'moderate' | 'aggressive' | null
          preferred_currency?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          description: string | null
          target_allocation: Record<string, number> | null
          total_value: number
          cash_balance: number
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          description?: string | null
          target_allocation?: Record<string, number> | null
          total_value?: number
          cash_balance?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          name?: string
          description?: string | null
          target_allocation?: Record<string, number> | null
          total_value?: number
          cash_balance?: number
          is_active?: boolean
        }
      }
      trades: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          portfolio_id: string
          user_id: string
          symbol: string
          company_name: string | null
          trade_type: 'buy' | 'sell'
          quantity: number
          price_per_share: number
          total_amount: number
          fees: number
          trade_date: string
          notes: string | null
          sector: string | null
          exchange: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id: string
          user_id: string
          symbol: string
          company_name?: string | null
          trade_type: 'buy' | 'sell'
          quantity: number
          price_per_share: number
          total_amount: number
          fees?: number
          trade_date: string
          notes?: string | null
          sector?: string | null
          exchange?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id?: string
          user_id?: string
          symbol?: string
          company_name?: string | null
          trade_type?: 'buy' | 'sell'
          quantity?: number
          price_per_share?: number
          total_amount?: number
          fees?: number
          trade_date?: string
          notes?: string | null
          sector?: string | null
          exchange?: string | null
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
      investment_experience: 'beginner' | 'intermediate' | 'advanced'
      risk_tolerance: 'conservative' | 'moderate' | 'aggressive'
      trade_type: 'buy' | 'sell'
    }
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Portfolio = Database['public']['Tables']['portfolios']['Row']
export type PortfolioInsert = Database['public']['Tables']['portfolios']['Insert']
export type PortfolioUpdate = Database['public']['Tables']['portfolios']['Update']

export type Trade = Database['public']['Tables']['trades']['Row']
export type TradeInsert = Database['public']['Tables']['trades']['Insert']
export type TradeUpdate = Database['public']['Tables']['trades']['Update']

// Computed types for better developer experience
export type TradeWithPortfolio = Trade & {
  portfolio: Portfolio
}

export type PortfolioWithTrades = Portfolio & {
  trades: Trade[]
}

export type ProfileWithPortfolios = Profile & {
  portfolios: Portfolio[]
}