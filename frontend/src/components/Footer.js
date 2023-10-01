import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../styles/footer.css"
const Footer = () => {
    const navigate = useNavigate()
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return(
    
        <footer id="footer" className="mt-5">
        <div className="row">
            <div  className="col-lg-3 col-sm-12">
                <div className="footersec">
                <h2>Lycon Hair Saloon</h2>
                Dicover more <Button   onClick={()=>navigate('/about')} >About Us</Button>
                </div>
            </div>
            <div className="col-lg-3 col-sm-12">
                <div className="footersec">
                <h2>Contact Us</h2>
                <address>
                    
                        [Salon Address]
                        City
                        State
                        Phone: [Salon Phone Number]
                        Email: [Salon Email]

                </address>
                </div>
            </div>
            <div className="col-lg-3 col-sm-12 mx-auto">
                <h5>© {currentYear} Lycon Saloon</h5>
            </div>
            <div className="col-lg-3 col-sm-12">
                <div className="footersec" >
                <h2>Follow Us</h2>
                <ul>
                    <li>Instagram</li>
                    <li>Facebook</li>
                </ul>
                </div>
            </div>
       </div>
       </footer>


    )
}


export default Footer