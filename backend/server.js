//package imports
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');


//file imports
const { router } = require('./routes/auth.routes');
const { connecttoMongo } = require('./db/connect');
const { msgrouter } = require('./routes/message.route');
const { userrouter } = require('./routes/user.routes');


const PORT = process.env.PORT || 3000;


app.use(cookieParser());
app.use(express.json())

app.use('/api/messages',msgrouter);
app.use('/api/auth',router);
app.use('/api/users',userrouter);

// app.get('/',(req,res)=>{
//     res.send("Helloooooooo")
// })


app.listen(PORT,()=>{
    connecttoMongo();
    console.log("listening to port " + PORT);
})