import { useState } from 'react'

import './App.css'
import LeadsList from './pages/LeadsList'
import AddLead from "./pages/AddLead";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LeadsList />} />
        <Route path="/add" element={<AddLead />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
