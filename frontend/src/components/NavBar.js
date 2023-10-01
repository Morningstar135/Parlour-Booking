import React from 'react'
import { Outlet, Link } from "react-router-dom";
import '../styles/nav.css'
const NavBar = ({showMenu,setShowMenu}) => {
    return (

<nav className='navbar'>
  <h1 id="logo"><Link to="/">Lycon</Link></h1>
  
  <div className={`hamburger ${showMenu?"lines-rotate":""}`}>
  <div className="menu-icon-nav"  >
        <input type="checkbox" id="menu-checkbox" onClick={()=>setShowMenu(!showMenu)} />
        <label htmlFor="menu-checkbox"></label>
        <div className="bar first"></div>
        <div className="bar second"></div>
        <div className="bar third"></div>

        
    </div>
  </div>
  <ul id='nav-links' className={showMenu?"hide":""}>
    <li><Link className='links' to="/register" onClick={()=>setShowMenu(!showMenu)}>Register</Link></li>
    <li><Link className='links' to="/booking" onClick={()=>setShowMenu(!showMenu)} >Booking</Link></li>
    <li><Link className='links' to="/about" onClick={()=>setShowMenu(!showMenu)}>About</Link></li>
    <li><Link className='links' to="/login" onClick={()=>setShowMenu(!showMenu)}>Login</Link></li>
  </ul>
  

  <Outlet />
   
  
            
            
            
            
  </nav>


    )
}

export default NavBar