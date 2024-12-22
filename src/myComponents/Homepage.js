import React from 'react'
import { Link } from "react-router-dom";
import "../myCss/Homepage.css"

export const Homepage = () => {
    return (
        <div className='homepage-container'>
            <h1>Home</h1>
            {/* <button >play</button> */}
            <Link to="/login" className="Link-btn">login</Link>
            <Link to="/register" className="Link-btn">register</Link>
        </div>
    )
}

export default Homepage
