const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        _id: Schema.Types.ObjectId,
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        },

        inf: {
            nameSend: { type: String },
            recipient: { type: String },
            phone: { type: String },
            addressRecevie: { type: String },
        },
      
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            price: {
                type: String
            },
            count: { type: String }
        }
        ],
        status: { type: Boolean, default: false },
        payment: { type: Boolean, default: false },
        shipping: { type: Boolean, default: false },

    }, { timestamps: true }

)
module.exports = mongoose.model('Order', Order)