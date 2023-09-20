const { sendMessage } = require("./sendMessage")
const Booking = require('../model/bookingModel')

const idNum=0
const hairStylists =[
  "Karthick Kumar",
  "Santhosh Kumar"
]
function getHairStylists(){
  return hairStylists
}
function addHairStylists(name){
    hairStylists.push({name})
    return hairStylists
}
const bookedTimings =(array1)=>{
  let array2=[]
  array1.map((booking)=>{
      var time = booking.time
      array2.push(time)
  })
  return array2
}

function checkAvailability(array1, array2) {
  return array1.filter((item) => !array2.includes(item));
}

function showRemainingTime(date,time,phoneNumber,user){
  var input = `${date}, ${time}`
  var bookingTime=Date.parse(input)
  var currentDate=Date.parse(new Date().toLocaleString())
  var reminderTime = bookingTime- 600000
  var remainingTime
  function millisecondsToDHMS(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }
  if(reminderTime>currentDate)
  {
     var remainingMs =bookingTime-currentDate
      remainingTime= millisecondsToDHMS(remainingMs)
     return {remainingTime,bookingTime}
  }
  else if(reminderTime===currentDate){
    var options = {
      phoneNumber,
      message:"Your appointment at Lycon is on 10 Mins.Your appointment is important to us, and our team is ready to provide you with exceptional service. Please make sure to arrive a few minutes before your scheduled time to ensure that we can accommodate your full appointment. If, for any reason, you are unable to make it to your appointment, please let us know as soon as possible. We understand that unforeseen circumstances may arise, and we would appreciate the opportunity to reschedule your appointment or offer it to another valued customer.We value your business and look forward to serving you at Lycon. If you have any questions or need to make changes to your appointment, please don't hesitate to book another Appointment at our website.Thank you for choosing Lycon, and we can't wait to see you soon!"
    }
    sendMessage(options)
    
  }else if(bookingTime<Date.now()){
      const deleted = Booking.findOneAndDelete({user})
      return "Your Schedule Have Passed"
  }




}

const startTime = new Date();
startTime.setHours(8, 0, 0, 0);
const endTime = new Date();
endTime.setHours(21, 0, 0, 0);
const timeArray = [];


let currentTime = new Date(startTime);
while (currentTime <= endTime) {
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  timeArray.push(formattedTime);
  currentTime.setMinutes(currentTime.getMinutes() + 20);
}
module.exports={checkAvailability,bookedTimings,timeArray,showRemainingTime,getHairStylists,addHairStylists}