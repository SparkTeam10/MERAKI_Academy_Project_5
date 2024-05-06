const express = require("express");
const categoryRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  createCategory,
  getAllCategories,
  updateById,
  deleteCategory,
} = require("../controllers/categories");
categoryRouter.post(
  "/",
  authentication,
  authorization("create_category"),
  createCategory
);
categoryRouter.get("/", getAllCategories);
categoryRouter.put(
  "/:id",
  authentication,
  authorization("update_category"),
  updateById
);
categoryRouter.delete(
  "/:id",
  authentication,
  authorization("delete_category"),
  deleteCategory
);
module.exports = categoryRouter;
