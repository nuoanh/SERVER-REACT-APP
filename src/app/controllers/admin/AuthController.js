const jwt = require("jsonwebtoken");
const AdminServies = require("../../services/admin/AdminServies");
const AccountModel = require("../../models/AccountModel");
const IntergrationGoogleServies = require("../../services/admin/IntergrationGoogleServies");
const formidable = require("formidable");
const sharp = require("sharp");
const fs = require('fs');
const path = require('path');


// Constants
class AuthController {
    //PAGE
    async pageAdmin(req, res, next) {

        if (!req.cookies.access_token) {
            res.render('admin-login', { layout: 'admin-login-layout.hbs' })
        } else {
            //redirect
            res.redirect('home');
        }
    }

    //PAGE HOME
    async homeAdmin(req, res, next) {
        res.render('admin-home', { layout: 'admin-layout.hbs' })
    }

    //PAGE  PROD
    async productAdmin(req, res, next) {
        res.render('admin-product', { layout: 'admin-layout.hbs' })
    }
    //PAGE CATEFGORY
    async categoryAdmin(req, res, next) {
        res.render('admin-category', { layout: 'admin-layout.hbs' })
    }
    //PAGE IMAGE REPONSITORY
    async imageResponsitoryAdmin(req, res, next) {
        res.render('admin-responsitory', { layout: 'admin-layout.hbs' })
    }
    //sumit form in fage responsitory
    async bulkUploadImage(request, response, next) {
        var formdata = formidable({ multiples: true });
        const uploadFolder = path.join(__dirname, "./uploads");
        formdata.uploadDir = uploadFolder;
        formdata.multiples = true;
        formdata.maxFileSize = 50 * 1024 * 1024; // 5MB
        formdata.keepExtensions = true;
        formdata.parse(request, async (err, fields, files) => {
            if (err) {
                console.log(err)
                return;
            }
            var arrOfFiles = []
            arrOfFiles = files.file;
            console.log(arrOfFiles)

            if (arrOfFiles.length) {
                console.log(arrOfFiles.length)
                await arrOfFiles.map((each) => {
                    console.log(each.filepath)
                    sharp(each.filepath)
                        .webp()
                        .toFile(__dirname + '/convert-upload/' + each.newFilename + '.webp')
                        .then(function (info) {
                            console.log(info)
                        }).then(async () => {
                            //name file upload
                            const res = await AdminServies.upLoadFileDrive(each.newFilename);

                            if (res) {
                                setTimeout(function () {
                                    fs.unlink(__dirname + '/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                }, 3000)

                                setTimeout(function () {
                                    fs.unlink(__dirname + '/uploads/' + res.namePhoto, function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                }, 3000)
                                return res;
                            }
                        })
                        .catch(function (err) {
                            console.log(err)
                        })

                });
                response.redirect('/admin/image-responsitory');

            } else {
                console.log(files.file.filepath)
                sharp(files.file.filepath)
                    .webp()
                    .toFile(__dirname + '/convert-upload/' + files.file.newFilename + '.webp')
                    .then(function (info) {
                        console.log(info)
                    }).then(async () => {
                        const res = await AdminServies.upLoadFileDrive(files.file.newFilename);
                        if (res) {
                            setTimeout(function () {
                                console.log(__dirname);
                                fs.unlink(__dirname + '/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            setTimeout(function () {
                                fs.unlink(__dirname + '/uploads/' + res.namePhoto, function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            return res;
                        }
                    }).then((data) => {
                        if (data) {
                            response.redirect('/admin/image-responsitory');
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        });

        // console.log('123', request.body);
        // response.setHeader("Content-Type", "text/json");
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // response.json(request.body);
    }
    //sumit form in fage responsitory image product
    async bulkUploadImageCompanny(request, response, next) {
        var formdata = formidable({ multiples: true });
        const uploadFolder = path.join(__dirname, "./uploads");
        formdata.uploadDir = uploadFolder;
        formdata.multiples = true;
        formdata.maxFileSize = 50 * 1024 * 1024; // 5MB
        formdata.keepExtensions = true;
        formdata.parse(request, async (err, fields, files) => {
            if (err) {
                console.log(err)
                return;
            }
            var arrOfFiles = []
            arrOfFiles = files.file;
            console.log(arrOfFiles)

            if (arrOfFiles.length) {
                console.log(arrOfFiles.length)
                await arrOfFiles.map((each) => {
                    console.log(each.filepath)
                    sharp(each.filepath)
                        .webp()
                        .toFile(__dirname + '/convert-upload/' + each.newFilename + '.webp')
                        .then(function (info) {
                            console.log(info)
                        }).then(async () => {
                            //name file upload
                            const res = await AdminServies.upLoadFileCompanyDrive(each.newFilename);

                            if (res) {
                                setTimeout(function () {
                                    fs.unlink(__dirname + '/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                }, 3000)

                                setTimeout(function () {
                                    fs.unlink(__dirname + '/uploads/' + res.namePhoto, function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                }, 3000)
                                return res;
                            }
                        })
                        .catch(function (err) {
                            console.log(err)
                        })

                });
                response.redirect('/admin/responsitory-image-company');

            } else {
                console.log(files.file.filepath)
                sharp(files.file.filepath)
                    .webp()
                    .toFile(__dirname + '/convert-upload/' + files.file.newFilename + '.webp')
                    .then(function (info) {
                        console.log(info)
                    }).then(async () => {
                        const res = await AdminServies.upLoadFileCompanyDrive(files.file.newFilename);
                        if (res) {
                            setTimeout(function () {
                                console.log(__dirname);
                                fs.unlink(__dirname + '/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            setTimeout(function () {
                                fs.unlink(__dirname + '/uploads/' + res.namePhoto, function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            return res;
                        }
                    }).then((data) => {
                        if (data) {
                            response.redirect('/admin/responsitory-image-company');
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        });

        // console.log('123', request.body);
        // response.setHeader("Content-Type", "text/json");
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // response.json(request.body);
    }
    //PAGE INFORMATION COMPANY
    async informationCompany(req, res, next) {
        if (req) {
            res.render('admin-information-company', { layout: 'admin-layout.hbs' })
        }
    }
    //PAGE RESPONSITORY COMPANY
    async responsitoryImageCompany(req, res, next) {
        if (req) {
            res.render('admin-responsitory-company', { layout: 'admin-layout.hbs' })
        }
    }
    //PAGE SOCIAL COMPANY
    async socialCompany(req, res, next) {
        if (req) {
            res.render('admin-social-company', { layout: 'admin-layout.hbs' })
        }
    }
    //PAGE BANNER SLIDER
    async bannerSlider(req, res, next) {
        if (req) {
            res.render('admin-banner-slider', { layout: 'admin-layout.hbs' })
        }
    }
    //PAGE ABOUT
    async aboutMe(req, res, next) {
        if (req) {
            res.render('admin-about-company', { layout: 'admin-layout.hbs' })
        }
    }
    // PAGE ORDER

    async orderHandle(req, res, next) {
        if (req) {
            res.render('order-handle', { layout: 'admin-layout.hbs' })
        }
    }
    //PAGE ORDER SUCCESSFULLY
    async orderSuccess(req, res, next) {
        if (req) {
            res.render('order-success', { layout: 'admin-layout.hbs' })
        }
    }

    //PAGE COMMENT PRODUCT
    async commentProduct(req, res, next) {
        if (req) {
            res.render('admin-comment-product', { layout: 'admin-layout.hbs' })
        }
    }

    //PAGE BLOG MANAGER
    async blogManager(req, res, next) {
        if (req) {
            res.render('admin-blog', { layout: 'admin-layout.hbs' })

        }
    }

    //API
    //login admin
    async index(req, res, next) {
        let result = await AdminServies.authorAdminService(req, res, next);
    }
    async getAll(req, res, next) {
        let result = await IntergrationGoogleServies.getAllFileInFolder(req, res, next);
        res.status(200).json({
            status: 'successfully',
            data: result
        })
    }
    async allImageProject(req, res, next) {
        const result = await AdminServies.getAllFileInFolder(req);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (result != 'error') {
            res.json(result)
        } else {
            // console.log(res)
            console.log(result)
        }
    }
    async allImageCompany(req, res, next) {
        const result = await AdminServies.getAllFileImageCompanyInFolder(req);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (result != 'error') {
            res.json(result)
        } else {
            // console.log(res)
            console.log(result)
        }
    }


    async deleteFileDrive(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.deleteFileDrive(request);
        if (res == 204) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async addProd(request, response, nexts) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.addProduct(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getAllProd(request, response, nexts) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.getAllProd(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }

    }
    async getDetailProd(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.getDetailProdById(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }

    }
    async updateProduct(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.updateProduct(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async updateInformationCompany(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.updateInformationCompany(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }

    async deleteProduct(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.deleteProduct(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }

    async addCateProduct(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.addCateProduct(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getAllCategory(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.getAllCategory(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async deleteCategory(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.deleteCategory(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getDetailCate(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.getDetailCateById(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async updateCategory(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.updateCategory(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async addInformationCompany(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.addInfCompany(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getInformationCompany(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        const res = await AdminServies.getInfCompany(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getAllBill(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        const res = await AdminServies.getAllBill(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async acceptBill(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        const res = await AdminServies.acceptBill(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getAllComment(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        const res = await AdminServies.getAllComment(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async responseComment(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        //get all response of this coment
        const cmt_response = await AdminServies.detailComment(request);
        let arr_response = cmt_response.response;
        arr_response.push(request.body.response);

        let obj = {
            _id: request.body._id,
            obj: {
                response: arr_response
            }
        }
        const res = await AdminServies.responseComment(obj);
        if (res) {
            console.log(res)

            response.json(res);
        } else {
            response.json('error');
        }

    }
    async getAllAcount(request, response, next) {

        const res = await AdminServies.getAllAccount(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async getBillByAccount(request, response, next) {
        const res = await AdminServies.getBillByAccount(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }


    async addCateBlog(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.addCateBlog(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }



    async getAllCategoryBlog(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.getAllCategoryBlog(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }

    async getDetailCateBlog(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.getDetailCateBlogById(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async updateCategoryBlog(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.updateCategoryBlog(request);
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }
    async deleteCategoryBlog(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await AdminServies.deleteCategoryBlog(request);
        console.log(res)
        if (res) {
            response.json(res);
        } else {
            response.json('error');
        }
    }

}

// RESET REFRESH TOKEN
// async refreshToken(req, res, next) {
//     try {
//         let result = await AdminServies.resetTokenByRefreshToken(req, res, next);
//         res.send(result);

//     } catch (error) {
//         console.log(error);
//     }
// }


module.exports = new AuthController();
