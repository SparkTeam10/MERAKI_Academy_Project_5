const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  const { userName, age, phoneNumber, email, password, country, image } =
    req.body;
  // edit the value of role_id depend on role id in role table .
  const role_id = "2";

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `  
  INSERT INTO users (userName, age, phoneNumber, email, password, country,image, role_id ) 
 VALUES ($1, $2, $3, $4, $5, $6, $7,$8); 
 ` ;

  const data = [
    userName,
    age,
    phoneNumber,
    email.toLowerCase(),
    encryptedPassword,
    country,
    image,
    role_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      console.log(err.code);
      if (err.code) {
        res.status(409).json({
          success: false,
          message: "The eamil already existe",
          err,
        });
      }
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

const registerServiceProvider = async (req, res) => {
  const { userName, age, phoneNumber, email, password, country, image } =
    req.body;
  // edit the value of role_id depend on role id in role table .
  const role_id = "3";

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `  INSERT INTO users (userName, age, phoneNumber, email, password, country,image, role_id ) 
VALUES ($1, $2, $3, $4, $5, $6, $7,$8);`;

  const data = [
    userName,
    age,
    phoneNumber,
    email.toLowerCase(),
    encryptedPassword,
    country,
    image,
    role_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.code) {
        res.status(409).json({
          success: false,
          message: "The eamil already existe",
          err,
        });
      }
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

const getAllUsers = (req, res) => {
  pool
    .query(
      `
SELECT * FROM users WHERE is_deleted = 0 AND role_id=2
`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the users`,
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

const deleteUser = (req, res) => {
  const { id } = req.params;
  pool
    .query(`UPDATE users SET is_deleted = 1 WHERE id = $1 RETURNING *`, [id])
    .then((result) => {
      if (result.rows.length) {
        return res.status(201).json({
          success: true,
          massage: "user has been deleted",
          result: result.rows,
        });
      }
      throw err;
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

const getUserByName = (req, res) => {
  const { userName } = req.params;
  pool
    .query(` SELECT * FROM users WHERE userName = $1  `, [userName])
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        massage: `Get the user by Name `,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server error`,
        error: err.result,
      });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  pool
    .query(
      `
SELECT * FROM users WHERE is_deleted = 0 AND id=$1
`,
      [id]
    )
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: `user with id= ${id}`,
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `There is no user with id =${id}`,
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

const getProvider=(req,res)=>{
  pool
  .query(
    `
SELECT * FROM users WHERE is_deleted = 0 AND role_id=3
`
  )
  .then((result) => {
    res.status(200).json({
      success: true,
      message: `All the service providers`,
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
}
const getUsers = (req, res) => {
  pool
    .query(
      `
SELECT * FROM users WHERE is_deleted = 0 
`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the users`,
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
module.exports = {
  register,
  registerServiceProvider,
  login,
  getAllUsers,
  deleteUser,
  getUserByName,
  getUserById,
  getProvider,
  getUsers
};
