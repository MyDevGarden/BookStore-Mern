import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();

//Route for save a new book
router.post('/', async(req, res) => {
 
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
 });
 
 
 //Route for getting all books
 router.get('/',async (req,res) => {
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
 });
 
 //Route for getting  book by id
 router.get('/:id',async (req,res) => {
     try{
         const {id} = req.params;
         const book= await Book.findById(id);
         res.status(200).json(book);
     }catch(error){
         console.log(error);
         res.status(500).send({message: error.message});
     }
 });
 
 //Route for updae a book
 router.put('/:id', async(req, res)=>{
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
 router.delete('/:id', async(req, res)=>{
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
 });

 export default router;