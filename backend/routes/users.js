const express = require("express");
const userRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  register,
  registerServiceProvider,
  login,
  getAllUsers,
  deleteUser,
  getUserById,
  getProvider,
getUserByName
 } = require("../controllers/users");

userRouter.post("/register", register);
userRouter.post("/ServiceProvider", registerServiceProvider);
userRouter.post("/login", login);
userRouter.get(
  "/",
  authentication,
    getAllUsers
);
userRouter.delete(
  "/:id",
  authentication,
   deleteUser
);
userRouter.get('/provider',authentication,getProvider)
userRouter.get('/user/:id',authentication,getUserById)
userRouter.get("/:userName" ,authentication, getUserByName)
module.exports = userRouter;
//admin
// {
//
//       "email":"admin@yahoo.com",
//        "password":"111",
//

// }
