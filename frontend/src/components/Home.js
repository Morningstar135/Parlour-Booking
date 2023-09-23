import React from 'react'
import img1 from '../utils/haircut.jpg'
import img2 from '../utils/beard grooming.jpg'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate=useNavigate()
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const amount ={
    haircut:120,
    beardGrooming:70
  }
  return (
    <div className='container-sm'>
      <div className='row mx-auto' id="carousel">
        <div className='col lg-6 mx-auto'  >
          <Carousel activeIndex={index} onSelect={handleSelect}  >
      <Carousel.Item>
        <img src={img1} id='img' alt='HairCut'className='img-fluid mx-auto rounded d-block opacity-75' ></img>
        <Carousel.Caption className='mx-auto'>
          <h6 id='caption'>"Change is good, especially when it starts with a haircut. Step into a new you."</h6>
          <p id='caption'>HairCut at Just {amount.haircut}.Rs</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} alt='Beard Grooming' id='img' className='img-fluid mx-auto rounded d-block opacity-75'></img>
        <Carousel.Caption className='mx-auto'>
          <h6 id='caption'>"Your beard is your statement. Let us shape it, trim it, and make it a masterpiece."</h6>
          <p id='caption'>Grooming Just at {amount.beardGrooming}.Rs</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
      </div>
      <div className='row mt-5 mb-5 mx-auto'>
        <div className='col mx-auto'>
        <h3 className='display-6'>"Change is good, especially when it starts with a haircut. Step into a new you."</h3><br></br>
        </div>
        </div>
        <div className='row mb-5 mx-auto'>
        <div className='col mx-auto'>
        <Button fullWidth variant="outlined" onClick={()=>navigate('/booking')} >Book Now</Button>
        </div>
        </div>
    </div>
    
  );

}

export default Home