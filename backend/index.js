import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";

const app= new express();
//middleware to parsing request body
app.use(express.json());

app.get('/', (req,res) =>{
    console.log(req);
    return res.status(234).send("welcome to book store");
});

//Route for save a new book
app.post('/books', async(req, res) => {
 
   try{
        
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear){
            return res.status(400).send({message: "send all required fields: title, author, publishYear"});
        }
        const newbook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newbook);
        res.status(201).send(book);

    }catch(error)
    {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})


//Route for getting all books
app.get('/books',async (req,res) => {
    try{
        const books= await Book.find({});
        res.status(200).json(books);
    }catch(error){
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

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

