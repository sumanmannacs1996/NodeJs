const express = require('express');

const router = express.Router();

const path = require('path');
const rootDirectry = require('../util/path');

let products =[];

router.use('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDirectry,'views','add-product.html'));
});

router.post('/product',(req,res,next)=>{
    products.push({Title:req.body.title});
    res.redirect("/");
});

exports.routes = router;
exports.products = products;