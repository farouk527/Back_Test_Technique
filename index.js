const express = require("express");
const connectDb = require("./config/connectToDb");
const cors = require("cors");
const { errorHandler, notFound } = require("./middlewares/error");

require('dotenv').config();

connectDb();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", require('./routes/AuthRoute'));
app.use("/api/post", require('./routes/PostRoute'));

//Error Handler Middleware 
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT}`);
});
