const {User ,validateRegisterUser,validateLoginUser} = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");



/*****
 * @desc Register New User
 * @route /api/auth/register
 * @method post
 * @access public
 */

module.exports.registerUserController = asyncHandler(async (req , res) => {
    const {error} = validateRegisterUser(req.body);

    if (error) {
       return res.status(400).json({ message : error.details[0].message});
    }
    let user = await User.findOne({email : req.body.email});
    if (user) {
       return res.status(400).json({message : 'user already exist'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    user = new User({
        username : req.body.username,
        email : req.body.email, 
        password : hashedPassword,

    })
    await user.save();
    res.status(201).json({message : " you registred successfully , please log in"});
})

/****
 * @desc Login user
 * @route /api/auth/login
 * @method post
 * @acess public
 */

module.exports.loginUserController = asyncHandler(async (req , res)=> {
    const {error} = validateLoginUser(req.body);
    if (error) 
   return res.status(400).json({message : error.details[0].message});

    const user = await User.findOne({ email : req.body.email});
    if (!user) {
       return res.status(400).json({message : "invalid email or password"});
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password); 
    if (!isPasswordMatch) {
        return res.status(400).json({message : "invalid email or password"}); 
    }
    const token = user.generateAuthToken();
    res.status(200).json({
        _id : user._id,
        token,
    })

})