import React from 'react'
import img1 from '../utils/haircut.jpg'
import '../styles/home.css'
import img2 from '../utils/beard grooming.jpg'
import Carousel from 'react-bootstrap/Carousel';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  const amount = {
    haircut: 120,
    beardGrooming: 70
  }
  return (
    <div id="cards" className='container-fluid mt-5'>
      <div className='row mt-5'>
        <div id='card' className='col-lg-4 mx-auto my-2'>
          <div className="card2 mx-auto">
            <div className="imgBx">
              <img src={img1} alt="Hair Cut" />
            </div>
            <div className="contentBx">
              <h2>Hair Cut</h2>
              <div className="cntnt">
                <h3>"A fresh haircut is the best way to start a new chapter in your life."</h3>
              </div>
              <Link to={"/booking"} >HairCut @ {amount.haircut}</Link>
            </div>
          </div>
        </div>
        <div id='card' className='col-lg-4 mx-auto my-2'>
          <div className="card2 mx-auto">
            <div className="imgBx">
              <img src={img2} alt="Beard Grooming" />
            </div>
            <div className="contentBx">
              <h2>Shaving</h2>
              <div className="cntnt">
                <h3>"Your beard is your statement. Let us shape it, trim it, and make it a masterpiece."</h3>
              </div>
              <Link to={"/booking"} >Shaving @ {amount.beardGrooming}</Link>

            </div>
          </div>
        </div>
      </div>
      <Carousel className='mx-auto' id='carousel'>
        <Carousel.Item id='carouselitem'>
          <div className='row mb-2 mx-auto'>
            <div className='col mx-auto'>
              <h3 className='text-center' id='font'>"Change is good, especially when it starts with a haircut. Step into a new you.Login and Book Your Schedule"</h3>
            </div>
          </div>
          
            <div className='row mb-3 mx-auto'>
              <div className='col mx-auto'>
                <h3 ><Button fullWidth variant="outlined" onClick={() => navigate('/Login')} >Login To Book a Schedule</Button></h3>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item id='carouselitem'>
          <div className='row mb-2 mx-auto'>
            <div className='col mx-auto'>
              <h3 className='text-center'>"Tired of Waiting at a Saloon.We will not make you Wait,Book a Schedule of your Convenience.Book Your Schedule and stop Wasting Time on Waiting"</h3>
            </div>
          </div>
         
            <div className='row mb-3 mx-auto'>
              <div className='col mx-auto'>
                <h3><Button fullWidth variant="outlined" onClick={() => navigate('/booking')} >Book Now</Button></h3>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item id='carouselitem'>
          <div className='row mb-2 mx-auto'>
            <div className='col mx-auto'>
              <h3 className='text-center' >"Are you registered with us yet? If not, it only takes a few minutes,Register and Book Your First Schedule with Us. Register today!"</h3>
            </div>
          </div>
            <div className='row mb-3 mx-auto'>
              <div className='col mx-auto'>
                <h3><Button fullWidth variant="outlined" onClick={() => navigate('/register')} >Register</Button></h3>
              </div>
            </div>
          
        </Carousel.Item>
      </Carousel>





    </div>

  );

}

export default Home