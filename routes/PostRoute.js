const router = require("express").Router();
const {createPostController,
    getAllPostsControllers,
    deletePostController,
    updatePostController} = require("../controllers/postController")
const {verifyToken}= require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")


router.post("/createPost",verifyToken,createPostController);
router.get("/getposts",verifyToken,getAllPostsControllers);
router.delete("/delete/:id",verifyToken,validateObjectId,deletePostController);
router.put("/update/:id",verifyToken,validateObjectId,updatePostController);

module.exports = router ; 
