import { useState } from 'react'

import './App.css'
import LeadsList from './pages/LeadsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LeadsList/>
    </>
  )
}

export default App
