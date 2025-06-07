import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigateTo, setNavigateTo] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')

    if (token && userType) {
      fetchUserData(token, userType)
    }else{
      setLoading(false)
    }

  }, []);

  const fetchUserData = async (token, userType) => {
    try {

      const endpoint = userType === 'doctor' ? 'http://localhost:8082/doctor/profile' : 'http://localhost:8082/patient/profile';

      const response = await axios.get(endpoint,{
        headers: {Authorization: `Bearer ${token}`}
      })

      setUser({
        ...response.data.user,
        role: userType,
        token: token
      });

      setNavigateTo(`/${userType}/dashboard`);

    } catch (error) {
      console.error('Failed to fetch user data ', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8082/login', {
        email, password
      })

      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userType', response.data.userType)

        await fetchUserData(response.data.token, response.data.userType)

        return { 
          success: true,
          userType: response.data.userType 
        }
      }

      return { success: false, error: 'Login failed' }

    } catch (error) {
      console.error('Login error', error)
      return { success: false, error: error.response?.data?.error || 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    setUser(null)
    setNavigateTo('/login')
  }

  return (
    <AuthContext.Provider value={{ user,loading, login, logout, navigateTo,setNavigateTo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
}
