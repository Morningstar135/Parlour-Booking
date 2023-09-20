import React from 'react'

const NavBar = () => {
    return (
<nav className="sticky-top" id='navbar'>
  <div className='container'>
  <div className="row mb-1">
            <h1 className="col text-center">
                Lycon
            </h1>
        </div>
      <div className='row mb-3'>
          <div className='col text-center'>
            Home
          </div>
          <div className='col text-center'>
            Booking
          </div>
          <div className='col text-center'>
            About
          </div>
      </div>
  </div>
  </nav>


    )
}

export default NavBar