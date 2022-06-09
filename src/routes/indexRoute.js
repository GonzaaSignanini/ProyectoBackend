const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", (req, res) => {
    res.render('index');
});

router.get("/home", (req, res) => {
    res.render('home');
});

router.get("/home2", (req, res) => {
    res.render('home2');
});

router.get("/register", (req, res) => {
    res.render('register');
});

router.get("/cart", (req, res) => {
    res.render('cart');
});

router.get('/products', (req,res)=>{
    Product.find().lean()
        .then(result => {
            let products = result;
            res.render('products', {products});
        });
});




module.exports = router;