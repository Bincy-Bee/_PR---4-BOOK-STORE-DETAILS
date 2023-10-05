const express = require('express');
const { db } = require('./db');
const { bookstore } = require('./bookstore');
const { checkData } = require('./middleware');
const app = express();
app.use(express.json());


app.get("/",async(req,res)=>{
    res.send("welcome to the book store")
})

app.delete("/books/delete/:id", async(req,res)=>{
    const {id} = req.params;

    const bookDel = await bookstore.findByIdAndDelete(id);
    const booksAfDel = await bookstore.find();

    res.send(booksAfDel);
})

app.get("/books/book/:id", async(req,res)=>{
    const {id} = req.params;
    try {
        const bookbyid = await bookstore.findById(id);
        return  res.status(200).send(bookbyid)
    } catch (error) {
        return  res.status(404).send("error")
    }
})

app.get("/books", async(req,res)=>{
    const books = await bookstore.find();
    res.send(books);
})

app.post("/books/addbooks",checkData, async(req,res)=>{
    const addbook = await bookstore.create(req.body);
    res.send(addbook)

})

app.patch("/books/update/:id", async(req,res)=>{
    const {id} = req.params;
    const uppdateBook = await bookstore.findByIdAndUpdate(id, req.body)
    res.send(uppdateBook)
})
app.get("/books/filter", async(req,res)=>{
    const {title,author,category,sort}= req.query;

    let checkTitle = new RegExp(title,'i');
  
    if(title){
        const filterQue = await bookstore.find({title :  {$regex : checkTitle} });
        res.send(filterQue);
    }
    if (author){
        const filterQue= await bookstore.find({author :  author });
        res.send(filterQue);
    }
    if (category){
        const filterQue= await bookstore.find({category :  category });
        res.send(filterQue);
    }
    if (sort){
        if (sort == "lth"){
            const pricelth = await bookstore.find().sort({price:1});
            res.send(pricelth)
        }
        else if (sort == "htl"){
            const pricehtl = await bookstore.find().sort({price:1});
            res.send(pricehtl)
        }
    }
})

app.listen(8090, ()=>{
    console.log("Server is listening on port : http://localhost:8090");
    db();
})