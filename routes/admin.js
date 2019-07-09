const express = require('express');
const { check, body } = require("express-validator/check");

const adminController = require('../controllers/admin');
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
    '/add-product',
    isAuth,
    [
        body("title")
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body("price")
            .isFloat(),
        body("description")
            .isLength({ min: 5, max: 2000 })
            .trim()
    ],

    adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product',
    isAuth,
    [
        body("title")
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body("price")
            .isFloat(),
        body("description")
            .isLength({ min: 5, max: 2000 })
            .trim()
    ],
    adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
