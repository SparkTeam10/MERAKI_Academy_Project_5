const express = require("express")
const bookingRouter = express.Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")



const {createBooking} = require("../controllers/booking")



bookingRouter.post("/", createBooking)




module.exports = bookingRouter