import React, { createContext,useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import {URL} from '../utils/baseURL'

const DataContext = createContext({})

export const DataProvider = ({children}) => {
  const [token,setToken]=useState(Cookies.get('token'))
  const [name,setName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [password,setPassword] = useState('')
  const [wrongNum,setWrongNum] = useState(false)
  const [wrongPass,setWrongPass] = useState(false)
  const [wrongName,setWrongName] = useState(false)
  const [showFPInfo,setShowFPInfo] = useState(false)
    const [showSucInfo,setShowSucInfo] = useState(false)
  const [show,setShow] = useState(false)
  const [sever,setSever]=useState(true)
  const [message,setMessage]=useState('')
  const [data,setData] = useState([])
  const [date,setDate]=useState('')
  const [canceledId,setCanceledId]=useState('')
  const [timeChangeId,setTimeChangeId]=useState('')
  var [hairStylist,setHairStylist]=useState('')
  var [hairStylists,setHairStylists]=useState(["stylist1",'stylist2'])
  var [formattedDates,setFormattedDates]=useState(['today','tomorrow','Day After tomorrow'])
  const [time,setTime] = useState('')
    const [showHS,setShowHS] = useState(false)
    const [dateVal,setDateVal] = useState('')
    const [timings,setTimings] = useState(['Morning','Afternoon','Evening'])

  const navigate = useNavigate()
  const loginToken =Cookies.get('token')
  useEffect(()=>{
    if(loginToken){
      setToken(loginToken)
    }
  },[loginToken])
  const today =new Date()
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  const columns =[{ id: 'name', label: 'Name', minWidth: 100 },
{ id: 'ph', label: 'Phone Number', minWidth: 100 },
{ id: 'time', label: 'Time', minWidth: 100 },
{ id: 'hs', label: 'Hair Stylist', minWidth: 100 },
{ id: 'Bp', label: 'Booking Pin', minWidth: 100 },
{ id: 'actions', label: 'Actions', minWidth: 100 }
]
  function getDate(date){
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weekNum = date.getDay()
      const dayOfWeek = daysOfWeek[weekNum]
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      
      const formattedDate = {
        date:`${month}/${day}/${year}`,
        day:dayOfWeek
      }
      
      return(formattedDate);
  }
  const onHSFocus =()=>{
    const options ={
      method:URL.get,
      url:'api/user/book/get/hairstylists',
      data:null,
      func :(response)=>{
        setHairStylists(response.data.hairStylists)
      }
  }
  reqServer(options)   
}
const onHSChange=(e)=>{
    setHairStylist(e.target.value)
}
const handleSBClick=()=>{
  const data2 ={hairStylist,date}
  console.log(data2)
  const options ={
    method:URL.post,
    url:`/api/user/book/admin/specific/schedules/${token}`,
    data:data2,
    func :(response)=>{
      setData(response.data.specificSchedules)
      console.log(response.data)
    }
}
reqServer(options)
}
const handleChangeTime=(key)=>{
  setTimeChangeId(key)
  console.log(canceledId,timeChangeId)
  const data2 ={hairStylist,date}
  console.log(data2)
  const options ={
    method:URL.post,
    url:`/api/user/book/admin/schedule/change/${token}`,
    data:{id1:canceledId,id2:timeChangeId},
    func :(response)=>{
      setMessage(response.data.message)
    setShow(true)
    
    }
}
reqServer(options)
handleSBClick()
handleDelete(canceledId)
}
 function handleDelete(key){
    console.log(key)
    const id = key
     const options ={
    method:URL.post,
    url:`/api/user/book/admin/schedule/delete/${token}`,
    data:{id},
    func :(response)=>{
      setMessage(response.data.message)
      setShow(true)
      setSever(true)
    }
    
}
console.log(options.data)
reqServer(options)

}
const getAll =()=>{
  const options ={
    method:URL.get,
    url:`/api/user/book/admin/allbookings/${token}`,
    data:null,
    func :(response)=>{
      setData(response.data.allBookings)
  setMessage(response.data.message)
  setShow(true)
      setSever(true)
    }
}
reqServer(options)

}
const onDateFocus =async()=>{
  setFormattedDates([getDate(today),getDate(tomorrow),getDate(dayAfter)])
  
}
const onDateChange=async(e)=>{
  setDateVal(e.target.value);
 
}
const onHStFocus =async()=>{
  const options ={
      method:URL.get,
      url:'api/user/book/get/hairstylists',
      data:null,
      func :(response)=>{
           setHairStylists(response.data.hairStylists)
      }
  }
  reqServer(options)
}
const onHStChange=async(e)=>{
  setHairStylist(e.target.value)
  setShowHS(true)
}
const onTimeFocus=async()=>{
  console.log({hairStylist,date:dateVal});
  const options ={
      method:URL.post,
      url:'api/user/book/availabletimes',
      data:{hairStylist,date:dateVal},
      func :(response)=>{
          setTimings(response.data.availableTimes)
      }
  }
  reqServer(options)
}
const handleBookingSubmit =async(e)=>{
  e.preventDefault()
    const selectedTime = `${dateVal}, ${time}`
    var bookingTime=Date.parse(selectedTime)
    var currentTime=Date.now()
    if(bookingTime>currentTime){
      if(dateVal&&hairStylist&&time){
      var data ={
          date:dateVal,
          hairStylist,
          time
      }
      const options ={
          method:URL.post,
          url:`api/user/book/new/${token}`,
          data:data,
          func :(response)=>{
              const resObj=response.data
          console.log(resObj) 
          setMessage(resObj.message)
          setShow(true)
          navigate('/remainingtime')
              setSever(false)
      console.log(data);
          }
      }
      reqServer(options)
      
  }else{
      setShow(true)
      setMessage('Please Select All Requirements')
  }
}else{
  setShow(true)
  setSever(false)
  setMessage('You Cannot Time Travel To past So please select a time where you can actually go ')
}
  }


  const handleLoginSubmit =async(event)=>{
    event.preventDefault()
    const phoneNumberPattern = /^\d{10}$/
    const passwordPattern =/^[a-zA-Z0-9@#$*]{6,}$/

    if (! phoneNumberPattern.test(Number(phoneNumber))) {
        setWrongNum(true)
      } 
      if (! passwordPattern.test(password)) {
        setWrongPass(true)
      } 
    if(phoneNumberPattern.test(Number(phoneNumber)) && passwordPattern.test(password) ){
        const options ={
            method:URL.post,
            url:`/api/user/login`,
            data:{phoneNumber,password},
            func :(response)=>{
                const resObj=response.data
                console.log(resObj)
                setMessage(resObj.message)
                setShow(true)
                Cookies.set('token',resObj.token,{expires:30})
                setToken(Cookies.get('token'))
                if(resObj.user.role==='admin'){
                    navigate('/adminpanel')
                }
                else{
                    navigate('/booking')
                }
            }
        }
        reqServer(options)

}
}
const handleRegisterSubmit =(event)=>{
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
      const options ={
          method:URL.post,
          url:`/api/user/register`,
          data:{name,phoneNumber,password},
          func :(response)=>{
              const resObj=response.data
          console.log(resObj)
          setShow(true)  
          setMessage(resObj.message)
          Cookies.set('token',resObj.token,{expires:30})
          setToken(Cookies.get('token'))
          setSever(true)
          setTimeout(() => {
              navigate('/booking')
          },3000);
          }
      }
      reqServer(options)           
  }
}
const handleForgotPass=async()=>{
    setShow(false)
    if(phoneNumber){
        const options ={
            method:URL.post,
            url:"/api/user/password/forgot",
            data:{phoneNumber},
            func :(response)=>{
                setMessage(response.data.message)
                setShowSucInfo(true)
            }
        }
        reqServer(options)
       
    }else{
        setShowFPInfo(true)
    }
} 
 const handleCancel =()=>{
  const options ={
    method:URL.get,
    url:`/api/user/book/cancel/schedule/${token}`,
    data:null,
    func :(response)=>{
      setMessage(response.data.message)
      setShow(true)
        setSever(true)
        setTimeout(() => {
          navigate('/')
        }, 5000);
    }
}
reqServer(options) 

}
  const reqServer=(options)=>{
    const {method,url,data,func} = options
    method(url,data).then((response)=>{
    response.status ===200 ?setSever(true):setSever(false)
    func(response)
    }).catch((err)=>{
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
  const mobileNumInfo = "Enter A Valid Mobile Number.We Recommmend You to use your WhatsApp Number, Because We use WhatsApp for further Updates"
  const passInfo = "Password must be between 6-10 characters also it can contain (@#$*) these Special Characters "
  return (
    <DataContext.Provider value ={ {reqServer,mobileNumInfo,passInfo,message,setMessage,token,setToken,show,setShow,
      sever,setSever,navigate,wrongNum,setWrongNum,wrongName,setWrongName,
      password,setPassword,
      wrongPass,setWrongPass,
      phoneNumber,setPhoneNumber,
      name,setName,data,setData,date,setDate,canceledId,setCanceledId,
      timeChangeId,setTimeChangeId,hairStylist,setHairStylist,hairStylists,setHairStylists,
      formattedDates,setFormattedDates,
      today,tomorrow,dayAfter,getDate,columns,onHSFocus,onHSChange,handleSBClick,handleChangeTime,handleDelete,getAll,
      onDateFocus,onDateChange,onHStFocus,onHStChange,onTimeFocus,handleBookingSubmit,setTime,showHS,timings,handleLoginSubmit,handleForgotPass,
      handleRegisterSubmit,handleCancel,showFPInfo,showSucInfo,loginToken
      } }>
        {children}
    </DataContext.Provider>
  )
}

export default DataContext