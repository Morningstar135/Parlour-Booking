import React from 'react'
import { Outlet, Link } from "react-router-dom";
const NavBar = () => {
    return (
<nav className="sticky-top" id='navbar'>
  <div className='container'>
  <div className="row mb-1">
            <h1 className="col text-center">
            <Link to="/" className='text-decoration-none' id='nav-links'>Lycon</Link> 
            </h1>
        </div>
      <div className='row mb-3'>
            <div className='col text-center'>
              <Link to="/login" className='text-decoration-none' id='nav-links'>Login</Link>
            </div>
            <div className='col text-center'>
              <Link to="/register" className='text-decoration-none' id='nav-links'>Register</Link>
            </div>
            <div className='col text-center'>
              <Link to="/booking" className='text-decoration-none' id='nav-links'>Booking</Link>
            </div>
          </div>
  </div>
  <Outlet />
  </nav>


    )
}

export default NavBar