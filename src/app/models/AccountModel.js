const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: { type: String },
        email: { type: String },
        admin: { type: Boolean, default: false },
        username: { type: String },
        password: { type: String },
        imageAvata: { type: String },
        address: { type: String },
        phone: {type: String}
    }, { timestamps: true }

)
module.exports = mongoose.model('Account', Account)