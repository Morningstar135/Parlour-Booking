import React, { useContext,useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button,Alert } from '@mui/material'
import DataContext from '../context/DataContext';
const AdminPanel = () => {
  const   {data,columns,setDate,setFormattedDates,getDate,today,tomorrow,dayAfter,onHSChange,onHSFocus,handleSBClick,hairStylists,formattedDates,
    handleChangeTime,handleDelete,getAll,setCanceledId,setShow,setSever,setMessage,message,show,sever
  } = useContext(DataContext)

  useEffect(()=>{
    setShow(false)
    setMessage('')
    setSever(true)
},[setMessage, setSever, setShow])
  return (
    <main className='container-sm mt-5'>
      <div className='row'>
          <div className='col'>
          <select className="form-select form-select-lg mb-3" onChange={(e)=>setDate(e.target.value)} onFocus={()=>setFormattedDates([getDate(today),getDate(tomorrow),getDate(dayAfter)])}>
                        <option defaultValue={""}>Pick a Date</option>
                        {
                            formattedDates.map((date)=>{
                              return(<option value={date.date} key={date.date}>{date.date}</option>)
                                
                            })
                        }
                    </select>
          </div>
          
      </div>
      <div className='row'>
          <div className='col'>
          <select className="form-select form-select-lg mb-3" onFocus={onHSFocus} onChange={onHSChange} >
                        <option defaultValue={''} >Select Your Name</option>
                        {
                            hairStylists.map((stylist)=>(
                                <option value={stylist.name} key={stylist.id}>{stylist.name}</option>
                            ))
                        }
                    </select>
          </div>
      </div>
      <div className='row mt-2 mb-3'>
            <div className='col text-center'>
                <Button variant="contained" onClick={handleSBClick} >Show Bookings</Button>
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
                        <Button variant="contained"  onClick={()=>{handleDelete(user._id)}}>Delete</Button><br></br>
                        <Button variant="contained"  onClick={()=>{setCanceledId(user._id)}}>Change</Button><br></br>
                        <Button variant="contained"  onClick={()=>{handleChangeTime(user._id)}}>Set</Button><br></br>
                  </TableCell>
                      
                      
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper> 
      <div className='row mt-2 mb-3'>
            <div className='col text-center ms-3'>
                <Button variant="contained" onClick={getAll} >AllBookings</Button>
            </div>
        </div>
    </main>
  )
}

export default AdminPanel