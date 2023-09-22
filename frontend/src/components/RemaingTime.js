import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL'
import Alert from '@mui/material/Alert';

const RemaingTime = ({token}) => {
  const [day,setDay]=useState(0)
  const [hours,setHours]=useState(0)
  const [minutes,setMinutes]=useState(0)
  const [bookingPin,setBookingPin]=useState('')
  const [show,setShow] = useState(false)
    const [sever,setSever]=useState(true)
    const [message,setMessage]=useState('')
  useEffect(()=>{
    getTimeObj()
  },[token])
  const getTimeObj =async()=>{
    if(token){
      const res = await URL.get(`/api/user/book/show/remaining/time/${token}`).catch((err)=>{
        if(err.response){
          setShow(true)
          setSever(false)
          setMessage(err.response.data.message)
        }
        else if(err.request){
          setShow(true)
          setSever(false)
          setMessage('Some Network Error Occured Refresh The Page And Try Again')
        }
      })
      const resObj = res.data
      if(resObj){
        console.log(resObj)
        setDay(resObj.remaingTime.days)
        setMinutes(resObj.remaingTime.minutes)
        setHours(resObj.remaingTime.hours)
        setBookingPin(resObj.pin)
      }
    }
    
   
  }
  const handleCancel =async()=>{
    const response = await URL.get(`/api/user/book/cancel/schedule/${token}`).catch((err)=>{
      if(err.response){
        setShow(true)
        setSever(false)
        setMessage(err.response.data.message)
      }
      else if(err.request){
        setShow(true)
        setSever(false)
        setMessage('Some Network Error Occured Refresh The Page And Try Again')
      }
    })
    if(response.data){
    setMessage(response.data.message)
    setShow(true)
  
      setSever(true)
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
          <button onClick={getTimeObj}>Show Remaining Time</button>
        </figure>
          <p>You have approximately <br></br>
            {day} Days, {hours} Hours , {minutes} minutes left for your appointment.<br></br> 
            We look forward to serving you!</p>
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