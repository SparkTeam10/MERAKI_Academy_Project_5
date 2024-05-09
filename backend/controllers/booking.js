const {pool} = require("../models/db")


const createBooking = (req,res)=>{
    const { user_id , serviceProvider_id, start_date, end_date, price , created_at ,booking_status } =req.body

    
    const query = (`INSERT INTO booking (user_id , serviceProvider_id, start_date, end_date, price , created_at ,booking_status )
    VALUES ($1 , $2, $3 , $4 , $5 ,$6 , $7)`)

    const data = [user_id , serviceProvider_id, start_date, end_date, price , created_at ,booking_status]

    pool
    .query(query,data)
    .then((result)=> {
     res.status(201).json({
        success : true ,
        message : ` Booking created successfully `,
        Booking : result.rows
     })
    })

    .catch((error)=>{
        res.status().json({
            success : false , 
            message : ` Please try agian something went wrong `,
            error : message.error
        })
    })

}

 const updateById = (req,res) => {
        
        const {  } = req.body
    



 }





module.exports = {
    createBooking
}