const jwt = require("jsonwebtoken")

function verifyToken (req,res,next)  {
    const authToken = req.headers.authorization;
    
    if(authToken)
     {
        const token = authToken.split(" ")[1];
        try {
            const decodedpayload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decodedpayload;
            next();
            
        }
        catch(error) {
            return res.status(401).json({message : "invalid token , acess denied"})    }
    }
    else {
        return res.status(401).json({message : "no token provided , acess denied"})
    }
}

module.exports = {verifyToken};