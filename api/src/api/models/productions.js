const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Production = new Schema(
    {
        magnitude: { type: Number, default: 0 },
        date: { type: Date, default: null },
    },
    { timestamps: true },
)

module.exports = mongoose.model('productions', Production)