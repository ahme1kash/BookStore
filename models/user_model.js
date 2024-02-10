import mongoose from 'mongoose';
import validator from 'validator';
const user_schema = new mongoose.Schema({
    // _id:String,
    firstName:{
        type:String,
        required:true,
        min:3,
        max:15
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:15
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:15,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
          },
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:21
    },
    role:{
     type: String, enum: ['user', 'admin', 'author'],
     default: 'user'
     }


},
{versionKey:false})
const user =  mongoose.model('user',user_schema)
export default user