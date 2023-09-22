const mongoose = require('mongoose');
const validator = require('libphonenumber-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto =require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    phoneNumber:{
            type: String,
            required:true,
            validate: {
                validator: function(v) {
                    if(v.length === 10) return true;
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            unique:true   
    },
    password: {
        type: String,
        select:false,
        required: [true, 'Please enter password'],
        minlength: [6, 'Password cannot be less than 6 characters'],
        select: false,
        maxlength:[15,'Password cannot exceed 15 charcters']
    },
    role :{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password  = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_TIME
     })
 }

userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.getResetToken = function(){
    const token = crypto.randomBytes(20).toString('hex');

   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}

let userModel =  mongoose.model('User', userSchema);


module.exports = userModel;