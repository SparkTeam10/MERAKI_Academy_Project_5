const express = require("express")
const bookingRouter = express.Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")



const { createBooking , updateBookingById, /*ReadAllByUserId*/ GetAllByUserId,
     updateByUserId , deleteById} = require("../controllers/booking")



bookingRouter.post("/",authentication, createBooking)

bookingRouter.put("/:id",authentication , authorization("update_booking"),updateBookingById)


// bookingRouter.get("/:serviceProviderId/:userId", authentication, ReadAllByUserId);


bookingRouter.get("/:user_id" ,authentication , GetAllByUserId )

bookingRouter.delete("/:id" ,authentication , deleteById)



module.exports = bookingRouter