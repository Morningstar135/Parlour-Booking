import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL';
import Alert from '@mui/material/Alert';
const Booking = ({token}) => {
    const [time,setTime] = useState('')
    const [message,setMessage] = useState("")
    const [show,setShow] = useState(false)
    const [showHS,setShowHS] = useState(false)
    const [sever,setSever]=useState(true)
    const [dateVal,setDateVal] = useState('')
    const [timings,setTimings] = useState(['Morning','Afternoon','Evening'])
    var [formattedDates,setFormattedDates]=useState(['today','tomorrow','Day After tomorrow'])
    var [hairStylist,setHairStylist]=useState('')
    var [hairStylists,setHairStylists]=useState(["stylist1",'stylist2'])
    const navigate =useNavigate()
    const today =new Date()
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    function getdate(date){
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        const formattedDate = `${month}/${day}/${year}`;
        return(formattedDate);
    }
    const onDateFocus =async()=>{
        setFormattedDates([getdate(today),getdate(tomorrow),getdate(dayAfter)])
        
    }
    const onDateChange=async(e)=>{
        setDateVal(e.target.value);
       
    }
    const onHSFocus =async()=>{
        const res=await URL.get('api/user/book/get/hairstylists').catch((err)=>{
          if(err.request){
              setShow(true)
              setSever(false)
              setMessage('Some Network Error Occured Refresh The Page And Try Again')
            }
          })
          if(res.data) setHairStylists(res.data.hairStylists)
    }
    const onHSChange=async(e)=>{
        setHairStylist(e.target.value)
        setShowHS(true)
    }
    const onTimeFocus=async()=>{
        console.log({hairStylist,date:dateVal});
       const response= await URL.post('api/user/book/availabletimes',{hairStylist,date:dateVal}).catch((err)=>{
 if(err.request){
          setShow(true)
          setSever(false)
          setMessage('Some Network Error Occured Refresh The Page And Try Again')
        }
      })
      if(response.data) setTimings(response.data.availableTimes)
    }
    const handleSubmit =async(e)=>{
        e.preventDefault()
            if(dateVal&&hairStylist&&time){
            const data ={
                date:dateVal,
                hairStylist,
                time
            }
            const response=await URL.post(`api/user/book/new/${token}`,data).catch((err)=>{
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
                const resObj=response.data
                console.log(resObj)
                setMessage(resObj.message)
                setShow(true)
                navigate('/remainingtime')
                    setSever(true)
            console.log(data);
              }
            
        }else{
            setShow(true)
            setMessage('Please Select All Requirements')
        }
        }
        

  return (
    <div className='container-sm'>
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
            <div className='col'>
                    <select className="form-select form-select-lg mb-3" onChange={onDateChange} onFocus={onDateFocus}>
                        <option defaultValue={""}>Pick a Date</option>
                        {
                            formattedDates.map((date)=>(
                                <option value={date} key={date}>{date}</option>
                            ))
                        }
                    </select>
            </div>
        </div >
        <div className='row mt-3 mb-3 text-center'>
            <div className='col'>
                    <select className="form-select form-select-lg mb-3" onFocus={onHSFocus} onChange={onHSChange} >
                        <option defaultValue={''} >Select Your HairStylist</option>
                        {
                            hairStylists.map((stylist)=>(
                                <option value={stylist} key={stylist}>{stylist}</option>
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
                <Button variant="contained" fullWidth  type='submit'  onClick={handleSubmit} >Book Schedule</Button>
            </div>
        </div>
        
        {
            show?<div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Alert severity={sever?"error":'success'} >{message}</Alert>
            </div>
        </div>:<div></div>
        }
             
        



    </form>
    </div>
    </div>
    </div>
    </div>

  )
}

export default Booking