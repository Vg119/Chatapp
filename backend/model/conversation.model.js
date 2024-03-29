const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
    participants : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User", 
        
    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId, //this means this is an objectid generated by monogoose
        ref : "Message", //id is from the User collection
        default : []
    }],
 },
    { timestamps : true}  //timestamp is especially needed here as we need to see when the messages were created and updated

);

const Conversation = mongoose.model("Conversation",conversationSchema);

module.exports = Conversation;


