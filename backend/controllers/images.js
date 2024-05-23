const { pool } = require("../models/db");

const createImages = (req, res) => {
    const { img, price, category_id, serviceProvider_id } = req.body
    pool
        .query('INSERT INTO images (img,price,category_id,serviceProvider_id) VALUES ($1, $2, $3, $4) RETURNING * ', [img, price, category_id, serviceProvider_id])
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Added to iamges successfully",
                product: result.rows,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                success: false,
                message: "Something went wrong",
                error,
            });
        })
};



const updateImagesById = (req,res)=>{
    const { id } = req.params;
    const {  img, price, category_id, serviceProvider_id } = req.body;
    

    const data = [
        img || null,
        price || null,
        category_id || null,
        serviceProvider_id || null,
        id,
      ];
      const query = `UPDATE images SET img=COALESCE($1,img),price=COALESCE($2,price),category_id=COALESCE($3,category_id),serviceProvider_id=COALESCE($4,serviceProvider_id) WHERE id=$5 RETURNING *;`;
pool.query(query,data)
.then((result) => {
    if (result.rows.length) {
      return res.status(201).json({
        success: true,
        massage: "Images is Updated Successfully",
        result: result.rows,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No Images found",
      });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Server error`,
      error: error.message,
    });
  });
};


const deleteImagesById = (req,res)=>{
    const { id } = req.params;
    pool
      .query(
        `UPDATE images SET is_deleted = 1 WHERE id = $1 RETURNING *`,
        [id]
      )
      .then((result) => {
        if (result.rows.length) {
          return res.status(201).json({
            success: true,
            massage: "Images is Deleted Successfully",
            result: result.rows,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "No Images found ",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          success: false,
          message: `Server error`,
          error: error.message,
        });
      });
};


const getAllImages = (req,res)=> {
    pool
    .query(`SELECT * FROM images WHERE is_deleted = 0`)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `All Images`,
          result: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Images found`,
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


const getImageByid = (req,res) => {
    const { id } = req.params;
  pool
    .query(`SELECT * FROM images WHERE is_deleted = 0 AND id=$1`,
      [id]
    )
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: `Images with id= ${id}`,
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `There is no Images with id =${id}`,
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
    createImages,
    updateImagesById,
    deleteImagesById,
    getAllImages,
    getImageByid
};