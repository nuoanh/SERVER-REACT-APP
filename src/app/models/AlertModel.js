const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Alert = new Schema(
    {
        _id: Schema.Types.ObjectId,
        target: { type: String },
        content: { type: String }
    }, { timestamps: true }

)
module.exports = mongoose.model('Alert', Alert)