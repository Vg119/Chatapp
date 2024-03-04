const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {  //these r the specifications for each column , read more on mongoose docs
        fullName : {
            type : String,
            required : true
        },
        username : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true,
            minlength : 6
        },
        gender : {
            type : String,
            required : true,
            enum : ["male","female"]
        },
        profilePic : {
            type : String,
            default : ""
        }
    },
    {timestamps:true}  //timestamps: true will give u 2 additional fields , createdAt and updatedAt which is useful in many cases
)

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}