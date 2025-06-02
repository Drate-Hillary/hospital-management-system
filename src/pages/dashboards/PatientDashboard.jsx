import React from 'react'
import PatientSideBar from '../../components/asideBar/PatientSideBar'
import './dashboard.css'
import { IoNotificationsOutline } from "react-icons/io5";

const PatientDashboard = () => {
  return (
    <>

      <PatientSideBar />

      <header>
        <h1>Welcome, Hillary</h1>

        <span className="profile">
          <span className="notification" data-count="3" >
            <IoNotificationsOutline data-count="3" />
          </span>
          <img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
        </span>
      </header>

      <div className="profile-content">
          <table>
            <tr>
              <td>
                
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>

      <div className="notification-content">

      </div>

      <section className='main-content'>

        <div class="dashboard-grid">
          <div class="card">
            <h3>Upcoming Appointments</h3>
            <span class="span-section">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="" />
              <p>
                <span>Doctor's Name: <span class="span2">Dr. Smith</span></span>
                <span>Date: 25 Apr, 2025</span>
                <span>Time: 10:00 AM</span>
              </p>
            </span>
            <button onclick="showSection('appointments')">Book New</button>
          </div>
          <div class="card">
            <h3>Health Summary</h3>
            <p>Last Checkup: 15 Apr 2025</p>
            <button onclick="showSection('records')">View Records</button>
          </div>
          <div class="card">
            <h3>Prescriptions</h3>
            <p>Active: 2 Medications</p>
            <button onclick="showSection('prescriptions')">View Prescriptions</button>
          </div>
          <div class="card">
            <h3>Billing</h3>
            <p>Pending: $150</p>
            <button onclick="showSection('billing')">Pay Now</button>
          </div>
        </div>

      </section>
    </>
  )
}

export default PatientDashboard