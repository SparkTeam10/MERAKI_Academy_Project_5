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
  getUserByName
} = require("../controllers/users");

userRouter.post("/register", register);
userRouter.post("/ServiceProvider", registerServiceProvider);
userRouter.post("/login", login);
userRouter.get(
  "/",
  authentication,
  authorization("create_category"),
  getAllUsers
);
userRouter.delete(
  "/:id",
  authentication,
  authorization("delete_category"),
  deleteUser
);
userRouter.get("/:userName" , getUserByName)

module.exports = userRouter;
//admin
// {
//
//       "email":"admin@yahoo.com",
//        "password":"111",
//

// }
