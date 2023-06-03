const mongoose=require("mongoose");

const InstaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:true
    }
})

const model = mongoose.model("insta",InstaSchema);
module.exports=model;