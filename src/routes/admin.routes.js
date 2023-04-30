const bodyParser = require('body-parser');
const AuthController = require("../app/controllers/admin/AuthController");
const MiddleWareController = require("../app/middlewares/MiddlewareController");

const router = require("express").Router();


//router for page
router.get('/', AuthController.pageAdmin);
router.get('/home', MiddleWareController.verifytoken, AuthController.homeAdmin);
router.get('/admin-product', MiddleWareController.verifytoken, AuthController.productAdmin)
router.get('/category-product', MiddleWareController.verifytoken, AuthController.categoryAdmin)
router.get('/image-responsitory', MiddleWareController.verifytoken, AuthController.imageResponsitoryAdmin)
router.get('/admin-information-company', MiddleWareController.verifytoken, AuthController.informationCompany)
router.get('/responsitory-image-company', MiddleWareController.verifytoken, AuthController.responsitoryImageCompany)
router.get('/admin-social-company', MiddleWareController.verifytoken, AuthController.socialCompany)
router.get('/admim-banner-slider', MiddleWareController.verifytoken, AuthController.bannerSlider)
router.get('/admin-about-company', MiddleWareController.verifytoken, AuthController.aboutMe)
router.get('/order-handle', MiddleWareController.verifytoken, AuthController.orderHandle)
router.get('/order-success', MiddleWareController.verifytoken, AuthController.orderSuccess);
router.get('/comment-product', MiddleWareController.verifytoken, AuthController.commentProduct);
router.get('/admin-blog', MiddleWareController.verifytoken, AuthController.blogManager)



//router for API
//middle MiddleWareController.verifytoken ware check token in header
router.get('/get-all', MiddleWareController.verifytoken, AuthController.getAll);
//get all iamge in google drive
router.get("/all-image-project", MiddleWareController.verifytoken, AuthController.allImageProject)

//get all iamge in google drive
router.get("/all-image-company", MiddleWareController.verifytoken, AuthController.allImageCompany)


//bulk upload iamge infolder
router.post("/bulk-upload-design", MiddleWareController.verifytoken, AuthController.bulkUploadImage)
//bulk upload iamge company infolder
router.post("/bulk-upload-image-company", MiddleWareController.verifytoken, AuthController.bulkUploadImageCompanny)
//delete file in drive
router.post("/delete-image-project-drive", MiddleWareController.verifytoken, AuthController.deleteFileDrive);
//add prod
router.post("/add-prod", MiddleWareController.verifytoken, AuthController.addProd)
//get all prod
router.get("/get-all-prod", MiddleWareController.verifytoken, AuthController.getAllProd);
//get detail prod
router.get("/get-detail-prod/:idProd", MiddleWareController.verifytoken, AuthController.getDetailProd)
//update product
router.post("/update-prod", MiddleWareController.verifytoken, AuthController.updateProduct)
//delete prod
router.post('/delete-prod', MiddleWareController.verifytoken, AuthController.deleteProduct)


//add category product
router.post('/add-cate-prod', MiddleWareController.verifytoken, AuthController.addCateProduct)
// get all category product
router.get('/get-all-category', MiddleWareController.verifytoken, AuthController.getAllCategory)
//delete category
router.post('/delete-category', MiddleWareController.verifytoken, AuthController.deleteCategory);
// get detail category
router.get("/get-detail-category/:idCate", MiddleWareController.verifytoken, AuthController.getDetailCate)
// update categỏy
router.post("/update-category", MiddleWareController.verifytoken, AuthController.updateCategory)

//add infomation company
router.post('/add-inf-company', MiddleWareController.verifytoken, AuthController.addInformationCompany)

//get information company
router.get('/get-inf-company', MiddleWareController.verifytoken, AuthController.getInformationCompany)

//update infomation company
router.post('/update-inf-company', MiddleWareController.verifytoken, AuthController.updateInformationCompany)

//get all bill
router.get('/get-all-bill-pay', MiddleWareController.verifytoken, AuthController.getAllBill);

//post accept bill
router.post('/accept-bill', MiddleWareController.verifytoken, AuthController.acceptBill)

//get all comment
router.get('/get-all-comment', MiddleWareController.verifytoken, AuthController.getAllComment);

router.post('/get-bill-by-account', MiddleWareController.verifytoken, AuthController.getBillByAccount);
//response comment
router.post('/response-comment', MiddleWareController.verifytoken, AuthController.responseComment)
//refresh token
// router.post('/resfresh-token', AuthController.refreshToken);

//get all account
router.get('/get-all-account', MiddleWareController.verifytoken, AuthController.getAllAcount)

//add cate blog
router.post('/add-cate-blog', MiddleWareController.verifytoken, AuthController.addCateBlog);
//get all cate blog
router.get('/get-all-category-blog', MiddleWareController.verifytoken, AuthController.getAllCategoryBlog);
//get cate blog by id
router.get("/get-detail-category-blog/:idCate", MiddleWareController.verifytoken, AuthController.getDetailCateBlog)
//update cate 
router.post("/update-category-blog", MiddleWareController.verifytoken, AuthController.updateCategoryBlog)
//delete cate blog
router.post('/delete-category-blog', MiddleWareController.verifytoken, AuthController.deleteCategoryBlog);


//more api for app
router.get('/get-all-account-app', AuthController.getAllAcount)

router.post('/', AuthController.index);


module.exports = router;