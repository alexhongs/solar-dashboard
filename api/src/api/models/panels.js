const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: make this required and let the middle ware function create the missing fields
const Panel = new Schema(
    {
        daily: { type: [Object], default: [] },
        weekly: { type: [Object], default: [] },
        monthly: { type: [Object], default: [] },
        yearly: { type: [Object], default: [] },
        total: { type: [Object], default: [] },
        zipcode: { type: Number, default: 0 },
        weather: { type: [String], default: [] },
        timezone: {type: String, default: 'UT' },
    
        cost: {type: Number, default: 0},
        sid: {type: Number, required: true},
        apikey: { type: String, required: true },
        userId: { type: Object, default: '' },    
    },
    { timestamps: true },
)

module.exports = mongoose.model('panels', Panel)