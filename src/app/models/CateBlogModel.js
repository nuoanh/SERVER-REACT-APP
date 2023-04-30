const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CateBlog = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: { type: String },
        description: { type: String },
        image: { type: String }
    }, { timestamps: true }

)
module.exports = mongoose.model('CateBlog', CateBlog)