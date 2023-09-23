import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate()
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return(
    <div className="">
        <footer>
        <h1 className="fs-4">Lycon Hair Saloon</h1>
        <h3 className="fs-5">Contact Us:</h3>
        <address className="fs-6">
            [Salon Address]
            [City, State, Zip Code]
            Phone: [Salon Phone Number]
            Email: [Salon Email]
        </address>
        <h3>Discover More  <Button variant="text"  onClick={()=>navigate('/about')} >About Us</Button></h3>
       <h4 className="fs-6"> © {currentYear} Lycon Saloon</h4>
       </footer>


    </div>
    )
}


export default Footer