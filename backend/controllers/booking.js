const {pool} = require("../models/db")


const createBooking = (req,res)=>{
    const { user_id , serviceProvider_id,  price  } =req.body

    
    const query = (`INSERT INTO booking (user_id , serviceProvider_id,  price )
    VALUES ($1 , $2, $3 ) RETURNING * `)

    const data = [user_id , serviceProvider_id, price  ]

    pool
    .query(query,data)
    .then((result)=> {
     res.status(201).json({
        success : true ,
        message : ` Booking created successfully `,
        Booking : result.rows
     })
    })
    .catch((err)=>{
        res.status(500).json({
            success : false , 
            message : ` Please try agian something went wrong `,
            error : err.message
        })
    })

}



module.exports = {
    createBooking , 
    updateBookingById
}