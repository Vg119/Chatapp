const express = require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const getUsersforSidebar = require('../controller/user.controller');

const userrouter = express.Router();

userrouter.get("/",protectRoute,getUsersforSidebar);

module.exports = {userrouter};