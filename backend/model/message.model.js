const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
    senderId : {
        type : mongoose.Schema.Types.ObjectId, //this means this is an objectid generated by monogoose
        ref : "User", //id is from the User collection
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId, //this means this is an objectid generated by monogoose
        ref : "User", //id is from the User collection
        required : true
    },
    message :{
        type : String,
        required : true
    }},
    { timestamps : true}  //timestamp is especially needed here as we need to see when the messages were created and updated

);

const Message = mongoose.model("Message",messageSchema);

module.exports = Message;


