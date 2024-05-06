const express = require("express");
const categoryRouter=express.Router();
const authentication=require('../middleware/authentication')
const authorization=require('../middleware/authorization')
const {
    createCategory
}=require('../controllers/categories');
categoryRouter.post('/',authentication,authorization("create_category"),createCategory)

module.exports=categoryRouter;