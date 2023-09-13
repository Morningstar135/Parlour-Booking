const mongoose = require('mongoose')

const connectDb=()=>{ 
    mongoose.connect(process.env.MONGODB_URI,).then(
        console.log(`Mongo DB connected on ${process.env.MONGODB_URI}`)
    ).catch((err)=>{console.error(err);})
}
module.exports=connectDb