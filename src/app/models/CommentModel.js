const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        _id: Schema.Types.ObjectId,
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        content: {
            type: String
        },
        response: [{
            time: {
                type: String
            },
            content: {
                type: String
            }
        }]

    }, { timestamps: true }

)
module.exports = mongoose.model('Comment', Comment)