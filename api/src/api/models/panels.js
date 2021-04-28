const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: make this required and let the middle ware function create the missing fields
const Panel = new Schema(
    {
        // Produciton Data
        live: { type: [Object], default: []},
        daily: { type: [Object], default: [] },
        weekly: { type: [Object], default: [] },
        monthly: { type: [Object], default: [] },
        yearly: { type: [Object], default: [] },
        total: { type: [Object], default: [] },
        zipcode: { type: Number, default: 0 },
        weather: { type: [String], default: [] },
        timezone: {type: String, default: 'UT' },
    
        // Personal Information
        cost: {type: Number, default: 0},
        sid: {type: Number, required: true},
        apikey: { type: String, required: true },
        userId: { type: Object, default: '' },

        // Dashboard analysis

        three_month_peak: { type: Object, default: null},
        total_peak: {type: Object, default: null},
        total_average: { type: Object, default: null},
    },
    { timestamps: true },
)

module.exports = mongoose.model('panels', Panel)