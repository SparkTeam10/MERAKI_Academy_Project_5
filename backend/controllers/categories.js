const { pool } = require("../models/db");

const createCategory = (req, res) => {
  const { title, description, img } = req.body;
  pool
    .query(
      `
    INSERT INTO categories(title,description,img) VALUES($1,$2,$3) RETURNING *
    `,
      [title, description, img]
    )
    .then((result) => {
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

const getAllCategories = (req, res) => {
  pool
    .query(
      `
SELECT * FROM categories WHERE is_deleted = 0
`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the categories`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error: err.message,
      });
    });
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { title, description, img } = req.body;
  const values = [title || null, description || null, img || null, id];
  const query = `UPDATE categories SET title=COALESCE($1,title),description=COALESCE($2,description),
  img=COALESCE($3,img) WHERE id=$4 RETURNING *;`;

  
  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length) {
        return res.status(201).json({
          success: true,
          massage: "category Updated Successfully",
          result: result.rows,
        });
      }
      throw err;
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error: err.message,
      });
    });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  pool
    .query(`UPDATE categories SET is_deleted = 1 WHERE id = $1 RETURNING *`, [
      id,
    ])
    .then((result) => {
      if (result.rows.length) {
        return res.status(201).json({
          success: true,
          massage: "This category has been deleted",
          result: result.rows,
        });
      }
      //   throw err;
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
module.exports = {
  createCategory,
  getAllCategories,
  updateById,
  deleteCategory,
};
