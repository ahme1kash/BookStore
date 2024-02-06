import mongoose from 'mongoose';
const book_schema = new mongoose.Schema({
    author:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        min:100,
        max:1000

    },
    sellCount:{
        type:Number
    }

},
{versionKey:false})
const book =  mongoose.model('book',book_schema)
export default book