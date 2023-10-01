import Footer from "./components/Footer"
import React, { useState } from 'react';
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
import About from './components/About';
import  { DataProvider } from "./context/DataContext";
function App() {
  const [showMenu,setShowMenu] = useState(false)
  return (
    <div>
      <DataProvider>
      <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
    <div className='container-md'>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="login" element={<Login  /> } />
          <Route path="register" element={<Register  />} />
          <Route path="booking" element={<Booking  />} />
          <Route path="remainingtime" element={<RemaingTime  />} />
          <Route path="adminpanel" element={<AdminPanel  /> } />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
    <Footer />
    </DataProvider>
    </div>
   
  );
}

export default App;
