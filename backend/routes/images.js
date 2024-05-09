

const express = require("express");
const imagesRouter = express.Router();
const { createImages,updateImagesById,deleteImagesById,getAllImages,getImageByid } = require("../controllers/images");

const authentication =require('../middleware/authentication')


imagesRouter.post('/',authentication,createImages)

imagesRouter.put('/:id',authentication,updateImagesById)

imagesRouter.delete('/:id',authentication,deleteImagesById)

imagesRouter.get('/',getAllImages)

imagesRouter.get('/:id',authentication,getImageByid)

module.exports = imagesRouter;