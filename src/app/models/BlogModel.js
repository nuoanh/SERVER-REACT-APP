const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        _id: Schema.Types.ObjectId,
        nameContent: { Type: String },
        titleContent: {Type: String},
        category: {
            type: Schema.Types.ObjectId,
            ref: 'CateBlog'
        },
        content: {Type: String}
    }, { timestamps: true }

)
module.exports = mongoose.model('Blog', Blog)