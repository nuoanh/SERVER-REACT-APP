const curdHelper = require('../../helpers/crud');
const logger = require('../../constants/loggerConstant');
const AccountModel = require('../../models/AccountModel');
var jwt = require('jsonwebtoken');
var formidable = require('formidable');
const googleApi = require('../../helpers/googleApi');
const ProductModel = require('../../models/ProductModel');
const CategoryModel = require('../../models/CategoryModel');
const mongoose = require('mongoose');
const { request } = require('express');
const CartModel = require('../../models/CartModel');
const CommentModel = require('../../models/CommentModel');
const OrderModel = require('../../models/OrderModel');

require('dotenv').config()



class UserServices {
    //service get all inf company
    async getInfCompany(request) {
        if (request) {
            try {
                let data = await curdHelper.getSingle({
                    model: 'inforCompany',
                    id: process.env.ID_COMPANY,
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }
    //service get all category
    async getAllCategory(request) {
        if (request) {
            try {
                let data = await curdHelper.getAll({
                    model: 'category',
                    query: request.query
                })
                data = data.map(data => data.toObject());
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }

    //service get special product
    async getSpecialProd(request) {
        if (request) {
            let rs = await ProductModel.find({ hotProduct: true, draft: false }).populate([{ path: 'category', strictPopulate: false }]).exec();
            rs = rs.slice(0, 10);
            if (rs) {
                return rs;
            }
        }
    }
    //service get alll product
    async getAllProd(request) {
        if (request) {
            let rs = await ProductModel.find({ draft: false }).populate([{ path: 'category', strictPopulate: false }]).exec();
            rs = rs.slice(0, 10);
            if (rs) {
                return rs;
            }
        }
    }
    //service get  product by cate
    async getProdByCate(request) {
        if (request) {
            try {
                let rs = await ProductModel.find({ "category": request.params.idCate }).populate([{ path: 'category', strictPopulate: false }]).exec();
                return rs;
            } catch (error) {
                return 'error'
            }

        }
    }
    //service find prod by name
    async getProdBySlug(request) {
        if (request) {
            try {
                let rs = await ProductModel.findOne({ "slug": request.params.slug }).populate([{ path: 'category', strictPopulate: false }]).exec();
                return rs;
            } catch (error) {
                return 'error'
            }

        }
    }

    //service sign up
    async signUp(request) {
        if (request) {
            console.log(request.body)
            try {
                let data = await curdHelper.create({
                    model: 'account',
                    obj: request.body
                });
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    async genarationAccessToken(account) {
        return jwt.sign({
            data: {
                id: account._id,
                admin: account.admin,
                name: account.name,
                email: account.email
            }
        }, process.env.JWT_ACCESS_KEY, { expiresIn: '1d' });
    }
    // servives login
    async userLogin(request, response) {
        if (request) {
            try {
                let rs = await AccountModel.findOne({ "email": request.body.email, "password": request.body.password });
                if (rs) {
                    console.log('User login', rs);
                    const user_access_token = await this.genarationAccessToken(rs);
                    // const refresh_token = await this.genarationRefreshToken(rs);
                    //save token in client
                    response.cookie("user_access_token", user_access_token, {
                        httpOnly: true,
                        secure: true,
                        path: "/",
                        samSite: "strict"
                    })
                    //
                    return rs;

                } else {
                    //return back login
                    return 'error'
                }

            } catch (error) {
                return error;
            }

        }
    }
    //service get inf user
    async getInfUser(request) {
        console.log('123', request.cookies.user_access_token)
        return jwt.verify(request.cookies.user_access_token, process.env.JWT_ACCESS_KEY, (err, result) => {
            if (err) {
                //return to login
                res.status(403).json("token is not valid !");
            } else {
                console.log(result);
                return result;
            }
        })
    }

    //service add to cart
    async addToCart(cart) {
        if (cart) {
            try {
                let data = await curdHelper.create({
                    model: 'cart',
                    obj: cart
                });
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }
    //check item incart
    async checkItemInCart(idAccount, idProduct) {
        if (idAccount, idProduct) {
            try {
                let data = await CartModel
                    .findOne({ "account": idAccount, "product.prod": idProduct });
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }
    //update count item incart
    async updateCountItemCart(idCart, obj) {
        if (idCart, obj) {
            try {
                let data = await curdHelper.update({
                    model: 'cart',
                    id: idCart,
                    obj: obj
                });
                console.log(data);
                return data;
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }
    //get cart user
    async getCartUser(idAccount) {
        try {
            let data = await CartModel
                .find({ "account": idAccount })
                .populate([{ path: 'product.prod', strictPopulate: false }])
                .exec();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error)
            return error
        }
    }

    //delete cart
    async deleteCartUser(idAccount) {
        if (idAccount) {
            CartModel.deleteMany({ 'account': idAccount }).then(() => {
            }).catch(function (e) {
                return 'error';
            })
            return 'success';
        }
    }
    //add bill
    async addBill(bill) {
        if (bill) {
            try {
                let data = await curdHelper.create({
                    model: 'order',
                    obj: bill
                });
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }

    //add comment
    async addComent(obj) {
        if (obj) {
            try {
                let data = await curdHelper.create({
                    model: 'comment',
                    obj: obj
                });
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }

    //get comment
    async getAllComment(req) {
        try {
            let data = await CommentModel
                .find({ "product": req.body.idProd })
                .populate([{ path: 'product', strictPopulate: false }])
                .populate([{ path: 'account', strictPopulate: false }])
                .exec();
            return data;
        } catch (error) {
            return error
        }
    }

    //get all bill user
    async getAllBillUser(idAccount) {
        try {
            let data = await OrderModel
                .find({ "account": idAccount })
                .populate([{ path: 'products.product', strictPopulate: false }])
                .exec();
            return data;
        } catch (error) {
            console.log(error)
            return error
        }
    }

    //live search prod
    async liveSearchProduct(request, response, next) {
        console.log(request.body.vlSearch)
        let rs = await ProductModel.find({ nameProduct: { $regex: new RegExp('^' + request.body.vlSearch + '.*', 'i') } })
        rs = rs.slice(0, 10);
        return rs;
    }

    //service get inf acccount
    async getInfAccount(request) {
        try {
            let data = await AccountModel
                .findById(request.body.idAccount)
                .exec();
            return data;
        } catch (error) {
            console.log(error)
            return error
        }
    }

    //service update inf account
    async updateInfAccount(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'account',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return data;
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }

    // service update image
    async upLoadAvataDrive(namePhoto) {
        try {
            let data = await googleApi.uploadFileDrive(process.env.FOLDER_IMAGE_CLIENT, namePhoto);
            return { 'data': data, 'namePhoto': namePhoto };
        } catch (error) {
            return 'error';
        }
    }
    // service update image
    async updateAvata(object) {
        if (object) {
            try {
                let data = await curdHelper.update({
                    model: 'account',
                    id: object._id,
                    obj: object.obj
                });
                return data;
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }
    // service get new prod 
    async getNewProduct(request) {
        if (request) {
            try {
                let data = await ProductModel.find().sort({ 'createdAt': 'desc' })
                    .populate([{ path: 'category', strictPopulate: false }]);
                data = data.slice(0, 4);
                return data;
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }

    //service get all comment page
    async getAllCommentPage(request) {
        if (request) {
            try {
                let data = await CommentModel
                    .find()
                    .populate([{ path: 'account', strictPopulate: false }])
                    .exec();
                let rs = [];
                data.map((cmt) => {
                    if (!cmt.product) {
                        rs.push(cmt)
                    }
                })
                return rs;
            } catch (error) {
                return error
            }
        }

    }
}
module.exports = new UserServices();