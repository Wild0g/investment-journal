import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type TabType = 'import' | 'portfolio' | 'analytics' | 'settings'

export function Navigation() {
  const [activeTab, setActiveTab] = useState<TabType>('portfolio')
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const tabs = [
    { id: 'import' as TabType, label: 'Import', icon: '📥' },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: '💼' },
    { id: 'analytics' as TabType, label: 'Analytics', icon: '📊' },
    { id: 'settings' as TabType, label: 'Settings', icon: '⚙️' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'import':
        return (
          <div className="tab-content">
            <h2>📥 Import Trades</h2>
            <p>Coming soon: Import your trades from Zerodha CSV files</p>
            <div className="placeholder-card">
              <h3>Zerodha CSV Import</h3>
              <p>Upload your trade reports to automatically sync your portfolio</p>
            </div>
          </div>
        )
      case 'portfolio':
        return (
          <div className="tab-content">
            <h2>💼 Portfolio Overview</h2>
            <p>Coming soon: View your complete investment portfolio</p>
            <div className="placeholder-card">
              <h3>Current Holdings</h3>
              <p>Track your stocks, mutual funds, and other investments</p>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="tab-content">
            <h2>📊 Analytics & Insights</h2>
            <p>Coming soon: AI-powered investment analytics</p>
            <div className="placeholder-card">
              <h3>Performance Analysis</h3>
              <p>Get insights on your trading patterns and performance</p>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="tab-content">
            <h2>⚙️ Settings</h2>
            <p>Manage your account and preferences</p>
            <div className="placeholder-card">
              <h3>Account Settings</h3>
              <p>Update your profile and notification preferences</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      {/* User Header */}
      <header className="user-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <h3>Welcome back!</h3>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="sign-out-btn">
          Sign Out
        </button>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}