const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema(
    {
        _id: Schema.Types.ObjectId,
        nameProduct: { type: String },
        price: { type: String },
        description: { type: String },
        draft: { type: Boolean, default: true },
        image: [{
            idImage: { type: String },
            nameImage: { type: String },
            urlLinkImage: { type: String }
        }],
        hotProduct: { type: Boolean, default: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        status: { type: Boolean, default: true },
        slug: { type: String, slug: ["nameProduct", '_id'] }

    }, { timestamps: true }

)
module.exports = mongoose.model('Product', Product)