import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { Navigation } from './components/Navigation'
import './App.css'

function App() {
  const { user, loading } = useAuth()

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

  if (!user) {
    return (
      <div className="auth-container">
        <AuthForm />
      </div>
    )
  }

  return <Navigation />
}

export default App