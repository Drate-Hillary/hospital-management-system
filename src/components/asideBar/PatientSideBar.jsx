import React from 'react'
import { NavLink } from 'react-router-dom'
import assets from '../../assets/assets'
import './Sidebar.css'
import { RiUserLine } from 'react-icons/ri'
import { CiCalendarDate } from "react-icons/ci";
import { GiMedicines } from "react-icons/gi";
import { IoWalletOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { MdLogout } from "react-icons/md";


const PatientSideBar = () => {
    return (
        <>

            <aside className='sidebar'>
                <div className="logo">
                    <h2>HMS Patient</h2>
                </div>
                <ul>
                    <li>
                        <div className="search-container">
                            <input type="text" placeholder='Search here...' name="" id="" className='search' />
                            <IoSearchOutline className='search-icon' />
                        </div>
                    </li>
                    <li>
                        <NavLink href="#" className={({ isActive }) => isActive ? "active" : ""}>
                            <img src={assets.dashboard} alt="" /> <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className={({ isActive }) => isActive ? "active" : ""} >
                            <RiUserLine className='img' /> <span>Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#">
                            <CiCalendarDate className='img' /> <span>Appointments</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#">
                            <img src={assets.records} alt="" /><span>Health Records</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#">
                            <GiMedicines className='img' /> <span>Prescriptions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#">
                            <IoWalletOutline className='img' /> <span>Billing</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#">
                            <AiOutlineComment className='img' /> <span>Telemedicine</span>
                        </NavLink>
                    </li>
                    <li>
                        <button className='logout'>
                            <MdLogout className='img' /> <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </aside>

            <main ></main>

        </>
    )
}

export default PatientSideBar