// Constants
const formidable = require('formidable');
const logger = require('../constants/loggerConstant');
const UserService = require('../services/user/UserService');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');


class UserController {
    //return page hbs
    async index(req, res, next) {
        if (req) {
            res.render('index', { layout: 'main.hbs' })
        }
    }

    //PAGE ABOUT
    async about(req, res, next) {
        if (req) {
            res.render('about', { layout: 'main.hbs' })
        }
    }
    //PAGE SHOP
    async shop(req, res, next) {
        if (req) {
            res.render('shop', { layout: 'main.hbs' })
        }
    }

    //Prod of cate
    async cateOfShop(req, res, next) {
        let idCate = req.params.idCate;

        if (req) {
            res.render('cate-shop', {
                layout: 'main.hbs',
                data: idCate
            })
        }
    }
    //PAGE SPECIAL PROD
    async specialProd(req, res, next) {
        if (req) {
            res.render('special-shop', {
                layout: 'main.hbs',
            })
        }
    }
    //PAGE PROD BY NAME
    async prodByName(req, res, next) {
        if (req) {
            res.render('prod-by-name', {
                layout: 'main.hbs',
                data: req.params.slug
            })
        }
    }

    //PAGE LOGIN
    async login(req, res, next) {
        if (req) {
            res.render('login', {
                layout: 'user-login.hbs'
            })
        }
    }

    //PAGE REGISTER
    async register(req, res, next) {
        if (req) {
            res.render('register', {
                layout: 'user-login.hbs'
            })
        }
    }
    //PAGE CART
    async cart(req, res, next) {
        if (req) {
            res.render('cart', {
                layout: 'main.hbs'
            })
        }
    }
    //PAGE CHECKOUT
    async checkout(req, res, next) {
        if (req) {
            res.render('checkout', {
                layout: 'main.hbs'
            })
        }
    }
    //PAGE CONTACT
    async contact(req, res, next) {
        if (req) {
            res.render('contact', {
                layout: 'main.hbs'
            })
        }
    }

    //PAGE BUY NOW
    async buyNow(req, res, next) {
        if (req) {
            res.render('buy-now', {
                layout: 'main.hbs',
                data: req.params.slug,
                count: req.params.count
            })
        }
    }

    //PAEG PROFILE
    async profile(req, res, next) {
        if (req) {
            res.render('profile', {
                layout: 'main.hbs',
            })
        }
    }

