const mongoose = require("mongoose");
const Joi = require ("joi");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema ({

    username  : {
        type : String,
        required : true ,
        trim : true,
        minlength: 2, 
        maxlength : 100
    },

    email : {
        type : String,
        required : true ,
        trim : true,
        minlength: 5, 
        maxlength : 100,
        unique : true
    },

    password : {
        type : String,
        required : true ,
        trim : true,
        minlength: 8, 
    },

    isAccountVerified : {
        type : Boolean,
        default : false
    }, 


},
{timestamps:true}
)
UserSchema.methods.generateAuthToken = function ()  {
    return jwt.sign({id : this._id , isAdmin : this.isAdmin},process.env.JWT_SECRET)
     }

function validateRegisterUser(obj) {
    const schema = Joi.object ({
     username: Joi.string().trim().min(2).max(100).required(),
     email: Joi.string().trim().min(5).max(100).required().email(),
     password: Joi.string().trim().min(8).required()
    }) 
    return schema.validate(obj);
 }

 function validateLoginUser(obj) {
    const schema = Joi.object({
      email: Joi.string().trim().min(5).max(100).required().email(),
      password: Joi.string().trim().min(8).required(),
    });
  
    return schema.validate(obj);
  }

 const User = mongoose.model("User", UserSchema);
 module.exports = { User, validateRegisterUser, validateLoginUser };