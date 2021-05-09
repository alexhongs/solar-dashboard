const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Production = new Schema(
    {
        magnitude: { type: Number, default: 0 },
        date: { type: Date, default: null },
        efficiency: { type: Number, default: 0},
        carbon: {type: Number, default: 0},
        money: {type: Number, default: 0},
        peak_power: {type: Number, default: 0},
    },
    { timestamps: true },
)

module.exports = mongoose.model('productions', Production)