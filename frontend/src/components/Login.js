import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL'
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie'
const Login = ({mobileNumInfo,passInfo,setToken}) => {
    const [phoneNumber,setPhoneNumber] = useState('')
    const [password,setPassword] = useState('')
    const [wrongNum,setWrongNum] = useState(false)
    const [wrongPass,setWrongPass] = useState(false)
    const [message,setMessage] = useState("")
    const [show,setShow] = useState(false)
    const [sever,setSever]=useState(true)
    const [showFPInfo,setShowFPInfo] = useState(false)
    const [showSucInfo,setShowSucInfo] = useState(false)
    const handleLoginSubmit =async(event)=>{
        event.preventDefault()
        const phoneNumberPattern = /^\d{10}$/
        const passwordPattern =/^[a-zA-Z0-9@#$*]{6}$/

        if (! phoneNumberPattern.test(Number(phoneNumber))) {
            setWrongNum(true)
          } 
          if (! passwordPattern.test(password)) {
            setWrongPass(true)
          } 
        if(phoneNumberPattern.test(Number(phoneNumber)) && passwordPattern.test(password) ){
            const response=await URL.post(`/api/user/login`,{phoneNumber,password})
            const resObj=response.data
            if(resObj){
                console.log(resObj)
                setMessage(resObj.message)
                setShow(true)
                Cookies.set('token',resObj.token,{expires:30})
                if(message==="Sucess"){
                    setSever(true)
                }else{
                    setSever(false)
                }
            }else{
                setMessage("Some Error Occured Please Refresh and Try Again")
            }
            
        }
    }
    const handleForgotPass=async()=>{
        setShow(false)
        if(phoneNumber){
            const response = await URL.post("/password/forgot")
            setMessage(response.data.message)
            setShowSucInfo(true)
        }else{
        setShowFPInfo(true)
    }


    }
    return (
        <div className='container-sm'>
        <div className='row'>
        <div className='col-lg-6 mx-auto'>
        <div className='card text-white' id='login'>
        <form className='container-sm mt-5 p-3 cardbody'>
            <h5 className="card-title text-center text-dark">Login</h5>
            <div className='row mt-3 mb-3 text-center'>
                <div className='col'>
                    <TextField error={wrongNum} fullWidth helperText={wrongNum?mobileNumInfo:""} label="Phone Number" variant="outlined" size="small" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)
                    setWrongNum(false)}}/>
                </div>
            </div >
            <div className='row mt-2 mb-3 text-center'>
                <div className='col'>
                    <TextField label="Password"fullWidth helperText={wrongPass?passInfo:""} error={wrongPass} variant="outlined" value={password} size="small" onChange={(e)=>{setPassword(e.target.value)
                    setWrongPass(false)}} />
                </div>
            </div>
            <div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Button variant="contained" fullWidth onClick={handleLoginSubmit} type='submit' >Login</Button>
                </div>
            </div>
            <div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Button variant="text" onClick={handleForgotPass} >Forgot Password ?</Button>
                </div>
            </div>
            
            {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"error":"success"} >{message}</Alert>
                </div>
            </div>:<div></div>
            }
             {
                showFPInfo?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity="error">Please Enter Your PhoneNumber And Try Again</Alert>
                </div>
            </div>:<div></div>
            }
              {
                showSucInfo?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity="error">Rest Url Sent To Your Whatsapp</Alert>
                </div>
            </div>:<div></div>
            }



        </form>
        {message}
        </div>
        </div>
        </div>
        </div>
    )
}

export default Login