const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;

    pool
      .query(
        `SELECT permission FROM role_permission  INNER JOIN permissions ON role_permission.permission_id =permissions.id WHERE role_permission.role_id = $1 AND permissions.permission = $2;`,
        [role_id, string]
      )
      .then((result) => {
        console.log(result);
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "unauthorized" });
      });
  };
};

module.exports = authorization;
