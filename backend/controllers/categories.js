const { pool } = require("../models/db");
const createCategory = (req, res) => {
    const {title,description,img}=req.body
    pool.query(`
    INSERT INTO categories(title,description,img) VALUES($1,$2,$3) RETURNING *
    `,[title,description,img]) .then((result) => {
        res.status(201).json({
          success: true,
          message: "product added successfully",
          product: result.rows,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          success: false,
          message: "an error occurred",
          err,
        });
      });
};
module.exports = {
  createCategory,
};
