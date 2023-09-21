import React, { useState } from 'react'
import {URL} from '../utils/baseURL'
import { Button,Alert } from '@mui/material'
const AdminPanel = (token) => {
  const [data,setData] = useState([])
  const [date,setDate]=useState('')
  const [show,setShow] = useState(false)
    const [sever,setSever]=useState(true)
  const [message,setMessage] = useState("")
  const [canceledId,setCanceledId]=useState('')
  const [timeChangeId,setTimeChangeId]=useState('')
  var [hairStylist,setHairStylist]=useState('')
  var [hairStylists,setHairStylists]=useState(["stylist1",'stylist2'])
  var [formattedDates,setFormattedDates]=useState(['today','tomorrow','Day After tomorrow'])
  const today =new Date()
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  function getdate(date){
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      
      const formattedDate = `${month}/${day}/${year}`;
      return(formattedDate);
  }
  const onHSFocus =async()=>{
    const res=await URL.get('api/user/book/get/hairstylists')
    setHairStylists(res.data.hairStylists)
}
const onHSChange=(e)=>{
    setHairStylist(e.target.value)
}
const handleClick=async()=>{
  try{
  const response = await URL.post(`/api/user/book/admin/specific/schedules/${token}`,{hairStylist,date})
  setData(response.data.specificSchedules)
}catch(err){
  setMessage(err.message)
  setShow(true)
  setSever(false)
}
}
const handleChangeTime=async(key)=>{
  setTimeChangeId(key)
  try{
  const response = await URL.post(`/api/user/book/admin/schedule/change/${token}`,{id1:canceledId,id2:timeChangeId})
  setMessage(response.data.message)
  setShow(true)
  handleDelete(canceledId)
  handleClick()
}catch(err){
  setMessage(err.message)
  setShow(true)
  setSever(false)
}
}
async function handleDelete(key){
  try{
  const response = await URL.post(`/api/user/book/admin/schedule/delete/${token}/${key}`)
  setMessage(response.data.message)
  setShow(true)
}catch(err){
  setMessage(err.message)
  setShow(true)
  setSever(false)
}
}
const getAll =async()=>{
  const response = await URL.get(`/api/user/book/admin/allbookings/${token}`)
  setData(response.data.allBookings)
  setMessage(response.data.message)
  setShow(true)
}
  return (
    <main className='container-sm'>
      <div className='row'>
          <div className='col'>
          <select className="form-select form-select-lg mb-3" onChange={(e)=>setDate(e.target.value)} onFocus={()=>setFormattedDates([getdate(today),getdate(tomorrow),getdate(dayAfter)])}>
                        <option defaultValue={formattedDates[0]}>{formattedDates[0]}</option>
                        <option value={formattedDates[1]}>{formattedDates[1]}</option>
                        <option value={formattedDates[2]}>{formattedDates[2]}</option>
          </select>
          </div>
      </div>
      <div className='row'>
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
      </div>
      <div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Button variant="contained" onClick={handleClick} >Book Schedule</Button>
            </div>
        </div>
        {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"success":"error"} >{message}</Alert>
                </div>
            </div>:<div></div>
            }
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Time</th>
            <th scope="col">Booking OTP</th>
            <th scope="col">Actions</th>
          </tr>
          
        </thead>
        {
          data.map((user)=>{
            return(
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.time}</td>
                <td>{user.pin}</td>
                <td><Button variant="contained" onClick={(key)=>setCanceledId(key)} >Change</Button><br></br>
                <Button variant="contained" onClick={(key)=>handleChangeTime} >Set</Button>
                </td>
                <td><Button variant="contained" onClick={(key)=>handleDelete} >Delete</Button></td>
              </tr>
            )
          })
        }
      </table>
      <div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Button variant="contained" onClick={getAll} >AllBookings</Button>
            </div>
        </div>
    </main>
  )
}

export default AdminPanel