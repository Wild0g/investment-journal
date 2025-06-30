import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Investment Journal</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Building MVP - Week 1, Day 1: Foundation Setup
        </p>
      </div>
      <p className="read-the-docs">
        AI-coached trading analytics for Indian investors
      </p>
    </div>
  )
}

export default App