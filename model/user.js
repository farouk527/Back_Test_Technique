const mongoose = require("mongoose");


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

const User = mongoose.model("User",UserSchema);
module.exports = {User,validateRegisterUser,validateLoginUser,validateUpdatUser}