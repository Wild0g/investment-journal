import { createClient, type User, type Session } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Supabase configuration
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjUxNjQxMCwiZXhwIjoxOTU4MDkyNDEwfQ.demo'

// Create Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})

// Authentication helper functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, userData?: { full_name?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) throw error
      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      return { user: null, session: null, error }
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      return { user: null, session: null, error }
    }
  },

  // Sign out current user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<{ user: User | null; error: any }> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    }
  },

  // Get current session
  getCurrentSession: async (): Promise<{ session: Session | null; error: any }> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      return { session: null, error }
    }
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helper types for easier usage
export type { Database } from '../types/database'
export type {
  Profile,
  ProfileInsert,
  ProfileUpdate,
  Portfolio,
  PortfolioInsert,
  PortfolioUpdate,
  Trade,
  TradeInsert,
  TradeUpdate,
  TradeWithPortfolio,
  PortfolioWithTrades,
  ProfileWithPortfolios
} from '../types/database'