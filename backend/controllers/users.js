
const express = require("express")

const app = express()
const { pool } = require("../models/db");

const jwt  = require("jsonwebtoken");

const bcryptjs = require ("bcryptjs");

// This function creates (New user)

const registerUser = (req,res) => {
    const {firstName, lastName, age, phone, email, password, role_id } = req.body;

      //convert email to lowercase
      const lowerEmail = email.toLowerCase();

      //convert password to Hash
      bcryptjs.hash(password,10)
      .then((hasPassword)=>{
        return pool.query(`INSERT INTO users (firstName,lastName,age,phone,email,password,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,[firstName,lastName,age,phone,lowerEmail,hasPassword,role_id]);
      })
      .then((result) =>{
       console.log(result.rows);
       res.status(200).json({
        success : true,
        message : "Account created successfully"
       });
      })
      .catch((error)=>{
        res.status(409).json({
            success: false,
            message: error.message,
            err: error
          });
      });
};


// This function creates (New Service Provider)

const registerServiceProvider = (req,res) => {
    const {firstName, lastName, age, phone, email, password, role_id, provider_id } = req.body;

      //convert email to lowercase
      const lowerEmail = email.toLowerCase();

      //convert password to Hash
      bcryptjs.hash(password,10)
      .then((hasPassword)=>{
        return pool.query(`INSERT INTO users (firstName,lastName,age,phone,email,password,role_id,provider_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[firstName,lastName,age,phone,lowerEmail,hasPassword,role_id,provider_id]);
      })
      .then((result) =>{
       console.log(result.rows);
       res.status(200).json({
        success : true,
        message : "The account has been created for the service provider"
       });
      })
      .catch((error)=>{
        res.status(409).json({
            success: false,
            message: error.message,
            err: error
          });
      });
};

// This function creates (Login)

const login = (req, res) => {
    const {email, password} =req.body
    pool.query(`SELECT * FROM users WHERE email =$1`, [email])
    .then(async (result)=>{
     if(result.rows.length === 0){
       res.status(404)
       res.json('Email no registwered');
     } else{
       const user = result.rows[0];
       const isValid = await bcryptjs.compare(password,user.password);
       if(!isValid){
         res.status(401)
         res.json('Password not match');
       } else {
         const payload = {
           id : user.id,
           role : user.role
         };
         const options = {
           expiresIn : "60m"
         };
         const userToken = jwt.sign(payload, process.env.SECRET, options);
         res.json({message : "welcome to the website and You are logged in",token : userToken});
         res.status(200)
       }
     }
    })
    .catch((error)=>{
     res.status(403)
     res.json({success: false,
        message: error.message,
        err: error})
    })
   };

module.exports = {registerUser,registerServiceProvider,login};

