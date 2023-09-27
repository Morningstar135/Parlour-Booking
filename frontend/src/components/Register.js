import React,{useContext, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import DataContext from '../context/DataContext';
const Register = () => {
    
    const {mobileNumInfo,passInfo,message,wrongNum,setWrongNum,wrongName,setWrongName,
        password,setPassword,
        wrongPass,setWrongPass,
        phoneNumber,setPhoneNumber,
        name,setName,show,setShow,sever,setSever,setMessage,handleRegisterSubmit,navigate} = useContext(DataContext)
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
            <h5 className="card-title text-center text-dark mb-2">Register</h5>
            {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"success":"error"} >{message}</Alert>
                </div>
            </div>:<div></div>
            }
            
            <div className='row mt-2 mb-3 text-center'>
                <div className='col'>
                    <TextField label="Name" fullWidth helperText={wrongName?"Name Cannot include Special characters or be Shorter than 4 characters and it should be maximum of 20 charcters ":""} error={wrongName} variant="outlined" value={name} size="small" onChange={(e)=>{setName(e.target.value)
                    setShow(false)
                    setWrongName(false)}} />
                </div>
            </div>
            <div className='row mt-3 mb-3 text-center'>
                <div className='col'>
                    <TextField error={wrongNum} fullWidth helperText={wrongNum?mobileNumInfo:"Don't use Mobile Number That is Already Registered"} label="Phone Number" variant="outlined" size="small" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)
                    setShow(false)
                    setWrongNum(false)}}/>
                </div>
            </div >
            <div className='row mt-2 mb-3 text-center'>
                <div className='col'>
                    <TextField label="Password"fullWidth helperText={wrongPass?passInfo:""} error={wrongPass} variant="outlined" value={password} size="small" onChange={(e)=>{setPassword(e.target.value)
                    setShow(false)
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
                    <Button variant="contained" fullWidth onClick={(e)=>{e.preventDefault()
                    navigate('/login')
                    }}  >Login</Button>
                </div>
            </div>



        </form>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Register