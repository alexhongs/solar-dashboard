const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../api/models/users')
const PanelsCtrl = require('../controllers/panels-ctrl');
const Validate = require('../util/validate')


login = async (req, res) => {
    //Form Validation
    const {error, isValid} = validateLoginInput(req);
    if (!isValid) return res.status(400).json({error: error});

    const username = req.headers.username;
    const password = req.headers.password;

    //Find user by username
    console.log(`Login before findone`)
    let user;
    try {
        user = await User.findOne({username: username})
    } catch (e) {
        return res.status(404).json({ emailnotfound: "Username not found" });
    }
    if(!user) return res.status(404).json({ emailnotfound: "Username not found" });

    // Check password
    console.log(`Login ${user.username} ${user.password} ${password}`)
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(`Login isMatch ${isMatch} ${user.password} ${password}`)
    if(!isMatch) return res.status(404).json({ passwordincorrect: "Password incorrect" });

    
    // Create JWT Payload
    const payload = {
        id: user.id,
        name: user.name
    };

    // Sign token
    jwt.sign(
        payload,
        'secret',
        {
            expiresIn: 31556926 
        },
        (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            });
        }
    ); 
}

createUser = async (req, res) => {
    //Form Validation
    const {error, isValid} = Validate.validateCreateUserInput(req)
    if(!isValid) return res.status(401).json({error: error})

    try {
        const user = await User.findOne({username:req.headers.username})
        if(user) return res.status(400).json({error: `Username '${req.headers.username}' already exists`});

        const {error, panel} = await PanelsCtrl.createPanel(req.headers)
        if (!panel) return res.status(401).json({error: `Invalid panel ${error}`});

        const newUser = new User({
            name:req.headers.name,
            username: req.headers.username,
            password: req.headers.password,
            panelId: panel._id,
            sid: req.headers.sid,
        });
        
        // Hash password before storing in database
        const rounds  = 10
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(newUser.password, salt)
    
        newUser.password = hash
        await newUser.save()
    
        panel.userId = newUser._id
        await panel.save()

        return res.status(200).json({success: true, data: {
            'username': newUser.username,
            'user_id': newUser._id,
            'panel_id': panel._id,
            'api_key': panel.apikey,
        }})
    } catch (e) {
        console.log(`Error: ${e}`)
        return res.status(400).json({error: e})
    }
}

module.exports = {
    login,
    createUser,
}