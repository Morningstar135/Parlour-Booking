import React,{useContext,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import DataContext from '../context/DataContext';
const Login = () => {
   const {handleLoginSubmit,handleForgotPass,show,sever,message,wrongNum,setWrongNum,mobileNumInfo,wrongPass,setWrongPass,passInfo,
    password,setPassword,phoneNumber,setPhoneNumber,navigate,showFPInfo,showSucInfo,setShow,setSever,setMessage
} = useContext(DataContext)
useEffect(()=>{
    setShow(false)
    setMessage('')
    setSever(true)
},[setMessage, setSever, setShow])
    return (
        <div className='container-sm'>
        <div className='row'>
        <div className='col-lg-6 mx-auto'>
        <div className='card text-white' id='login'>
        <form className='container-sm mt-5 p-3 cardbody'>
            <h5 className="card-title text-center text-dark">Login</h5>
            {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"success":"error"} >{message}</Alert>
                </div>
            </div>:<div></div>
            }
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
            <div className='row mt-4 mb-3 text-center'>
            <div className='col text-center text-dark'>
                    If you are not a Registered User Please Register<br></br>
                    <Button variant="contained"  onClick={(e)=>{e.preventDefault()
                        navigate('/register')
                    }}  >Register</Button>
                </div>
            </div>
            <div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Button variant="text" onClick={handleForgotPass} >Forgot Password ?</Button>
                </div>
            </div>
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
                    <Alert severity="error">Reset Url Sent To Your Whatsapp</Alert>
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