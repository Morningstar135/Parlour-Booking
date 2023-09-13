
const bookedTimings =(array1)=>{
  let array2=[]
  array1.map((booking)=>{
      var time = booking.time
      array2.push(time)
  })
  return array2
}

function formatDate(date){
  const array =date.split("-")
  const array2=[]
  array.map((item)=>{
    array2.push(Number(item))
  })
  return array2
}
function checkAvailability(array1, array2) {
  return array1.filter((item) => !array2.includes(item));
}

function generateTimeSlots(year,month,day) {
  const timeSlots = [];
  month = month-1
  const date = new Date(year, month, day);
  const startDate = new Date(date);
  for (let hours = 8; hours <= 21; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 20) {
      const currentDate = new Date(startDate);
      currentDate.setHours(hours, minutes, 0, 0);
      timeSlots.push(currentDate);
    }
  }

const array =[]
timeSlots.forEach((timeSlot) => {
  array.push(`${timeSlot} ${date}`);
});
  return array;
}
const date = new Date()
var year = date.getFullYear()

console.log(date,year);
module.exports={checkAvailability,bookedTimings,generateTimeSlots,formatDate}