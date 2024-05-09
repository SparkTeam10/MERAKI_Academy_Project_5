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
getUserByName
  });


  //   try {
  //     if (!email || !password) {
  //       return res.status(400).json({
  //         success: false,
  //         message: " Email and password are required ",
  //       });
  //     }

  //     const query = `SELECT * FROM users WHERE email = $1 `;
  //     const data = [email.toLowerCase()];

  //     const result = await pool.query(query, data);

  //     if (result.rows.length === 0) {
  //       return res.status(401).json({
  //         success: false,
  //         message: "Invalid email or password.",
  //       });
  //     }
  //     const user = result.rows[0];

  //     const isPasswordCorrect = await bcrypt.compare(password, user.password);

  //     if (!isPasswordCorrect) {
  //       return res.status(401).json({
  //         success: false,
  //         message: "Invalid email or password.",
  //       });
  //     }
  //     const payload = {
  //       userId: user.id,
  //       role: user.role_id,
  //     };
  //     console.log(payload);

  //     const Secret = process.env.SECRET;
  //     const options = { expiresIn: "1d" };

  //     const token = jwt.sign(payload, Secret, options);

  //     if (!token) {
  //       throw new Error("Token generation failed.");
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       message: " Login successful. ",
  //       token,
  //       userId: user.id,
  //     });
  //   } catch (error) {
  //     console.error("Error during login : ", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Internal server error.",
  //     });
  //   }
main
};
const getAllUsers = (req, res) => {
  pool
    .query(
      `
SELECT * FROM users WHERE is_deleted = 0
`
getUserByName
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
      error: err.message

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
 main
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
getUserByName
}

const getUserByName = (req,res)=>{
  const {userName} = req.params
  pool
  .query(` SELECT * FROM users WHERE userName = $1  `, [userName]
  
  )
  .then((result)=>{
    console.log(result);
    res.status(200).json({
      success : true , 
      massage : `Get the user by Name `,
      result : result.rows
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({
      success : false , 
      message : `Server error`,
      error : err.result
    })
  })

}





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
 main
module.exports = {
  register,
  registerServiceProvider,
  login,
  getAllUsers,
  deleteUser,
getUserByName
  getUserByName

  getUserById,
main
};
