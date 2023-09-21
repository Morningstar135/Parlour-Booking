import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL';
import Alert from '@mui/material/Alert';
const Booking = ({token}) => {
    const [phoneNumber,setPhoneNumber] = useState('')
    const [name,setName] = useState('')
    const [time,setTime] = useState('')
    const [message,setMessage] = useState("")
    const [show,setShow] = useState(false)
    const [showHS,setShowHS] = useState(false)
    const [sever,setSever]=useState(true)
    const [wrongNum,setWrongNum] = useState(false)
    const [wrongName,setWrongName] = useState(false)
    const [dateVal,setDateVal] = useState('')
    const [timings,setTimings] = useState(['Morning','Afternoon','Evening'])
    var [formattedDates,setFormattedDates]=useState(['today','tomorrow','Day After tomorrow'])
    var [hairStylist,setHairStylist]=useState('')
    var [hairStylists,setHairStylists]=useState(["stylist1",'stylist2'])
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
        const res=await URL.get('api/user/book/get/hairstylists')
        setHairStylists(res.data.hairStylists)
    }
    const onHSChange=async(e)=>{
        setHairStylist(e.target.value)
        setShowHS(true)
    }
    const onTimeFocus=async()=>{
        console.log({hairStylist,date:dateVal});
       const response= await URL.post('api/user/book/availabletimes',{hairStylist,date:dateVal}) 
       setTimings(response.data.availableTimes)
    }
    const handleSubmit =async(e)=>{
        e.preventDefault()
        const phoneNumberPattern = /^\d{10}$/
        const namePattern = /^[A-Za-z\s'-]{4,}$/
        if(! namePattern.test(name)){
            setWrongName(true)
        }

        if (! phoneNumberPattern.test(Number(phoneNumber))) {
            setWrongNum(true)
          } 
        if(phoneNumberPattern.test(Number(phoneNumber)) && namePattern.test(name)){
            if(dateVal&&hairStylist&&time){
            const data ={
                name,
                phoneNumber,
                date:dateVal,
                hairStylist,
                time
            }
            const response=await URL.post(`api/user/book/new/${token}`,data)
            setMessage(response.statusText)
            const resObj=response.data
            if(resObj){
                console.log(resObj)
                setMessage(resObj.message)
                setShow(true)
                if(message==="Sucess"){
                    setSever(true)
                }else{
                    setSever(false)
                }
            }else{
                setShow(true)
                setMessage("Some Error Occured Please Refresh and Try Again")
            }
            console.log(data);
        }else{
            setShow(true)
            setMessage('Please Select All Requirements')
        }
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
                    <Button variant="contained"  onClick={(e)=>{e.preventDefault()}}  >Login</Button>
                </div>
        </div>
        <div className='row mt-4 mb-3 text-center'>
            <div className='col'>
                <TextField label="Name" fullWidth helperText={wrongName?"Name Cannot be Shorter than 4 characters":''} error={wrongName} variant="outlined" value={name} size="small" onChange={(e)=>{setName(e.target.value)
                setWrongName(false)}} />
            </div>
        </div>
        <div className='row mt-3 mb-3 text-center'>
            <div className='col'>
                <TextField error={wrongNum} fullWidth helperText={wrongNum?"Please Provide a Valid Number":"We Recommend You to use your WhatsApp Number"} label="Phone Number" variant="outlined" size="small" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)
                setWrongNum(false)}}/>
            </div>
        </div >
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