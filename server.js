require("dotenv").config();
const app=require("./app");
const connectedToDB=require("./src/config/database");
connectedToDB();
app.listen(3000,()=>{
    console.log("Server is running");
    
})