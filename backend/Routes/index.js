const express = require('express');

const router = express.Router();

const { verifySignUp } = require("../middlewares");

const userController = require('../Controllers/user');
const productController = require('../Controllers/product');

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/getProducts', productController.getProducts);

router.post('/getTodaysSale', productController.getTodaysSale);
router.post('/getTotalSale', productController.getTotalSale);
router.post('/getWeeklySale', productController.getWeeklySale);

router.post('/admin/addCategory', productController.addCategory);
router.post('/admin/manageCategory', productController.manageCategory);
router.post('/addProduct', productController.addProduct);
router.post('/admin/manageUser', productController.manageUser);

router.post('/requestProduct', productController.requestProduct);

router.post('/admin/getStock', productController.getAdminStock);

router.post('/getProductByCategory/', productController.getProductByCategory);

router.get('/getProductByName/:name', productController.getProductByName);
router.post('/getCategories',productController.getCategories);



router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], userController.signUp);
router.post('/login', userController.login);

router.post('/admin/login', userController.adminLogin);

module.exports = router;
