import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import PatientDashboard from './pages/dashboards/PatientDashboard'
import DoctorDashboard from './pages/dashboards/DoctorDashboard'

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login />} />
        {/* Dashboard routes */}
        <Route path='/patient/dashboard' element={<PatientDashboard />} />
        <Route path='/doctor/dashboard' element={<DoctorDashboard />} />

      </Routes>
    </Router>
  )
}

export default App