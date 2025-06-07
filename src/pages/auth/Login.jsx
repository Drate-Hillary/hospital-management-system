import React, { useEffect, useState } from 'react'
import './login.css'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { HiOutlineMail } from 'react-icons/hi';
import assets from '../../assets/assets';
import { replace, useNavigate } from 'react-router-dom';
import { TbLockPassword } from 'react-icons/tb';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [remember, setRemember] = useState(false)
    const navigate = useNavigate()

    const { login, navigateTo } = useAuth();

    useEffect(()=>{
        if (navigateTo) {
            navigate(navigateTo)
        }
    }, [navigateTo, navigate])

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError('')

        const result = await login(email, password)
        if (!result.success) {
            setError(result?.error || 'Invalid Credentials!')
        }
    }

    return (
        <>

            <section className='login-section'>

                <form onSubmit={handleSubmit} className="form" method="POST">

                    <span className="logo">
                        <img src={assets.logo} alt="" />
                    </span>

                    <h2>Welcome to Health</h2>
                    <p>Log in using the form below</p>

                    {error && (<div className="flex justify-center items-center  bg-red-100 border border-red-300  text-red-700 px-4 py-2.5 h-10 rounded mt-6 text-m font-normal ">{error}</div>)}

                    <div className="input-wrapper">
                        <div className="input-content">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="symbol">
                                <HiOutlineMail />
                            </span>
                        </div>

                        <div className="input-content password-wrapper">
                            <label htmlFor="password">Enter Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span className='symbol'>
                                <TbLockPassword />
                            </span>
                            <span
                                className="eye"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </span>
                        </div>

                        <div className="remember">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <button type="submit" className="btn">Log in</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default Login