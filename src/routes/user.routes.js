const UserController = require("../app/controllers/UserController");
const AuthMiddlewareUser = require("../app/middlewares/AuthMiddlewareUser");
const LoginMiddlewareUser = require("../app/middlewares/LoginMiddleWare");

const router = require("express").Router();

//PAGE
router.get('/', UserController.index);
router.get('/about', UserController.about);
router.get('/shop', UserController.shop);
router.get('/category/:idCate', UserController.cateOfShop);
router.get('/special-prod', UserController.specialProd)
router.get('/product/:slug', UserController.prodByName)
router.get('/product', UserController.shop)
router.get('/login', UserController.login)
router.get('/register', UserController.register)

router.get('/cart', LoginMiddlewareUser.verifytoken, UserController.cart);
router.get('/checkout', LoginMiddlewareUser.verifytoken, UserController.checkout);

router.get('/contact', UserController.contact);
router.get('/buy-now/:slug/:count', UserController.buyNow);
router.get('/profile', LoginMiddlewareUser.verifytoken, UserController.profile)
router.get('/blog', UserController.blog);

//API
//get information commpany
router.get('/get-inf-company', UserController.getInfCompany)
//get all category
router.get('/get-all-category', UserController.getAllCategory)
//get special prod
router.get('/get-special-prod', UserController.getSpecialProduct);
//get all prod
router.get('/get-all-prod', UserController.getAllProd);
//get prod by idcate
router.get('/get-prod-by-category/:idCate', UserController.getProdByCate);
//get detail prod by slug
router.get('/get-prod-by-slug/:slug', UserController.getProdBySlug)
//post api register
router.post('/sign-up', UserController.signUp);
//post login
router.post('/login', UserController.userLogin);
//check login user
router.get('/get-inf-login', AuthMiddlewareUser.verifytoken, UserController.getInfUser);
//add to cart
router.post('/add-to-cart', AuthMiddlewareUser.verifytoken, UserController.addCart);
//get cart
router.get('/get-cart-user', AuthMiddlewareUser.verifytoken, UserController.getCart);
//add bill
router.post('/add-bill', AuthMiddlewareUser.verifytoken, UserController.addBill);
//comment
router.post('/add-comment', AuthMiddlewareUser.verifytoken, UserController.addComment);
//get all bill
router.get('/get-all-bill', AuthMiddlewareUser.verifytoken, UserController.getAllBill);
//add bill with free user
router.post('/add-bill-user-free', UserController.addBillUserFree);
//search product
router.post('/search-product-by-name', UserController.searchProductByName);
//get inf user
router.post('/get-inf-account', AuthMiddlewareUser.verifytoken, UserController.getInfAccount)
//update inf account
router.post('/update-inf-account', AuthMiddlewareUser.verifytoken, UserController.updateInfAccount)

//update avata account
router.post('/update-avata-account', AuthMiddlewareUser.verifytoken, UserController.updateAvataAccount)
//get new prod
router.get('/get-new-product', UserController.getNewProduct);

//get all comment
router.post('/get-all-comment-prod', UserController.allComment);

//get all comment page
router.get('/get-all-comment-page', UserController.allCommentPage);


//more api for app order

module.exports = router;