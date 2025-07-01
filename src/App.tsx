import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { Navigation } from './components/Navigation'
import './App.css'

function App() {
  try {
    const { user, loading, error } = useAuth()

    if (loading) {
      return (
        <div className="auth-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        </div>
      )
    }

    // Show authentication errors
    if (error && !user) {
      return (
        <div className="auth-container">
          <div className="auth-form">
            <h2>Connection Issue</h2>
            <div className="error-message">
              <p>Unable to connect to authentication service.</p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>
                This is expected until Supabase credentials are configured.
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
      )
    }

    if (!user) {
      return (
        <div className="auth-container">
          <AuthForm />
        </div>
      )
    }

    return <Navigation />
  } catch (error) {
    console.error('App error:', error)
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Something went wrong</h2>
          <div className="error-message">
            <p>The app encountered an error. Please refresh the page.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App