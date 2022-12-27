const express = require('express');
const  mongoose = require('mongoose');
const app = express();
const User = require("./Routes/User");

app.use(express.json())


app.use('/',User);


mongoose.connect("mongodb://127.0.0.1:27017/task").then(()=>{
    console.log("DataBase is Connected");
}).catch((error)=>{
    console.log("Database is not Connected");
})







app.listen(3000,()=>{
    console.log("Server is Running on PORT 3000");
})