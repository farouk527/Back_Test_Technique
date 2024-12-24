const mongoose = require("mongoose");

module.exports = async () => {
try  {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To MongoDB  ^_^")
    } 
catch (err) {
console.log("Conncetion failed to MongoDB!" , err);
}
}