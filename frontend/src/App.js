import Footer from "./components/Footer"
import React, { useContext, useEffect} from 'react';
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
import DataContext, { DataProvider } from "./context/DataContext";
function App() {
  return (
    
    <div>
      <DataProvider>
      <NavBar />
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
      <Footer />
    </div>
    </DataProvider>
    </div>
   
  );
}

export default App;
