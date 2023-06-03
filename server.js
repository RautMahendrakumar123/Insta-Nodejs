const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const multer = require("multer");
const DATA = require("./model/model")
const path = require('path');

app.use(express.json());
app.use(cors())

app.use('/images',express.static("uploads"))

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads')
        },
        filename:function(req,file,callback){
            callback(null,file.originalname)
        }
    })
})


app.get("/posts", async (req,res)=>{
    try{
        const data = await DATA.find();
        data.reverse();
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.post("/upload",upload.single('PostImage'),(req,res)=>{
    const data = new DATA({
        name:req.body.name,
        location: req.body.location,
        description: req.body.description, 
        postImage: req.file.originalname ,
        
    })
    data.save()
    res.send("Success")
})


 





mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("connected to DB");
})

app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.PORT}`)
})