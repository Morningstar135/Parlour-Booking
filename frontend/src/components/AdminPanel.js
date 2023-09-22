import React, { useState } from 'react'
import {URL} from '../utils/baseURL'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button,Alert } from '@mui/material'
const AdminPanel = ({token}) => {
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
    const res=await URL.get('api/user/book/get/hairstylists').catch((err)=>{
      setShow(true)
      setMessage("Some Error Occured Refresh The Page And Try Again")
    })
    if(res.data) setHairStylists(res.data.hairStylists)
}
const onHSChange=(e)=>{
    setHairStylist(e.target.value)
}
const handleClick=async()=>{
  const data2 ={hairStylist,date}
  console.log(data2)
  const response = await URL.post(`/api/user/book/admin/specific/schedules/${token}`,data2).catch((err)=>{
    if(err.response){
      setShow(true)
      setSever(false)
      console.log(err)
      setMessage(err.response.data.message)
    }
    else if(err.request){
      setShow(true)
      setSever(false)
      setMessage('Some Network Error Occured Refresh The Page And Try Again')
    }
  })
   if(response.data) setData(response.data.specificSchedules)
   console.log(response.data)
}
const handleChangeTime=async(key)=>{
  setTimeChangeId(key)
  console.log(canceledId,timeChangeId)
  const response = await URL.post(`/api/user/book/admin/schedule/change/${token}`,{id1:canceledId,id2:timeChangeId}).catch((err)=>{
    if(err.response){
      setShow(true)
      setSever(false)
      console.log(err)
      setMessage(err.response.data.message)
    }
    else if(err.request){
      setShow(true)
      setSever(false)
      setMessage('Some Network Error Occured Refresh The Page And Try Again')
    }
  })
  if(response.data){
    setMessage(response.data.message)
  setShow(true)
  handleDelete(canceledId)
  handleClick()
  }
}
async function handleDelete(key){
    console.log(key)
  const response = await URL.delete(`/api/user/book/admin/schedule/delete/${token}`,{id:key}).catch((err)=>{
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
  setMessage(response.data.message)
  setShow(true)
  }
}
const getAll =async()=>{
  const response = await URL.get(`/api/user/book/admin/allbookings/${token}`).catch((err)=>{
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
  setData(response.data.allBookings)
  setMessage(response.data.message)
  setShow(true)
}
const columns =[{ id: 'name', label: 'Name', minWidth: 170 },
{ id: 'ph', label: 'Phone Number', minWidth: 170 },
{ id: 'time', label: 'Time', minWidth: 170 },
{ id: 'hs', label: 'Hair Stylist', minWidth: 170 },
{ id: 'Bp', label: 'Booking Pin', minWidth: 170 },
{ id: 'actions', label: 'Actions', minWidth: 170 }
]
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
                        <option defaultValue={''} >Select Your Name</option>
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
                <Button variant="contained" onClick={handleClick} >Show Bookings</Button>
            </div>
        </div>
        {
                show?<div className='row mt-2 mb-3'>
                <div className='col text-center'>
                    <Alert severity={sever?"success":"error"} >{message}</Alert>
                </div>
            </div>:<div></div>
            }
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                        <TableCell  >
                         {user.name}
                        </TableCell>
                        <TableCell  >
                        {user.phoneNumber}
                        </TableCell>
                        <TableCell  >
                        {user.time}
                        </TableCell>
                        <TableCell  >
                        {user.hairStylist}
                        </TableCell>
                        <TableCell  >
                        {user.pin}
                        </TableCell>
                        <TableCell  >
                        <Button variant="contained"  onClick={()=>{handleDelete(user._id)}}>Delete</Button>
                        <Button variant="contained"  onClick={()=>{setCanceledId(user._id)}}>Change</Button>
                        <Button variant="contained"  onClick={()=>{handleChangeTime(user._id)}}>Set</Button>
                  </TableCell>
                      
                      
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper> 
      <div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Button variant="contained" onClick={getAll} >AllBookings</Button>
            </div>
        </div>
    </main>
  )
}

export default AdminPanel