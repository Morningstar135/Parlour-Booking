import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {URL} from '../utils/baseURL'
import Cookies from 'js-cookie'
import Alert from '@mui/material/Alert';
const Register = ({mobileNumInfo,passInfo}) => {
    const [phoneNumber,setPhoneNumber] = useState('')
    const [name,setName] = useState('')
    const [message,setMessage] = useState("")
    const [show,setShow] = useState(false)
    const [sever,setSever]=useState(true)
    const [wrongNum,setWrongNum] = useState(false)
    const [wrongName,setWrongName] = useState(false)
    const [password,setPassword] = useState('')
    const [wrongPass,setWrongPass] = useState(false)
    const handleRegisterSubmit =async(event)=>{
        event.preventDefault()
        const phoneNumberPattern = /^\d{10}$/
        const passwordPattern =/^[a-zA-Z0-9@#$*]{6,10}$/
        const namePattern = /^[A-Za-z\s'-]{4,}$/
        if(! namePattern.test(name)){
            setWrongName(true)
        }

        if (! phoneNumberPattern.test(Number(phoneNumber))) {
            setWrongNum(true)
          } 
          if (! passwordPattern.test(password)) {
            setWrongPass(true)
          } 
        if(phoneNumberPattern.test(Number(phoneNumber)) && passwordPattern.test(password) && namePattern.test(name)){
            const response=await URL.post(`/api/user/register`,{name,phoneNumber,password})
            setMessage(response.statusText)
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
    return (
        <div className='container-sm'>
        <div className='row'>
        <div className='col-lg-6 mx-auto'>
        <div className='card text-white' id='login'>
        <form className='container-sm mt-5 p-3 cardbody'>
            <h5 className="card-title text-center text-dark">Register</h5>
            <div className='row mt-2 mb-3 text-center'>
                <div className='col'>
                    <TextField label="Name" fullWidth helperText={wrongName?"Name Cannot be Shorter than 4 characters":""} error={wrongName} variant="outlined" value={name} size="small" onChange={(e)=>{setName(e.target.value)
                    setWrongName(false)}} />
                </div>
            </div>
            <div className='row mt-3 mb-3 text-center'>
                <div className='col'>
                    <TextField error={wrongNum} fullWidth helperText={wrongNum?mobileNumInfo:"Don't use Mobile Number That is Already Registered"} label="Phone Number" variant="outlined" size="small" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)
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
                    <Button variant="contained" fullWidth onClick={handleRegisterSubmit} type='submit' >Register</Button>
                </div>
            </div>
            <div className='row mt-2 mb-3'>
                <div className='col text-center text-dark'>
                    Already An User?
                    <Button variant="contained" fullWidth onClick={(e)=>{e.preventDefault()}}  >Login</Button>
                </div>
            </div>
            
            {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"success":"error"} >{message}</Alert>
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

export default Register