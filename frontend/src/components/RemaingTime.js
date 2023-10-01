import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { URL } from '../utils/baseURL'
import Alert from '@mui/material/Alert';
import DataContext from '../context/DataContext';
import '../styles/remainingtime.css'

const RemaingTime = () => {
  const { handleCancel, show, setShow, setSever, sever, token, message, setMessage } = useContext(DataContext)
  const [day, setDay] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [bookingPin, setBookingPin] = useState('')
  useEffect(() => {
    setShow(false)
    setMessage('')
    setSever(true)
  }, [setMessage, setSever, setShow])

  useEffect(() => {
    var getRmt = () => {
      console.log(token)
      if (token) {

        URL.get(`/api/user/book/show/remaining/time/${token}`).then((response) => {
          if (response.status === 200) {
            const resObj = response.data
            console.log(resObj)
            if (resObj.remainingTime !== 'Your Schedule Have Passed') {
              console.log(resObj)
              setDay(resObj.remainingTime.remainingTime.days)
              setMinutes(resObj.remainingTime.remainingTime.minutes)
              setHours(resObj.remainingTime.remainingTime.hours)
              setBookingPin(resObj.pin)
            }
          }
        }).catch((err) => {
          console.log(err)
          if (err.response) {
            setShow(true)
            setSever(false)
            setMessage(err.response.data.message)
          }
          else if (err.request) {
            setShow(true)
            setSever(false)
            setMessage('Some Network Error Occured Refresh The Page And Try Again')
          }
        })


      }
    }
    getRmt()
    const intervalId = setInterval(getRmt
      , 60000);
    clearInterval(() => intervalId)

  }, [setMessage, setSever, setShow, token])
  return (
    <div className='container-sm mt-5'>
      <div className='card' id='card-rmt'>
        <div className='card-body'>
          <h2 className='card-title text-center'>
            Your Schedule Has Booked SuccessFully
          </h2>
          <div className='container mx-auto mt-3'>
            <div className='row'>
              <div className='col mx-auto mt-2 text-center'>
                You Still Have <span id='span-rmt'>{day} Days, {hours} Hours , {minutes} Minutes</span>  left for your appointment.
              </div>
            </div>
            <div className='row'>
              <div className='col mx-auto mt-2 text-center'>
                Please Take a ScreenShot or Note This Booking Token Given Below
              </div>
            </div>
            <div className='row'>
              <div className='col mx-auto mt-2 text-center'>
                Your Booking Token is <span id='span-rmt'> {bookingPin}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col mx-auto mt-2 text-center'>
                We look forward to serving you!
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col mx-auto mt-2 text-center'>
            <p>If You have changed your and want to change this Schedule Please let Us Know By Cancel this Schedule </p><br></br>
              <Button variant="contained" onClick={handleCancel} >Cancel Booking</Button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col mx-auto mt-2 text-center'>
            {
              show ?
                <Alert severity={sever ? "success" : "error"} id='alert-3' className='mx-auto' >{message}</Alert>
                : <div></div>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default RemaingTime
