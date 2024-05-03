const { pool } = require("../models/db");
const createNewRole = (req, res) => {
  const placeholder = req.body;
  pool
    .query(`INSERT INTO roles (role) VALUES($1)RETURNING *`, [placeholder.role])
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Role created successfully",
        role: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
      });
    });
};
module.exports = {
  createNewRole,
};
