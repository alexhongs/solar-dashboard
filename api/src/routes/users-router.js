const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/users-ctrl");

// @route POST users/login
// @desc Login user and return JWT Token
// @access Public
router.post('/login', UserCtrl.login)

// @route POST users/register
// @desc Register User
// @access Public
router.post('/register', UserCtrl.createUser)

module.exports = router