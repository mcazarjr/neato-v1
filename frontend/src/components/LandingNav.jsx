import React from 'react'
import { Link } from 'react-router-dom'

const LandingNav = () => {
  return (
    <nav>
      <ul>
        <li><Link to ={'/'}>Home</Link></li>
        <li><Link to ={'/contactus'}>Contact Us</Link></li>
        <li><Link to ={'/aboutus'}>About Us</Link></li>
        <li><Link to ={'/login'}>Login</Link></li>
      </ul>
    </nav>
  )
}

export default LandingNav