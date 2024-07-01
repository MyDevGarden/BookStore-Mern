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
        res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

//Route for getting  book by id
app.get('/books/:id',async (req,res) => {
    try{
        const {id} = req.params;
        const book= await Book.findById(id);
        res.status(200).json(book);
    }catch(error){
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

//Route for updae a book
app.put('/books/:id', async(req, res)=>{
    try{
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear){
            return res.status(400).send({message: "send all required fields: title, author, publishYear"});
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result)
            {
                return res.status(404).send({message: "Book not found"});
            }
            return res.status(200).send({message: "Book updated successfully"});
    }catch(error){
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

//route for deleting book
app.delete('/books/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id, req.body);
        if(!result)
            {
                return res.status(404).send({message: "Book not found"});
            }
            return res.status(200).send({message: "Book deleted successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).send({message: error.message});
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

