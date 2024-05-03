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
const createNewPermission = (req, res) => {
  const { permission } = req.body;
  pool
    .query("INSERT INTO permissions (permission) VALUES ($1) RETURNING *", [
      permission,
    ])
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Permission created successfully",
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
const createNewRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  pool
    .query(
      "INSERT INTO role_permission (role_id,permission_id) VALUES ($1,$2) RETURNING *",
      [role_id, permission_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Role permission created successfully",
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
  createNewPermission,
  createNewRolePermission,
};
