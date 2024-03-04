const express = require('express');
const { sendMessage, getMessages } = require('../controller/message.controller');
const { protectRoute } = require('../middlewares/protectRoute');

const msgrouter = express.Router();

msgrouter.post('/send/:id',protectRoute,sendMessage);
msgrouter.post('/get/:id',protectRoute,getMessages);

module.exports = {msgrouter};