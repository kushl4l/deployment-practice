const express=require("express");
const cors=require("cors");
const itemModel=require("./src/models/item.model");


const app=express();
const path=require("path");
app.use(express.json());
app.use(cors());


app.get("/api/items", async (req,res)=>{
  try {
    const items = await itemModel.find();
    res.status(200).json({
      message:"Items fetched successfully",
      items
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" })
  }
})

app.post("/api/items", async (req,res)=>{
    const {text,bought}=req.body;
    const item= await itemModel.create({
        text,bought
    })
    res.status(201).json({
        message:"item posted",
        item
    })
    
});

app.delete("/api/items/:id", async (req,res)=>{
  try {
    const id = req.params.id;
    await itemModel.findByIdAndDelete(id);

    res.status(200).json({
      message:"Item deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" })
  }
});


app.patch("/api/items/:id", async (req,res)=>{
    try{
    const id=req.params.id;
    const item=await itemModel.findByIdAndUpdate(id);
    if(!item){
        return res.status(404).json({
            message:"Item not found"
        })
    };

    item.bought=!item.bought;
    await item.save();

    res.status(200).json({
        message:"Item updated successfully",
        item
    })

    }
    catch(error){
        res.status(500).json({
            message:"Error updating item"
        })
    }

})

app.use(express.static(path.join(__dirname, "public")));

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})


module.exports=app;
