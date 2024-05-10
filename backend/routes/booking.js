const express = require("express")
const bookingRouter = express.Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")



const { createBooking , updateBookingById, ReadAllByUserId ,
     updateByUserId , deleteById} = require("../controllers/booking")



bookingRouter.post("/",authentication, createBooking)

bookingRouter.put("/:id",authentication , authorization("create_category"),updateBookingById)

bookingRouter.put("/update/:user_id" ,authentication, updateByUserId)

//authorization("create_booking") ,

bookingRouter.get("/:user_id" ,authentication , ReadAllByUserId )

bookingRouter.delete("/:id" ,authentication , deleteById)



module.exports = bookingRouter