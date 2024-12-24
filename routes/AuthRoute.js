const router = require("express").Router();
const {loginUserController,registerUserController} = require("../controllers/authController")

router.post("/register", registerUserController);
router.post("/login", loginUserController);

module.exports = router ; 

