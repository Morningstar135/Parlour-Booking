import Footer from "./components/Footer"
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login'
import Register from "./components/Register";
import Booking from "./components/Booking";
import RemaingTime from "./components/RemaingTime";
import Cookies from 'js-cookie'
function App() {
  const [token,setToken]=useState('')
  const loginToken =Cookies.get('token')
 useEffect(()=>{
  if(loginToken){
    setToken(loginToken)
  }
  else{
    setToken('')
  }
 },[loginToken])
  const mobileNumInfo = "Enter A Valid Mobile Number.We Recommmend You to use your WhatsApp Number, Because We use WhatsApp for further Updates"
  const passInfo = "Password must be between 6-10 characters also it can contain (@#$*) these Special Characters "
  return (
    <div className="container-fluid">
      <NavBar />
    <div className='container-md'>
 
      <Login passInfo={passInfo} mobileNumInfo={mobileNumInfo} /> 
      <Register  passInfo={passInfo} mobileNumInfo={mobileNumInfo}  />
     <Booking mobileNumInfo={mobileNumInfo} token={token}   />
      <RemaingTime token={token}  />
      <Footer />
    </div>
    </div>
   
  );
}

export default App;
