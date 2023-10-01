const mongoose =require('mongoose')

let lyconDetailsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    instagramId:{
        type:String,
        required:true
    },
    facebookId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const lyconDetailsModel = mongoose.model('details',lyconDetailsSchema)

module.exports = lyconDetailsModel