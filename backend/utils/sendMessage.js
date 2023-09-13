const axios = require('axios');
exports.sendMessage=async (options)=>{
try{
const url = `https://api.greenapi.com/waInstance${process.env.ID_INSTANCE}/sendMessage/${process.env.API_TOKEN}`;

const payload = {
  chatId: `${options.phoneNumber}@c.in`,
  message: options.message,
};

await axios
  .post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}catch(err){
    console.error(err)
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}