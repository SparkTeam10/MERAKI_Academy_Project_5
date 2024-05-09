const { pool } = require("../models/db");
const createRate = (req, res) => {
  const { userName, user_id, serviceProvider_id, rating, comment } = req.body;
  pool
    .query(
      `
INSERT INTO rating (userName,user_id,serviceProvider_id,rating,comment) VALUES($1,$2,$3,$4,$5) RETURNING *
`,
      [userName, user_id, serviceProvider_id, rating, comment]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "rating added successfully",
        product: result.rows,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "an error occurred",
        err,
      });
    });
};
const updateByUserId = (req, res) => {
  const { user_id } = req.params;
  const { userName, rating, comment } = req.body;
  const values = [userName || null, rating || null, comment || null, user_id];
  const query = `UPDATE rating SET userName=COALESCE($1,userName),rating=COALESCE($2,rating),comment=COALESCE($3,comment) WHERE user_id=$4 AND is_deleted = 0 RETURNING *;`;

  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length) {
        return res.status(201).json({
          success: true,
          massage: "rating Updated Successfully",
          result: result.rows,
        });
      } else {
        res.status(201).json({
          success: true,
          massage: "there is no user or rate",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error: err.message,
      });
    });
};
const deleteRateByUser = (req, res) => {
  const { user_id } = req.params;
  pool
    .query(`UPDATE rating SET is_deleted = 1 WHERE user_id = $1 RETURNING *`, [
      user_id,
    ])
    .then((result) => {
      if (result.rows.length) {
        return res.status(201).json({
          success: true,
          massage: "This rate has been deleted",
          result: result.rows,
        });
      } else {
        return res.status(201).json({
          success: true,
          massage: "There is no rate with this id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server error`,
        error: err.message,
      });
    });
};
const getRates = (req, res) => {
  pool
    .query(
      `
SELECT * FROM rating WHERE is_deleted = 0
`
    )
    .then((result) => {
     if (result.rows.length){
        res.status(200).json({
            success: true,
            message: `All the rates`,
            result: result.rows,
          });
     }
     else{
        res.status(200).json({
            success: true,
            message: `No rates yet`,
            
          });
     }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error: err.message,
      });
    });
};
module.exports = {
  createRate,
  updateByUserId,
  deleteRateByUser,
  getRates,
};
