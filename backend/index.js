import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import bookRoute from "./Routes/bookroutes.js";
import cors from "cors";


const app= new express();
//middleware to parsing request body
app.use(express.json());
app.use(cors());

//middleware to handle routes
app.use('/books', bookRoute);

//middleware for handling CORS POLICY
//Option1: Allow all origins with dafault of cors(*)

// const corsOptions = {
    
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200
//   }
//   app.use(cors(corsOptions))
  
//option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (req,res) =>{
    console.log(req);
    return res.status(234).send("welcome to book store");
});


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to database");
        app.listen(PORT, ()=>{
            console.log(`App is listening on PORT ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log(error);
    })

