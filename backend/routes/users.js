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
  authorization("delete_category"),
  deleteUser
);
userRouter.get('/provider',authentication,authorization("delete_category"),getProvider)
userRouter.get("/:userName" ,authentication, getUserByName)
userRouter.get('/user/:id',authentication,getUserById)

module.exports = userRouter;
//admin
// {
//
//       "email":"admin@yahoo.com",
//        "password":"111",
//

// }
