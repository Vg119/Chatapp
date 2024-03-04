const Conversation = require("../model/conversation.model");
const Message = require("../model/message.model");

const sendMessage = async (req,res)=>{
    try {

        const {message} = req.body;
        const {id:receiverId} = req.params; //get id and name it as receiverId 
        const senderId = req.user._id;  //the req.user we assigned at protectRoute.js

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId,receiverId]}
        });

        if(!conversation) //no conversation between sender and rec. is found => this is the first
        {
            conversation = await Conversation.create({
                participants : [senderId,receiverId]
            })
        }


        const newMessage = new Message({
            senderId,
            receiverId,message
        })

        if(newMessage){
           conversation.messages.push(newMessage._id)
        }

        //we have to run conversation.save() becoz in case record already present , we just update and save the update . If new convo then create triggers save once and again save runs
        // once again here

        // await newMessage.save();
        // await conversation.save();


        //read about Promise.all - here all the promises run parallally
      
        await Promise.all([conversation.save(),newMessage.save()]);



        res.status(201).json({msg : newMessage});
        
    } catch (error) {
        console.log("Error in send message controller : " ,error.message);
        res.status(500).json({error : "Internal server error"})
        
    }
}

const getMessages = async (req,res) =>{
    try {

        const {id : userToChatid} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {
                $all : [senderId,userToChatid]
            }
        }).populate("messages");  //populate means it actually extracts all the actual messages from Messages collections using their objectIds which were present in the Conversations.messages collections(join in sql)


        if(!conversation)  //if convo does not exixt means still no messages b/w 2 users
        return res.status(500).json({msg : []});
      
        const messages = conversation.messages;

        res.status(200).json({msg : messages});
        
    } catch (error) {

        console.log("Error in get messages controller : " ,error.message);
        res.status(500).json({error : "Internal server error"})
        
        
    }
}

module.exports = {sendMessage,getMessages}