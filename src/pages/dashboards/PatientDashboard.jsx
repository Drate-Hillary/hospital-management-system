import React, { useEffect, useRef, useState } from 'react'
import PatientSideBar from '../../components/asideBar/PatientSideBar'
import './dashboard.css'
import './ChangePassword.css'
import './Notification.css'
import { IoNotificationsOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoIosClose, IoIosNotifications } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'


const ChangePassword = ({ onClose }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!passwords.current) {
      newErrors.current = 'Current password is required';
    }

    if (!passwords.new) {
      newErrors.new = 'New password is required';
    } else if (passwords.new.length < 8) {
      newErrors.new = 'Password must be at least 8 characters';
    }

    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Password change submitted:', passwords);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className='changePassword-wrapper'>
        <div className='changePassword-header'>
          <h4>Change Password</h4>
          <IoIosClose
            className='close'
            onClick={onClose}
            aria-label="Close password change modal"
          />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-wrapper">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              name="current"
              type={showPasswords.current ? "text" : "password"}
              placeholder='Enter your current password'
              value={passwords.current}
              onChange={handleInputChange}
              className={errors.current ? 'error' : ''}
            />
            <button
              type="button"
              className="eye"
              onClick={() => togglePasswordVisibility('current')}
              aria-label={showPasswords.current ? "Hide password" : "Show password"}
            >
              {showPasswords.current ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
            {errors.current && <span className="error-message">{errors.current}</span>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              name="new"
              type={showPasswords.new ? "text" : "password"}
              placeholder='Enter a new password'
              value={passwords.new}
              onChange={handleInputChange}
              className={errors.new ? 'error' : ''}
            />
            <button
              type="button"
              className="eye"
              onClick={() => togglePasswordVisibility('new')}
              aria-label={showPasswords.new ? "Hide password" : "Show password"}
            >
              {showPasswords.new ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
            {errors.new && <span className="error-message">{errors.new}</span>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirm"
              type={showPasswords.confirm ? "text" : "password"}
              placeholder='Confirm your new password'
              value={passwords.confirm}
              onChange={handleInputChange}
              className={errors.confirm ? 'error' : ''}
            />
            <button
              type="button"
              className="eye"
              onClick={() => togglePasswordVisibility('confirm')}
              aria-label={showPasswords.confirm ? "Hide password" : "Show password"}
            >
              {showPasswords.confirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
            {errors.confirm && <span className="error-message">{errors.confirm}</span>}
          </div>

          <div className="btns">
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const Notification = ({ onClose, notifications, setNotifications }) => {

  const markAllAsRead = () => {
    setNotifications(notifs =>
      notifs.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="notification-wrapper">
        <div className="notification-header">
          <IoIosNotifications className="notification-icon" />
          <IoIosClose className="close-icon" onClick={onClose} />
        </div>

        <div className="notification-content">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            >
              <img
                src={notification.image}
                alt="Notification"
                className="notification-image"
              />
              <div className="notification-details">
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="notification-footer">
          <a
            className="mark-all-read-btn"
            onClick={markAllAsRead}
          >
            Mark all as read
          </a>
        </div>
      </div>
    </>
  );
};


const PatientDashboard = () => {

  const [showProfileContent, setShowProfileContent] = useState(false)
  const [showChangePassword, setChangePassword] = useState(false)
  const [showNotiication, setShowNotiification] = useState(false)
  const profileContentRef = useRef(null)
  const profileImageRef = useRef(null)
  const { user, logout } = useAuth();
  const [patientData, setPatientData] = useState(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Let's meet in my office",
      time: "10:00pm",
      read: false,
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 2,
      message: "Your lab results are ready",
      time: "Yesterday",
      read: false,
      image: "data:image/png;base64,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"
    },
    {
      id: 3,
      message: "Appointment reminder for tomorrow",
      time: "2 days ago",
      read: true,
      image: "https://media.istockphoto.com/id/1346125184/photo/confident-male-doctor-in-white-coat-standing-with-clipboard.jpg"
    },
    {
      id: 4,
      message: "Appointment reminder for tomorrow",
      time: "2 days ago",
      read: true,
      image: "https://media.istockphoto.com/id/1346125184/photo/confident-male-doctor-in-white-coat-standing-with-clipboard.jpg"
    },
    {
      id: 5,
      message: "Appointment reminder for tomorrow",
      time: "2 days ago",
      read: false,
      image: "https://media.istockphoto.com/id/1346125184/photo/confident-male-doctor-in-white-coat-standing-with-clipboard.jpg"
    },
    {
      id: 6,
      message: "Appointment reminder for tomorrow",
      time: "2 days ago",
      read: true,
      image: "https://media.istockphoto.com/id/1346125184/photo/confident-male-doctor-in-white-coat-standing-with-clipboard.jpg"
    },
    {
      id: 7,
      message: "Appointment reminder for tomorrow",
      time: "2 days ago",
      read: true,
      image: "https://media.istockphoto.com/id/1346125184/photo/confident-male-doctor-in-white-coat-standing-with-clipboard.jpg"
    },
  ]);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/patient/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPatientData(response.data)
      } catch (error) {
        console.error('error fetching patient data ', error)
      }
    }

    fetchUserData();
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showProfileContent &&
        profileContentRef.current && !profileContentRef.current.contains(e.target) &&
        profileImageRef.current && !profileImageRef.current.contains(e.target)
      ) {
        closeProfileContent()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileContent])

  const toggleProfileContent = () => {
    setShowProfileContent(!showProfileContent)
  };

  const closeProfileContent = () => {
    setShowProfileContent(false)
  };

  const handleChangePasswordClick = (e) => {
    e.preventDefault()
    setChangePassword(true)
  }

  const closeChangePasswordForm = () => {
    setChangePassword(false)
  }

  const closeNotificationForm = () => {
    setShowNotiification(false)
  }

  const handleNotificationClick = (e) => {
    e.preventDefault()
    setShowNotiification(true)
  }

  if (!user || !patientData) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <PatientSideBar />

      <header>
        <h1>Welcome, {user.name}</h1>

        <span className="profile">
          <span className="notification" data-count={unreadCount} >
            <a href='#'
              onClick={handleNotificationClick}
            >
              <IoNotificationsOutline />
            </a>
          </span>
          <img
            src="data:image/jpeg;base64,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"
            alt="Patient"
            ref={profileImageRef}
            onClick={toggleProfileContent}
          />
        </span>

        {
          showProfileContent && (
            <div className="profile-content" ref={profileContentRef}>
              <IoIosClose className='close' onClick={closeProfileContent} />
              <div className="profile-card">
                <span className='profile-image'>
                  <img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                  <p>{user.name}</p>
                </span>
                <span className='change'>
                  <IoLockClosedOutline />
                  <a href="#" onClick={handleChangePasswordClick} >Change Password</a>
                </span>
              </div>
              <button>
                <TbLogout className='logout' />
                Sign out
              </button>
            </div>
          )
        }

      </header>

      <section className='main-content'>

        <div className="dashboard-grid">
          <div className="card">
            <h3>Upcoming Appointments</h3>
            <span className="span-section">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="" />
              <p>
                <span>Doctor's Name: <span className="span2">Dr. Smith</span></span>
                <span>Date: 25 Apr, 2025</span>
                <span>Time: 10:00 AM</span>
              </p>
            </span>
            <button>Book New</button>
          </div>
          <div className="card">
            <h3>Health Summary</h3>
            <p>Last Checkup: 15 Apr 2025</p>
            <button>View Records</button>
          </div>
          <div className="card">
            <h3>Prescriptions</h3>
            <p>Active: 2 Medications</p>
            <button>View Prescriptions</button>
          </div>
          <div className="card">
            <h3>Billing</h3>
            <p>Pending: $150</p>
            <button>Pay Now</button>
          </div>
        </div>

      </section>

      {showNotiication && <Notification onClose={closeNotificationForm} notifications={notifications} setNotifications={setNotifications} />}
      {showChangePassword && <ChangePassword onClose={closeChangePasswordForm} />}
    </>
  )
}

export default PatientDashboard