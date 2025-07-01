import { useState, useEffect, useCallback } from 'react'
import { type User, type Session } from '@supabase/supabase-js'
import { auth, supabase } from '../lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

interface AuthActions {
  signUp: (email: string, password: string, userData?: { full_name?: string }) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<{ success: boolean; error?: string }>
  clearError: () => void
  refreshSession: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Clear error helper
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Initialize auth state and set up listener
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session: initialSession, error } = await auth.getCurrentSession()
        
        if (error) {
          console.error('Error getting initial session:', error)
          setError('Failed to initialize authentication')
        } else {
          setSession(initialSession)
          setUser(initialSession?.user ?? null)
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError('Authentication initialization failed')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Clear any existing errors on successful auth change
        if (session && error) {
          setError(null)
        }
      }
    )

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [error])

  // Sign up function
  const signUp = useCallback(async (
    email: string, 
    password: string, 
    userData?: { full_name?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      setError(null)

      const { user: newUser, error: signUpError } = await auth.signUp(email, password, userData)

      if (signUpError) {
        const errorMessage = signUpError.message || 'Sign up failed'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      if (!newUser) {
        const errorMessage = 'Sign up failed - no user returned'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign in function
  const signIn = useCallback(async (
    email: string, 
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      setError(null)

      const { user: signedInUser, error: signInError } = await auth.signIn(email, password)

      if (signInError) {
        const errorMessage = signInError.message || 'Sign in failed'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      if (!signedInUser) {
        const errorMessage = 'Sign in failed - no user returned'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign out function
  const signOut = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      setError(null)

      const { error: signOutError } = await auth.signOut()

      if (signOutError) {
        const errorMessage = signOutError.message || 'Sign out failed'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh session function
  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const { session: refreshedSession, error } = await auth.getCurrentSession()
      
      if (error) {
        console.error('Error refreshing session:', error)
        setError('Failed to refresh session')
      } else {
        setSession(refreshedSession)
        setUser(refreshedSession?.user ?? null)
      }
    } catch (err) {
      console.error('Session refresh error:', err)
      setError('Session refresh failed')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    // State
    user,
    session,
    loading,
    error,
    // Actions
    signUp,
    signIn,
    signOut,
    clearError,
    refreshSession
  }
}