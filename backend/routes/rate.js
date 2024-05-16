const express=require('express')
const rateRouter=express.Router()
const {createRate, updateByUserId,deleteRateByUser, getRates,myRates,rateJoin}=require('../controllers/rate')
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
rateRouter.post('/',authentication,authorization("create_rate"),createRate)
rateRouter.put('/:user_id',authentication, updateByUserId)
rateRouter.delete('/:user_id',authentication,authorization("create_rate"),deleteRateByUser)
rateRouter.get('/', getRates)
rateRouter.get('/:userId',authentication,myRates)
rateRouter.get("/join/rating",rateJoin)
module.exports=rateRouter