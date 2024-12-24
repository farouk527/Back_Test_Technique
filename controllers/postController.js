const {Post,validateCreatePost,validateUpdatePost} = require ("../models/Post");
const asyncHandler = require("express-async-handler");

/**
 * @desc create post
 * @route /api/post/createPost
 * @method post
 * @acess only logged in users
 */
module.exports.createPostController = asyncHandler(async(req,res)=> {

const {error} = validateCreatePost(req.body);

if (error) {
    return res.status(400).json({message : error.details[0].message});
}
const {title,description,category} = req.body;

const newPost = new Post({
    title,
    description,
    category
  });
  await newPost.save();
  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
})

/**
 * @desc Get All posts
 * @route /api/post/getposts
 * @method get
 * @acess only logged in users
 */

module.exports.getAllPostsControllers = asyncHandler(async(req,res)=> {
    const posts = await Post.find();
    res.status(200).json(posts);
})

/**
 * @desc delete  post
 * @route /api/post/deletepost
 * @method delete
 * @acess only logged in users
 */
module.exports.deletePostController = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post successefuly deleted" });
  });


  /**
 * @desc update  post
 * @route /api/post/updatepost
 * @method put
 * @acess only logged in users
 */
module.exports.updatePostController = asyncHandler(async (req, res) => {
    const {error} = validateUpdatePost(req.body);
    if(error) {
        return res.status(400).json({message : error.details[0].message});
    }
    const post = await Post.find({_id : req.params.id});
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedpost = await Post.findByIdAndUpdate(req.params.id,{
        $set : {
            title : req.body.title,
            description : req.body.description,
            category : req.body.category
        }
    },{new : true})
    res.status(200).json(updatedpost);
  });