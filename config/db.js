import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env.MONGO_URI) // MonngoDB connection string
const connect = async  ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
    });
    console.log("Connection with MongoDB established successfully.")
    }
    catch(error){
        console.log(error.message,'Connection Unsuccessful');
        process.exit(1);
    }
}
connect()
export default connect