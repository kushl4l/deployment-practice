const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    text:String,
    bought:Boolean
});

const itemModel=mongoose.model("item",itemSchema);
module.exports=itemModel;
