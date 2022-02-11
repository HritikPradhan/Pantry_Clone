const mongoose = require('mongoose')

const pantrySchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String, default: "defaultDescription" },
    notifications: { type: Boolean, default: true },
    percentFull: { type: Number, default: 0 },
    baskets: { type: [Object] }
}, { timestamps: true })

module.exports = mongoose.model('pantry', pantrySchema)