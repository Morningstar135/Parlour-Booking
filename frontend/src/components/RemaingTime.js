import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL'
import Alert from '@mui/material/Alert';
import DataContext from '../context/DataContext';

const RemaingTime = () => {
  const {handleCancel,show,setShow,setSever,sever,token,message,setMessage} = useContext(DataContext)
    const [day,setDay]=useState(0)
    const [hours,setHours]=useState(0)
    const [minutes,setMinutes]=useState(0)
    const [bookingPin,setBookingPin]=useState('')
    useEffect(()=>{
      setShow(false)
      setMessage('')
      setSever(true)
  },[setMessage, setSever, setShow])
 
    useEffect(()=>{
      var getRmt =()=>{
        console.log(token)
        if(token){
          
          URL.get(`/api/user/book/show/remaining/time/${token}`).then((response)=>{
            if(response.status===200){
             const resObj = response.data
              console.log(resObj)
              if(resObj.remainingTime !== 'Your Schedule Have Passed'){
                console.log(resObj)
                setDay(resObj.remainingTime.remainingTime.days)
                setMinutes(resObj.remainingTime.remainingTime.minutes)
                setHours(resObj.remainingTime.remainingTime.hours)
                setBookingPin(resObj.pin)
              }
            }
          }).catch((err)=>{
            console.log(err)
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
         
         
      }
    }
    getRmt()
    const intervalId =setInterval(getRmt
      , 60000);
    clearInterval(()=>intervalId)
      
    },[setMessage, setSever, setShow, token])
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
          <p>You have approximately <br></br>
            {day} Days, {hours} Hours , {minutes} minutes left for your appointment.<br></br> 
            We look forward to serving you!</p><br></br>
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