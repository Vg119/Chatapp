const { User } = require("../model/user.model");

const getUsersforSidebar = async(req,res) =>{
    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password");
        //gives back all users except the logggedinusers

        res.status(200).json({msg : filteredUsers})


        
    } catch (error) {
        console.log("Error in getUsersforsidebar controller",error.message);
        res.status(500).json({msg : "Internal server error"});
        
    }

}

module.exports = getUsersforSidebar;