const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);


const register = async (req, res) => {

  const { userName , age, phoneNumber , email, password ,country } =
    req.body;
// edit the value of role_id depend on role id in role table .
  const role_id = "2"

  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  
  const query = 
`  INSERT INTO users (userName, age, phoneNumber, email, password, country, role_id ) 
VALUES ($1, $2, $3, $4, $5, $6, $7);`

  const data = [
    userName,
    age,
    phoneNumber,
    email.toLowerCase(),
    encryptedPassword,
    country,
    role_id,
    
    
  ];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      })
    
    })
    .catch((err) => {
      console.log(err.code);
      if(err.code){
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
//-------------------------------------------------



const registerServiceProvider = (req, res) => {
  const { userName, age, phoneNumber, email, password, country,  } = req.body;

  // Ensure role_id is defined
  const role_id = 3; // Example fixed role_id, or derive from another source

  const lowerEmail = email.toLowerCase();

  bcrypt.hash(password, 10)
    .then((hashPassword) => {
      return pool.query(`INSERT INTO users (userName, age, phoneNumber, email, password, country, provider_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userName, age, phoneNumber, lowerEmail, hashPassword, country, role_id]);
    })
    .then((result) => {
      console.log(result.rows);
      res.status(201).json({
        success: true,
        message: "The account has been created for the service provider",
      });
    })
    .catch((err) => {
      console.log(err.code);
      if(err.code){
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



// ----------------------------------------------

const login = async (req, res) => {
  const { email, password, } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: " Email and password are required ",
      });
    }

    const query = `SELECT * FROM users WHERE email = $1 `; 
    const data = [email.toLowerCase()];

    const result = await pool.query(query, data);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    const payload = {
      userId: user.id,
      role: user.role_id,
      
    };
    console.log(payload);
    

    const Secret = process.env.SECRET;
    const options = { expiresIn: "1d" };
    

    const token = jwt.sign(payload, Secret ,options);

    if (!token) {
      throw new Error("Token generation failed.");
    }

    return res.status(200).json({
      success: true,
      message: " Login successful. ",
      token,
      userId: user.id
    });
  } catch (error) {
    console.error("Error during login : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  register,
  registerServiceProvider,
  login,
};

