import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { auth,db, doc, setDoc } from "../firebase";
import "../myCss/Register.css"
import { useUserAuth } from '../context/UserAuthContextProvider';


const Registerpage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {signUp} =useUserAuth()
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        let hasError = false;
        const passwordHasSpecialChar = /[/!@#$%^&*(),.?":{}|<>]/.test(password);
        if (!username) {
            setUserError("Username is required.");
            hasError = true;
        }
        else {
            setUserError("")
        }
        if (!email) {
            setEmailError("Email is required.");
            hasError = true;
        }
        else {
            setEmailError("")
        }
        if (!password) {
            setPasswordError("Password is required.");
            hasError = true;
        }
        else if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            hasError = true;
        }
        else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            hasError = true;
        }
        else if (passwordHasSpecialChar) {
            setPasswordError("The password must not contain special characters.");
            hasError = true;
        }
        else {
            setPasswordError("")
        }

        if (hasError) return;

        try {
            console.log("try")
            await signUp(email,password)
            const user = auth.currentUser; // รับข้อมูลผู้ใช้ที่ถูกสร้าง

            // หลังจากที่สร้างผู้ใช้เสร็จแล้ว บันทึกข้อมูล username ใน Firestore
            if(user){
                console.log("try2",user.email,username,user.uid)
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    username: username,
                });
            }

            console.log("User created and username saved!");
            alert("Registration successful!");
            navigate("/welcome")
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setEmailError('This email is already in use. Please choose another email.');
            } 
        }
    };
    return (
        <div className='container'>
            <div className='translate-btn'>
                <button onClick={() => navigate("/login")}><FaLock className='input-icon' /></button>
                <button onClick={() => navigate("/register")}><FaPlusCircle className='input-icon' /></button>
            </div>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className='input-box'>
                    <FaUser className='input-icon' />
                    <input type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <small className={userError ? 'error-message' : 'error-hidden'}>{userError}</small>
                </div>
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
                    <input type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <small className={passwordError ? 'error-message' : 'error-hidden'}>{passwordError}</small>
                </div>
                <div className='input-box'>
                    <FaLock className='input-icon' />
                    <input type='password'
                        placeholder='Confirm-Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <small className={passwordError ? 'error-message' : 'error-hidden'}>{passwordError}</small>
                </div>
                <button type='submit' className='container-btn'>Sign Up</button>
            </form>
        </div>
    )
}

export default Registerpage