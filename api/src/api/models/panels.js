const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Panel = new Schema(
    {
        production: { type: [String], required: true },
        zipcode: { type: Number, required: true },
        weather: { type: String, optional: true },
        timezone: {type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('panels', Panel)