import React,{useContext, useEffect} from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import DataContext from '../context/DataContext';
import '../styles/booking.css'
import { URL } from '../utils/baseURL';
const Booking = () => {
    
   const {onDateFocus,onDateChange,onHStFocus,onHStChange,onTimeFocus,handleBookingSubmit,formattedDates,navigate,
    hairStylists,showHS,setTime,timings,show,sever,message,setShow,setMessage,setSever,token,setVal2,val2,reqServer
} = useContext(DataContext)
useEffect(()=>{
    const options2 ={
        method: URL.get,
        url: `/api/user/book/get/booking/${token}`,
        data:null,
        func: (response) => {
            console.log(response)
          setVal2(response.data.value)
          reqServer(options2)
          if(response.data.value){
           console.log(val2)
             navigate('/remainingtime')
         }
         else if(response.data.value){
           navigate('/booking')
         }
        } 
      }
      reqServer(options2)
     
},[])


  return (
    
    <div className='container-sm mt-5'>
    <div className='row'>
    <div className='col-lg-6 mx-auto'>
    <div className='card text-white' id='login'>
    <form className='container-sm mt-5 p-3 cardbody'>
        <h5 className="card-title text-center text-dark">Booking</h5>
        <div className='row mt-4 mb-3 text-center'>
        <div className='col text-center text-dark'>
                    If you are not LoggedIn Please Login To Book your Schedule<br></br>
                    <Button variant="contained"  onClick={(e)=>{e.preventDefault()
                        navigate('/login')
                    }}  >Login</Button>
                </div>
        </div>
        <div className='row mt-3 mb-3 text-center'>
        {
            show?<div className='row mt-2 mb-3 mx-auto'>
            <div className='col text-center'>
                <Alert severity={sever?'success':"error"} >{message}</Alert>
            </div>
        </div>:<div></div>
        }
            <div className='col'>
                    <select className="form-select form-select-lg mb-3" onChange={onDateChange} onFocus={onDateFocus}>
                        <option defaultValue={""}>Pick a Date</option>
                        {
                            formattedDates.map((date)=>{
                                if(date.day==='Friday'){
                                    return(<option disabled value={date.date} key={date.date}>{date.day}</option>)
                                    
                                }else{
                                    return(<option value={date.date} key={date.date}>{date.day}</option>)
                                }
                                
})
                        }
                    </select>
            </div>
        </div >
        <div className='row mt-3 mb-3 text-center'>
            <div className='col'>
                    <select className="form-select form-select-lg mb-3" onFocus={onHStFocus} onChange={onHStChange} >
                        <option defaultValue={''} >Select Your HairStylist</option>
                        {
                            hairStylists.map((stylist)=>(
                                <option value={stylist.name} key={stylist.id}>{stylist.name}</option>
                            ))
                        }
                    </select>
            </div>
        </div >
        {
            showHS?<div className='row mt-3 mb-3 text-center'>
            <div className='col'>
                    <select className="form-select form-select-lg mb-3" id='dateselect' onFocus={onTimeFocus} onChange={(e)=>{setTime(e.target.value)
                    }} >
                        <option defaultValue={''} >Select Time</option>
                        {
                            timings.map((data)=>(
                                <option value={data} key={data}>{data}</option>
                            ))
                        }
                    </select>
            </div>
        </div >:<div></div>
        }
        <div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Button variant="contained" fullWidth  type='submit'  onClick={handleBookingSubmit} >Book Schedule</Button>
            </div>
        </div>
    </form>
    </div>
    </div>
    </div>
    </div>

  )
}

export default Booking