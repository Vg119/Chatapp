const jwt = require('jsonwebtoken');
const { User } = require('../model/user.model');

const protectRoute = async(req,res,next)=>{

    try {

        const token = req.cookies.jwt;

        //case 1-cookie does not exist
        if(!token)
        return res.status(410).json({error : "Unauthorized : No token provided"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //case 2 - token does not match
        if(!decoded)
        return res.status(401).json({error : "Unauthorized : Invalid provided"});

        const user = await User.findById(decoded.userId).select("-password");

        //case 3 - token matched and verified but user not in db(if in case user is deleted from db)
        if(!user)
        return res.status(404).json({error : "User not found"});


        req.user = user;  

        next();
        
    } catch (error) {
        console.log("Error in protectRoute");
        res.send(500).json({msg : "Internal server error"});
        
    }

}

module.exports= {protectRoute};

