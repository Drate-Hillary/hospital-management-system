import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public route */}
        <Route path='/login' element={<Login />} />
        
        {/* Protected doctor route */}
        <Route 
          path='/doctor/dashboard' 
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected patient route */}
        <Route 
          path='/patient/dashboard'
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path='/' element={<Navigate to='/login' replace />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to='/login' replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;