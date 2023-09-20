import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL'
import Alert from '@mui/material/Alert';

const RemaingTime = ({token}) => {
  const [remainingTime,setRemainingTime]=useState('')
  const [bookingPin,setBookingPin]=useState('')
  const [show,setShow] = useState(false)
    const [sever,setSever]=useState(true)
    const [message,setMessage]=useState('')
  useEffect(()=>{
    URL.get(`/api/user/book/show/remaining/time/${token}`).then((res)=>{
      setRemainingTime(res.data.remainingTimeString.remainingTime)
      setBookingPin(res.data.pin)
    })
  },[token])
  setInterval(() => {
    URL.get(`/api/user/book/show/remaining/time/${token}`).then((res)=>{
      setRemainingTime(res.data.remainingTimeString.remainingTime)
      setBookingPin(res.data.pin)
    })
  }, 60000);
  const handleCancel =async()=>{
    try{
    const response = await URL.post(`/api/user/book/cancel/schedule/${token}`)
    setMessage(response.data.message)
    setShow(true)
  }catch(err){
    setMessage(err.message)
    setShow(true)
    setSever(false)
  }
  }
  return (
    <section className='container-sm'>
        <div>
        <p> Dear customer, your appointment is in progress</p>
        <figure>
          <blockquote className="blockquote">
            <p>You may delay, but time will not.</p>
          </blockquote>
          <figcaption className="blockquote-footer">
             <cite title="Source Title">Benjamin Franklin</cite>
          </figcaption>
        </figure>
          <p>You have approximately 
            <span>{remainingTime} </span>
            minutes left for your appointment. We look forward to serving you!</p>
        </div>
        <div>
          <p>Please Take a ScreenShot or Note This Booking Token Given Below</p>
          <p>Your Booking Token is <span>{bookingPin}</span></p>
        </div>
        <div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Button variant="contained" onClick={handleCancel} >Cancel Booking</Button>
            </div>
        </div>
        {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"success":"error"} >{message}</Alert>
                </div>
            </div>:<div></div>
            }

    </section>
  )
}

export default RemaingTime