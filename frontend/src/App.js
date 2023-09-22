import Footer from "./components/Footer"
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import AdminPanel from './components/AdminPanel'
import Home from "./components/Home";
import Login from './components/Login'
import NoPage from "./components/NoPage";
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
 },[loginToken])
  const mobileNumInfo = "Enter A Valid Mobile Number.We Recommmend You to use your WhatsApp Number, Because We use WhatsApp for further Updates"
  const passInfo = "Password must be between 6-10 characters also it can contain (@#$*) these Special Characters "
  return (
    
    <div className="container-fluid">
      <NavBar />
    <div className='container-md'>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="login" element={<Login passInfo={passInfo} mobileNumInfo={mobileNumInfo} setToken={setToken} /> } />
          <Route path="register" element={<Register  passInfo={passInfo} mobileNumInfo={mobileNumInfo} setToken={setToken} />} />
          <Route path="booking" element={<Booking mobileNumInfo={mobileNumInfo} token={token}   />} />
          <Route path="remainingtime" element={<RemaingTime token={token}  />} />
          <Route path="adminpanel" element={<AdminPanel token={token} />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </div>
    </div>
   
  );
}

export default App;
