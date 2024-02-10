import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import './config/db.js';
import express from 'express';
const app = express();
import bodyParser from "body-parser"; 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
import book_router from './routes/book_router.js';
import auth_router from './routes/auth_router.js';
app.use(express.json(),cors());
app.use('/books',book_router)
app.use('/auth',auth_router)
try{
    const port = process.env.PORT||8000
    app.listen(port,()=>{  
      console.log(`Server is up and running at port ${port}`)
})
}
catch(err){
    console.log(err.message)
}