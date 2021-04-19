const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: make this required and let the middle ware function create the missing fields
const Panel = new Schema(
    {
        daily: { type: [Object], default: null },
        weekly: { type: [Object], default: null },
        monthly: { type: [Object], default: null },
        yearly: { type: [Object], default: null },
        total: { type: [Object], default: null },
        zipcode: { type: Number, required: true },
        weather: { type: [String], default: null },
        timezone: {type: String, default: 'UT' },
    },
    { timestamps: true },
)

module.exports = mongoose.model('panels', Panel)