const express = require("express");
const connectDb = require("./config/connectToDb");
const cors = require("cors");

require('dotenv').config();

connectDb();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", require('./routes/AuthRoute'));

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT}`);
});
