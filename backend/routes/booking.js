const express = require("express")
const bookingRouter = express.Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")



const { createBooking , updateBookingById, ReadAllByUserId } = require("../controllers/booking")



bookingRouter.post("/",authentication,authorization("create_booking"), createBooking)

bookingRouter.put("/:id",authentication , authorization("create_category"),updateBookingById)

bookingRouter.get("/:user_id" ,authentication , ReadAllByUserId )



module.exports = bookingRouter