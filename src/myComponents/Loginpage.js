import React, { useState } from 'react'
import { FaLock } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { auth, signInWithEmailAndPassword } from "../firebase";
import { useUserAuth } from '../context/UserAuthContextProvider';
import "../myCss/Login.css"


const Loginpage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {login} =useUserAuth()
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let hasError = false;

        if (!email) {
            setEmailError("Email is required.");
            hasError = true;
        }
        else{
            setEmailError("");
        }
        if (!password) {
            setPasswordError("Password is required.");
            hasError = true;
        }
        else{
            setPasswordError("");
        }
        if (hasError) return;

        try {
            await login(email, password); // ล็อกอินผู้ใช้ใน Firebase
            console.log("try")
            alert("Login successful!");
            navigate("/welcome"); // เปลี่ยนเส้นทางไปหน้า Dashboard หรือหน้าที่ต้องการ
        } catch (err) {
            console.log("catch")
            console.error("Login error:", err.message);
            if (err.code === "auth/user-not-found") {
                setEmailError("No user found with this email.");
                
            } else if (err.code === "auth/wrong-password") {
                setPasswordError("Incorrect password.");
                
            } else if (err.code === "auth/invalid-email") {
                setEmailError("Invalid email format.");
                
            } else if (err.code === "auth/invalid-credential") {
                setEmailError("Invalid credentials, please check your email and password.");
                setPasswordError("Invalid credentials, please check your email and password.");
            } else {
                setEmailError("An unexpected error occurred.");
                
            }
        }
    };
    return (
        <div className='container'>
            <div className='translate-btn'>
                <button onClick={() => navigate("/login")}><FaLock className='input-icon' /></button>
                <button onClick={() => navigate("/register")}><FaPlusCircle className='input-icon' /></button>
            </div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className='input-box'>
                    <MdEmail className='input-icon' />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small className={emailError ? 'error-message' : 'error-hidden'}>{emailError}</small>
                </div>
                <div className='input-box'>
                    <FaLock className='input-icon' />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <small className={passwordError ? 'error-message' : 'error-hidden'}>{passwordError}</small>
                </div>
                <button type='submit' className='container-btn'>Login</button>
            </form>
        </div>
    )
}

export default Loginpage