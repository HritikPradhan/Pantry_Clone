const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({

    basketName: { type: String },
    basket: { type: mongoose.Schema.Types.Mixed },
    pantryId: { type: mongoose.Schema.Types.ObjectId, ref: "pantry" },
    expire: {type:Date}
},{timestamps:true});

basketSchema.index({createdAt: 1},{expireAfterSeconds: 86400});

module.exports = mongoose.model('basket', basketSchema)
