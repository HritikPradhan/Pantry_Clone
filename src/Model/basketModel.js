const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({

    basketName: { type: String },
    basket: { type: mongoose.Schema.Types.Mixed },
    pantryId: { type: mongoose.Schema.Types.ObjectId, ref: "pantry" },
    //expire: {type:String,default:"Your Basket Will Be Deleted Automatically After 24hr"}
    expire:{type:Number,default:86400}
},{timestamps:true});

basketSchema.index({createdAt: 1},{expireAfterSeconds: 86400});

module.exports = mongoose.model('basket', basketSchema)
