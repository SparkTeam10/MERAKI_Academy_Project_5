const { pool } = require("../models/db");

const createBooking = (req, res) => {
  const { user_id, serviceProvider_id, start_date, end_date, price } = req.body;

  const query = `INSERT INTO booking (user_id , serviceProvider_id, start_date , end_date , price )
    VALUES ($1 , $2, $3, $4 , $5 ) RETURNING * `;

  const data = [user_id, serviceProvider_id, start_date, end_date, price ];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: ` Booking created successfully `,
        Booking: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: ` Please try agian something went wrong `,
        error: err.message,
      });
    });
};

const updateBookingById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { user_id, serviceProvider_id, start_date, end_date, price , booking_status } = req.body;

  const query = ` UPDATE booking SET user_id =COALESCE($1,user_id), serviceProvider_id = COALESCE($2,serviceProvider_id),
    start_date= COALESCE($3,start_date) , end_date= COALESCE($4, end_date),
    price = COALESCE($5,price), booking_status =COALESCE($6,booking_status) WHERE id = $7 RETURNING * `;

  const data = [
    user_id || null,
    serviceProvider_id || null,
    start_date || null,
    end_date || null,
    price || null,
    booking_status || null ,
    id,
  ];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        res.status(201).json({
          success: true,
          message: `Booking updated by id successfully `,
          result: result.rows,
        });
      }
      else{
        res.status(409).json({
          success : false,
          message : `Booking not found`
        })
      } 
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: ` Server Error`,
        error: err.message,
      });
    });
};

const ReadAllByUserId = (req, res) => {
  const { user_id } = req.params;

  const query = `SELECT * FROM booking WHERE is_deleted=0 AND id=$1 `;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        res.status(201).json({
          success: true,
          message: `Read all the booking by id successfully `,
          result: result.rows,
        });
      }else{
        res.status(400).json({
            success: false,
            message: `There is no booking for this user yet`,
            
          });
      }
      
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error : err.message
       
      });
    });
};


const updateByUserId = (req, res)=>{
    const {user_id} = req.params
    const { serviceProvider_id, start_date, end_date, price, booking_status } = req.body;
    

    const query = (` UPDATE booking
        SET serviceProvider_id = COALESCE($1, serviceProvider_id),
        start_date = COALESCE($2, start_date),
        end_date = COALESCE($3, end_date),
        price = COALESCE($4, price),
        booking_status =COALESCE($5,booking_status)
        WHERE user_id = $6 AND is_deleted = 0 RETURNING * `)

    const data = [
        serviceProvider_id || null,
        start_date || null,
        end_date || null,
        price || null,
        booking_status || null ,
        user_id ]

    pool
    .query(query,data)
    .then((result)=>{
        if(result.rows.length){
            res.status(201).json({
                success : true , 
                message : `Booking updated by user_id successfully`,
                result : result.rows
            })
        }else{
            res.status(409).json({
                success : false , 
                message : `There is no booking for this user_id yet`,
                result : result.rows
            })

        }
    })
    .catch((err)=>{
        console.log("THIS ERROR>>>>>>>>>>>>>>>>>",err);
      res.status(500).json({
        success: false,
        message: ` Server Error`,
        error: err.message,
      });

    })

}

const deleteById = (req,res)=>{
    const {id} = req.params
    
    const query = (` UPDATE booking SET is_deleted = 1 WHERE id = $1 RETURNING * `)
    const data = [ id ]

    pool
    .query(query,data)
    .then((result)=>{
        if(result.rows.length){
            res.status(201).json({
                success : true , 
                message : `this booking has been delete by id successfully`,
                result : result.rows
            })
        }else{
            res.status(409).json({
                success : false , 
                message : ` There is no booking `,
                result : result.rows
            })

        }
        })
        .catch((err)=>{
            console.log(" The Error >> ",err);
          res.status(500).json({
            success: false,
            message: ` Server Error`,
            error: err.message,
          });
    
        })
    

}

module.exports = {
 createBooking,
  updateBookingById,
  ReadAllByUserId,
  updateByUserId,
  deleteById
};

