import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import bookRoute from "./Routes/bookroutes.js"

const app= new express();
//middleware to parsing request body
app.use(express.json());



app.get('/', (req,res) =>{
    console.log(req);
    return res.status(234).send("welcome to book store");
});
app.use('/books', bookRoute);

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

