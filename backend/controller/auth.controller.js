const { User } = require("../model/user.model");
const bycrypt = require('bcryptjs');
const {generateTokenandSetCookie} = require("../utils/generateToken");
const signup = async (req,res)=>{

    try {

        const {fullName,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords dont match"});
        }
    
        const user = await User.findOne({username});
    
        if(user){
            return res.status(400).json({error : "Username already exists"})
    
        }

      //HASH PASSWORD
      const salt = await bycrypt.genSalt(10);
      const hashPassword = await bycrypt.hash(password,salt);
      


      //PROFILE PIC API - https://avatar.iran.liara.run/public/boy?username=Scott

      const profilePic = (gender==="male") ? (`https://avatar.iran.liara.run/public/boy?username=${username}`) : (`https://avatar.iran.liara.run/public/girl?username=${username}`);

      const newUser = new User({
        fullName,
        username,
        password : hashPassword,
        gender,
        profilePic

      })


      if(newUser){  //checking if the user data provided is correct acc to schema defined for the db


    //jwt auth
     generateTokenandSetCookie(newUser._id,res);

      await newUser.save();

      return res.status(200).json({
        _id : newUser._id,
        fullName : newUser.fullName,
        username : newUser.username,
        profilePic : newUser.profilePic
      })
    }
    else{
        return res.status(500).send("User input incorrect");
    }

        
    } catch (error) {

        console.log("Error in signup controller",error.message);
        res.status(500).send("Internal server error");
        
    }
    
   

}

const login = async (req,res)=>{
    
    try {
       const {username,password} = req.body; 

       const user = await User.findOne({username});  //check if username exists in db

       const isPassword = await bycrypt.compare(password,(user)?(user.password):"")  //if user does not exist  then compare with "" =>gives false , if user exists compare with user.password

       if(!user || !isPassword)
       return res.status(400).json({msg : "Invalid username or password"});

       generateTokenandSetCookie(user._id,res);


       res.status(200).json(
        {
            _id : user._id,
            fullName : user.fullName,
            username : user.username,
            profilePic : user.profilePic
        }
       )

    } catch (error) {

        console.log("Error in user login controller");
        res.status(500).json("Internal server error");
        
    }
}

const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge : 0});  //update the cookie to ""
        res.status(200).json({msg:"logged out successfully"})
    } catch (error) {

        console.log("Error in user login controller");
        res.status(500).json("Internal server error");

        
    }
}

module.exports = {
    signup,
    login,
    logout
}