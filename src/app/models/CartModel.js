const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: { type: String },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        },
        product: [{
            prod: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            price: {
                type: String
            },
            count: { type: String },
        }],

        status: { type: Boolean, default: false },

    }, { timestamps: true }

)
module.exports = mongoose.model('Cart', Cart)