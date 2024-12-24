const express = require("express");
const connectDb = require("./config/connectToDb");
require('dotenv').config();


connectDb();

app = express();


app.listen(process.env.PORT,()=>{
console.log(`Server Listening on Port ${process.env.PORT}`);
})

