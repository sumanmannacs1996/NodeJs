const express = require('express');

const router = express.Router();

const path = require('path');
const rootDirectry = require('../util/path');

const adminData = require('./admin');


router.get('/',(req,res,next)=>{
    console.log(adminData.products);
    res.sendFile(path.join(rootDirectry,'views','shop.html'));
});

module.exports =router;;
