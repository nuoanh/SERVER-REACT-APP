const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InforCompany = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: { type: String },
        address: { type: String },
        phone: { type: String },
        email: { type: String },
        logo: { type: String },
        businessTime: { type: String },
        about: { type: String },
        imageCompany: [{
            idImage: { type: String },
            nameImage: { type: String },
            urlLinkImage: { type: String }
        }],
        social: {
            facebook: { type: String },
            instagram: { type: String },
            youtube: { type: String },
            more: { type: String }
        },
        home: {
            banner: {
                title: { type: String },
                content: { type: String },
                image: [{
                    idImage: { type: String },
                    nameImage: { type: String },
                    urlLinkImage: { type: String }
                }]
            },
            slider: {
                image: [{
                    idImage: { type: String },
                    nameImage: { type: String },
                    urlLinkImage: { type: String }
                }]
            }
        },
        aboutPage: {
            image: { type: String },
            title: { type: String },
            content: { type: String },
            employee: [{
                name: { type: String },
                descriptions: { type: String },
                role: { type: String },
                image: { type: String }
            }]
        }
    }, { timestamps: true }

)
module.exports = mongoose.model('InforCompany', InforCompany)