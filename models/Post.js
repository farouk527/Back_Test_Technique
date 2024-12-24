const mongoose = require("mongoose");
const Joi = require ("joi");

const PostSchema = mongoose.Schema({
title : {
    type : String,
    required : true, 
    trim : true,
    minlenght : 2,
    maxlength : 200
},
description : {
    type : String,
    required : true, 
    trim : true,
    minlenght : 10,
},
category : {
    type : String,
    required : true
},

 
}, {
    timestamps : true ,
})

const Post = mongoose.model("Post",PostSchema);

function validateCreatePost (obj) {
    const schema = Joi.object({
    title : Joi.string().trim().min(2).max(200).required(),
    description : Joi.string().trim().min(2).required(),
    category : Joi.string().trim().required()
    })
    return schema.validate(obj);
}

function validateUpdatePost (obj) {
    const schema = Joi.object({
    title : Joi.string().trim().min(2).max(200),
    description : Joi.string().trim().min(2),
    category : Joi.string().trim()
    })
    return schema.validate(obj);
}

module.exports = {
    Post,
    validateCreatePost,
    validateUpdatePost
}