import { useState, FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'

interface AuthFormProps {
  onSuccess?: () => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const { signUp, signIn, loading, error, clearError } = useAuth()

  // Clear all errors when switching modes or changing inputs
  const clearAllErrors = () => {
    setFormError(null)
    clearError()
  }

  // Handle mode toggle
  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setFormError(null)
    clearError()
    // Clear form when switching modes
    setEmail('')
    setPassword('')
    setFullName('')
    setConfirmPassword('')
  }

  // Form validation
  const validateForm = (): boolean => {
    if (!email.trim()) {
      setFormError('Email is required')
      return false
    }

    if (!email.includes('@')) {
      setFormError('Please enter a valid email address')
      return false
    }

    if (!password) {
      setFormError('Password is required')
      return false
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long')
      return false
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        setFormError('Full name is required for sign up')
        return false
      }

      if (password !== confirmPassword) {
        setFormError('Passwords do not match')
        return false
      }
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    clearAllErrors()

    if (!validateForm()) {
      return
    }

    try {
      let result

      if (isSignUp) {
        result = await signUp(email.trim(), password, { 
          full_name: fullName.trim() 
        })
      } else {
        result = await signIn(email.trim(), password)
      }

      if (result.success) {
        // Clear form on success
        setEmail('')
        setPassword('')
        setFullName('')
        setConfirmPassword('')
        onSuccess?.()
      }
    } catch (err) {
      console.error('Auth form error:', err)
      setFormError('An unexpected error occurred. Please try again.')
    }
  }

  const displayError = formError || error

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        <p className="text-center text-gray-600 mt-2">
          {isSignUp 
            ? 'Start your investment journey today' 
            : 'Welcome back to your investment journal'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearAllErrors()
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            disabled={loading}
            required
          />
        </div>

        {/* Full Name Input (Sign Up Only) */}
        {isSignUp && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                clearAllErrors()
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              disabled={loading}
              required
            />
          </div>
        )}

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              clearAllErrors()
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            disabled={loading}
            required
            minLength={6}
          />
        </div>

        {/* Confirm Password Input (Sign Up Only) */}
        {isSignUp && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                clearAllErrors()
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
              disabled={loading}
              required
            />
          </div>
        )}

        {/* Error Display */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{displayError}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isSignUp ? 'Creating Account...' : 'Signing In...'}
            </span>
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>

      {/* Toggle Mode */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={toggleMode}
            disabled={loading}
            className="text-blue-600 hover:text-blue-500 font-medium focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>

      {/* Sign Up Success Message */}
      {isSignUp && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our terms of service and privacy policy.
          </p>
        </div>
      )}
    </div>
  )
}