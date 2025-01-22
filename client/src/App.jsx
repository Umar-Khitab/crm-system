import { useState } from 'react'

import './App.css'
import LeadsList from './pages/LeadsList'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <LeadsList/>

      </Router>
    </>
  )
}

export default App
