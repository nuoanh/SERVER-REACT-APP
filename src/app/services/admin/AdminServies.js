const curdHelper = require('../../helpers/crud');
const logger = require('../../constants/loggerConstant');
const AccountModel = require('../../models/AccountModel');
var jwt = require('jsonwebtoken');
var formidable = require('formidable');
const googleApi = require('../../helpers/googleApi');
const ProductModel = require('../../models/ProductModel');
const CategoryModel = require('../../models/CategoryModel');
const OrderModel = require('../../models/OrderModel');
const CateBlogModel = require('../../models/CateBlogModel');
require('dotenv').config()



class AdminServices {
    //genaration accesstoken
    async genarationAccessToken(account) {
        return jwt.sign({
            data: {
                id: account._id,
                admin: account.admin
            }
        }, process.env.JWT_ACCESS_KEY, { expiresIn: '1d' });
    }
    //genaration refresstoken
    async genarationRefreshToken(account) {
        return jwt.sign({
            data: {
                id: account._id,
                admin: account.admin
            }
        }, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: '30d' });
    }
    //authorization admin account service
    async authorAdminService(req, res, next) {
        const errors = [];

        //formidable
        // var form = new formidable.IncomingForm();
        // var username;
        // var password;
        // await form.parse(req, async function (err, fields) {
        //     username = fields.username;
        //     password = fields.password;
        // })
        //
        try {
            //handle athor in here
            if (!req) {
                return res.status(401).json("Bad request !");
            } else {
                //check admin account
                let rs = await AccountModel.findOne(
                    {
                        username: req.body.username,
                        password: req.body.password
                    }
                )
                if (rs) {
                    console.log(rs.admin)
                    if (rs.admin === true) {
                        console.log('Admin login');
                        const access_token = await this.genarationAccessToken(rs);
                        const refresh_token = await this.genarationRefreshToken(rs);
                        //save token in client
                        res.cookie("access_token", access_token, {
                            httpOnly: true,
                            secure: false,
                            path: "/",
                            samSite: "strict"
                        })
                        //
                        return res.status(200).json({
                            status: true,
                            mess: 'Đăng nhập vào admin thành công !',
                            data: rs
                        });
                    } else {
                        console.log('cant not login')
                        return res.status(200).json({
                            status: false,
                            mess: "Tài khoản này không có quyền !"
                        });
                    }

                } else {
                    //return back login
                    return res.status(200).json({
                        status: false,
                        mess: "Không tồn tại tài khoản này!"
                    });
                }
            }
        } catch (error) {
            errors.push(error)
        }

    }

    //services get all design from ggdrive
    async getAllFileInFolder(request, response, next) {
        try {
            if (request) {
                let data = await googleApi.listFiles(process.env.FORDER_IMAGE_PRODUCT);
                return data;
            }
        } catch (error) {
            console.log(error)
            return 'error'
        }
    }
    //services get all image company from ggdrive
    async getAllFileImageCompanyInFolder(request, response, next) {
        try {
            if (request) {
                let data = await googleApi.listFiles(process.env.FOLDER_IMAGE_COMPANY);
                return data;
            }
        } catch (error) {
            console.log(error)
            return 'error'
        }
    }

    // service bulk upload file drive
    async upLoadFileDrive(namePhoto) {
        try {
            let data = await googleApi.uploadFileDrive(process.env.FORDER_IMAGE_PRODUCT, namePhoto);
            return { 'data': data, 'namePhoto': namePhoto };
        } catch (error) {
            return 'error';
        }
    }
    // service bulk upload iamge company drive
    async upLoadFileCompanyDrive(namePhoto) {
        try {
            let data = await googleApi.uploadFileDrive(process.env.FOLDER_IMAGE_COMPANY, namePhoto);
            return { 'data': data, 'namePhoto': namePhoto };
        } catch (error) {
            return 'error';
        }
    }

    //service delete file
    async deleteFileDrive(request) {
        if (request) {
            try {
                let data = await googleApi.deleteFile(request.body.fileId);
                return data;
            } catch (error) {
                return error;
            }
        }

    }
    // service add prod
    async addProduct(request) {
        if (request) {
            console.log(request.body)
            try {
                let data = await curdHelper.create({
                    model: 'product',
                    obj: request.body
                });
                return data;
            } catch (error) {
                console.log(error)

            }
        }
    }
    //services get all prod
    async getAllProd(request) {
        try {
            let data = await curdHelper.getAll({
                model: 'product',
                query: request.query,
                populate: [{ path: 'category', strictPopulate: false }],
            })
            data = data.map(data => data.toObject());
            console.log('mia', data);
            return data;
        } catch (error) {
            return error;
        }
    }
    //service get detail one prod
    async getDetailProdById(request) {
        if (request) {
            try {
                let data = await curdHelper.getSingle({
                    model: 'product',
                    id: request.params.idProd,
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }

    }
    //update product
    async updateProduct(request) {

        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'product',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }
    //delete prod
    async deleteProduct(request) {
        console.log('đâsd', request.body)
        if (request) {
            ProductModel.deleteOne(request.body).then(() => {
            }).catch(function (e) {
                return 'error';
            })
            return 'success';

        }

    }

    //add categỏy
    async addCateProduct(request) {
        if (request) {
            console.log(request.body)
            try {
                let data = await curdHelper.create({
                    model: 'category',
                    obj: request.body
                });
                return data;
            } catch (error) {
                console.log(error)

            }
        }
    }
    //all category
    async getAllCategory(request) {
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
    // delete category
    async deleteCategory(request) {
        if (request) {
            CategoryModel.deleteOne(request.body).then(() => {
            }).catch(function (e) {
                return 'error';
            })
            return 'success';
        }

    }
    async getDetailCateById(request) {
        if (request) {
            try {
                let data = await curdHelper.getSingle({
                    model: 'category',
                    id: request.params.idCate,
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }
    async updateCategory(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'category',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }

    //add inf company
    async addInfCompany(request) {
        if (request) {
            console.log(request.body)
            try {
                let data = await curdHelper.create({
                    model: 'inforCompany',
                    obj: request.body
                });
                return data;
            } catch (error) {
                console.log(error)

            }
        }
    }
    //update inf company
    async updateInformationCompany(request) {

        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'inforCompany',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }

    //get inf company
    //service get detail one prod
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

    //get all bill
    async getAllBill(request) {
        if (request) {
            try {
                let data = await curdHelper.getAll({
                    model: 'order',
                    query: request.query,
                    populate: [{ path: 'products.product', strictPopulate: false }, { path: 'account', strictPopulate: false }],
                })
                return data;
            } catch (error) {
                return error;
            }
        }

    }

    // services accept bil
    async acceptBill(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'order',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }

    // service get all comment
    async getAllComment(request) {
        if (request) {
            try {
                let data = await curdHelper.getAll({
                    model: 'comment',
                    query: request.query,
                    populate: [{ path: 'product', strictPopulate: false }, { path: 'account', strictPopulate: false }],
                })
                return data;
            } catch (error) {
                return error;
            }
        }
    }

    //service response cmt 
    async responseComment(obj) {
        if (obj) {
            try {
                let data = await curdHelper.update({
                    model: 'comment',
                    id: obj._id,
                    obj: obj.obj
                });
                return data;
            } catch (error) {
                return error;
            }
        }
    }

    // service get detail comment
    async detailComment(request) {
        if (request) {
            try {
                let data = await curdHelper.getSingle({
                    model: 'comment',
                    id: request.body._id,
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }

    //service get all account

    async getAllAccount(request) {
        if (request) {
            try {
                let data = await curdHelper.getAll({
                    model: 'account',
                    query: request.query,
                })
                return data;
            } catch (error) {
                return error;
            }
        }
    }

    async getBillByAccount(request) {
        if (request) {
            try {
                let data = await OrderModel
                    .find({ "account": request.body.idAccount })
                    .populate([{ path: 'account', strictPopulate: false }])
                    .exec();
                return data;
            } catch (error) {
                return error
            }
        }
    }

    // service add cate blog
    //add categỏy
    async addCateBlog(request) {
        if (request) {
            console.log('12', request.body)
            try {
                let data = await curdHelper.create({
                    model: 'cateBlog',
                    obj: request.body
                });
                return data;
            } catch (error) {
                console.log(error)

            }
        }
    }
    //all category blog
    async getAllCategoryBlog(request) {
        try {
            let data = await curdHelper.getAll({
                model: 'cateBlog',
                query: request.query
            })
            data = data.map(data => data.toObject());
            return data;
        } catch (error) {
            return 'error';
        }
    }

    //get detail cate blog by id

    async getDetailCateBlogById(request) {
        if (request) {
            try {
                let data = await curdHelper.getSingle({
                    model: 'cateBlog',
                    id: request.params.idCate,
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }
    //update cate  blog
    async updateCategoryBlog(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'cateBlog',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return data;
            } catch (error) {
                return 'error';
            }
        }
    }
    // delete category
    async deleteCategoryBlog(request) {
        if (request) {
            CateBlogModel.deleteOne(request.body).then(() => {
            }).catch(function (e) {
                return 'error';
            })
            return 'success';
        }

    }
    // //reset accesstoken by refresh token
    // async resetTokenByRefreshToken(req, res, next) {
    //     const refreshToken = req.cookies.refreshToken;

    //     if (!refreshToken) {
    //         return res.status(401).json("You're not authenticated ");
    //     }

    //     jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY, (err, account) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         const newAccessToken = genarationAccessToken(account);
    //         const newRefreshToken = genarationRefreshToken(account);
    //         //save in cookies
    //         res.cookie("refreshToken", newRefreshToken, {
    //             httpOnly: true,
    //             secure: false,
    //             path: "/",
    //             samSite: "strict"
    //         })
    //         return es.status(200).json({ accessToken: newAccessToken });
    //     })
    // }
}
module.exports = new AdminServices();