    //PAGE BLOG
    async blog(req, res, next) {
        if (req) {
            res.render('blog', {
                layout: 'blog-layout.hbs',
            })
        }
    }
    //return json(API)
    async getInfCompany(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rs = await UserService.getInfCompany(req);
        if (rs) {
            res.json(rs);
        }
    }
    async getAllCategory(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rs = await UserService.getAllCategory(req);
        if (rs) {
            res.json(rs);
        }
    }
    async getSpecialProduct(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rs = await UserService.getSpecialProd(req);
        if (rs) {
            res.json(rs);
        }
    }
    async getAllProd(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rs = await UserService.getAllProd(req);
        if (rs) {
            res.json(rs);
        }
    }
    async getProdByCate(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.getProdByCate(req);
        if (rs) {
            res.json(rs);
        }
    }
    async getProdBySlug(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.getProdBySlug(req);
        console.log(rs)
        if (rs) {
            res.json(rs);
        }
    }
    async signUp(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.signUp(req);
        console.log(rs)
        if (rs) {
            res.json(rs);
        }
    }
    async userLogin(req, res, next) {

        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.userLogin(req, res);
        if (rs) {
            res.json(rs);
        }

    }
    async getInfUser(req, res, next) {

        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.getInfUser(req);
        if (rs) {
            res.status(200).json({ status: 'success', data: rs.data });
        }
    }
    async addCart(req, res, next) {
        let access_token_user = req.cookies.user_access_token;
        let idAccount;
        if (access_token_user) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = access_token_user;
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {
                if (err) {
                    //return to login
                    res.status(403).json({ status: false, mess: "token is not valid !" });
                } else {
                    if (result.data) {
                        idAccount = result.data.id;
                    }
                }
            })
        } else {
            //return to login
            res.status(200).json({ status: false, mess: "you are not authenticated !" });
        }
        let cart = {
            product: req.body.product,
            price: req.body.price,
            count: req.body.count,
            account: idAccount
        }

        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        //check item in cart
        let check = await UserService.checkItemInCart(idAccount, req.body.product.prod);
        if (check) {
            let obj = {

                price: check.price,
                count: parseInt(req.body.count) + parseInt(check.count),

                account: idAccount
            }
            let updateCart = await UserService.updateCountItemCart(check._id, obj);

            res.status(200).json({ status: 'success' });
        } else {
            let rs = await UserService.addToCart(cart);
            if (rs) {
                res.status(200).json({ status: 'success' });
            }
        }

    }

    async getCart(req, res, next) {
        let access_token_user = req.cookies.user_access_token;
        let idAccount;
        if (access_token_user) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = access_token_user;
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {
                if (err) {
                    //return to login
                    res.status(403).json({ status: false, mess: "token is not valid !" });
                } else {
                    if (result.data) {
                        idAccount = result.data.id;

                    }
                }
            })
        } else {
            //return to login
            res.status(200).json({ status: false, mess: "you are not authenticated !" });
        }
        if (idAccount) {
            let getCart = await UserService.getCartUser(idAccount);
            if (getCart) {
                res.status(200).json({ status: 'success', data: getCart });
            }
        }
    }
    async addBill(req, res, next) {
        let access_token_user = req.cookies.user_access_token;
        let idAccount;
        if (access_token_user) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = access_token_user;
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {
                if (err) {
                    //return to login
                    res.status(403).json({ status: false, mess: "token is not valid !" });
                } else {
                    if (result.data) {
                        idAccount = result.data.id;

                    }
                }
            })
        } else {
            //return to login
            res.status(200).json({ status: false, mess: "you are not authenticated !" });
        }
        if (idAccount) {
            let getCart = await UserService.getCartUser(idAccount);

            console.log(getCart)
            if (getCart) {
                let arr_prod = [];
                getCart.map((cart) => {
                    arr_prod.push(
                        {
                            product: cart.product.prod,
                            count: cart.count,
                            price: cart.price
                        })
                })

                let bill = {
                    account: idAccount,
                    inf: req.body.obj,
                    products: arr_prod

                }
                let payment = await UserService.addBill(bill);
                //add bill
                if (payment == "success") {
                    //delete cart
                    let deleteCart = await UserService.deleteCartUser(idAccount);
                    if (deleteCart == 'success') {
                        res.status(200).json({ status: 'success', data: payment });

                    }
                }
            }
        }
    }

    async addComment(req, res, next) {

        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let access_token_user = req.cookies.user_access_token;
        let idAccount;
        if (access_token_user) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = access_token_user;
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {
                if (err) {
                    //return to login
                    res.status(403).json({ status: false, mess: "token is not valid !" });
                } else {
                    if (result.data) {
                        idAccount = result.data.id;
                    }
                }
            })
        } else {
            //return to login
            res.status(200).json({ status: false, mess: "you are not authenticated !" });
        }

        let obj = {
            account: idAccount,
            product: req.body.product,
            content: req.body.content
        }
        if (obj) {
            let rs = await UserService.addComent(obj);
            console.log(rs)
            if (rs) {
                res.status(200).json({ status: 'success', data: rs.data });
            }
        }
    }
    async allComment(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.getAllComment(req);
        if (rs) {
            res.json(rs);
        }

    }
    async getAllBill(req, res, next) {
        let access_token_user = req.cookies.user_access_token;
        let idAccount;
        if (access_token_user) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = access_token_user;
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {
                if (err) {
                    //return to login
                    res.status(403).json({ status: false, mess: "token is not valid !" });
                } else {
                    if (result.data) {
                        idAccount = result.data.id;

                    }
                }
            })
        } else {
            //return to login
            res.status(200).json({ status: false, mess: "you are not authenticated !" });
        }
        let allBill = await UserService.getAllBillUser(idAccount);
        if (allBill) {
            let obj = {

            }
            res.status(200).json({ status: true, data: allBill });
        }
    }
    async addBillUserFree(req, res, next) {
        if (req) {
            let bill = {
                inf: req.body.obj,
                products: {
                    product: req.body.idProduct,
                    price: req.body.price,
                    count: req.body.count
                }

            }
            console.log(bill)
            let payment = await UserService.addBill(bill);
            //add bill
            if (payment == "success") {
                //delete cart
                res.status(200).json({ status: 'success', data: payment });
            }
        }

    }
    async searchProductByName(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rsSearch = await UserService.liveSearchProduct(req)
        res.json(rsSearch)
    }

    async getInfAccount(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let account = await UserService.getInfAccount(req)
        let obj = {
            _id: account._id,
            name: account.name,
            email: account.email,
            imageAvata: account.imageAvata,
            address: account.address,
            phone: account.phone
        }
        res.json(obj)
    }

    async updateInfAccount(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rsSearch = await UserService.updateInfAccount(req)
        res.json(rsSearch)
    }

    async updateAvataAccount(request, response, next) {
        console.log('12312321', response.body);

        var formdata = formidable({ multiples: true });
        const uploadFolder = path.join(__dirname, "./admin/uploads");
        console.log(uploadFolder)
        formdata.uploadDir = uploadFolder;
        formdata.multiples = true;
        formdata.maxFileSize = 50 * 1024 * 1024; // 5MB
        formdata.keepExtensions = true;
        formdata.parse(request, async (err, fields, files) => {
            var idAccount = fields.idAccount;
            if (err) {
                console.log(err)
                return;
            }
            var arrOfFiles = []
            arrOfFiles = files.file;

            if (arrOfFiles.length) {

            } else {

                sharp(files.file.filepath)
                    .webp()
                    .toFile(__dirname + './admin/convert-upload/' + files.file.newFilename + '.webp')
                    .then(function (info) {
                        console.log(info)
                    }).then(async () => {
                        const res = await UserService.upLoadAvataDrive(files.file.newFilename);



                        if (res) {
                            console.log('idAccount', idAccount)
                            //update avata account
                            let object = {
                                _id: idAccount,
                                obj: {
                                    imageAvata: `https://drive.google.com/uc?id=` + res.data + ` `
                                },
                            }
                            let updateAvata = await UserService.updateAvata(object)
                            console.log('updateAvata', updateAvata);

                            setTimeout(function () {
                                console.log(__dirname);
                                fs.unlink(__dirname + '/admin/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            setTimeout(function () {
                                fs.unlink(__dirname + '/admin/uploads/' + res.namePhoto, function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            return res;
                        }
                    }).then((data) => {
                        if (data) {
                            response.redirect('/profile');
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        });
    }


    async getNewProduct(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let rs = await UserService.getNewProduct(req)
        res.json(rs)
    }
    async allCommentPage(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let rs = await UserService.getAllCommentPage(req);
        if (rs) {
            res.json(rs);
        }
    }
}

module.exports = new UserController();
