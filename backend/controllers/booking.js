const { pool } = require("../models/db");

const createBooking = (req, res) => {
  const { user_id, serviceProvider_id, start_date, end_date, price } = req.body;

  const query = `INSERT INTO booking (user_id , serviceProvider_id, start_date , end_date , price )
    VALUES ($1 , $2, $3, $4 , $5 ) RETURNING * `;

  const data = [user_id, serviceProvider_id, start_date, end_date, price];

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
  const { user_id, serviceProvider_id, start_date, end_date, price } = req.body;

  const query = ` UPDATE booking SET user_id =COALESCE($1,user_id), serviceProvider_id = COALESCE($2,serviceProvider_id),
    start_date= COALESCE($3,start_date) , end_date= COALESCE($4, end_date),
    price = COALESCE($5,price) WHERE id = $6 RETURNING * `;

  const data = [
    user_id || null,
    serviceProvider_id || null,
    start_date || null,
    end_date || null,
    price || null,
    id,
  ];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        res.status(201).json({
          success: true,
          message: `Booking Updated Successfully `,
          result: result.rows,
        });
      }
      throw Error;
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
        res.status(201).json({
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



module.exports = {
  createBooking,
  updateBookingById,
  ReadAllByUserId,
};
