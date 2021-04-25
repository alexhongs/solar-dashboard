const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: make this required and let the middle ware function create the missing fields
const User = new Schema(
    {
       sid: { type: String, required: true },
       panelId: { type: String, required: true},
       password: { type: String, required: true},
       username: { type: String, required: true},
       name: { type: String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)