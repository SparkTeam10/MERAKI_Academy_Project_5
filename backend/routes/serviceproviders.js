const express = require("express");

const serviceProvidersRouter = express.Router();

const {
  createServiceProvider,
  updateServiceProviderById,
  readAllServiceProvider,
  deleteServiceProvider,
  readById,
  getServiceProviderByCategory
} = require("../controllers/service_provider");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

serviceProvidersRouter.post(
  "/",
  authentication,
  authorization("create_service_provider"),
  createServiceProvider
);

serviceProvidersRouter.put(
  "/:id",
  authentication,
  authorization("create_service_provider"),
  updateServiceProviderById
);

serviceProvidersRouter.get("/", readAllServiceProvider);

serviceProvidersRouter.delete(
  "/:id",
  authentication,
  authorization("create_service_provider"),
  deleteServiceProvider
);
serviceProvidersRouter.get("/:id", readById);


serviceProvidersRouter.get("/",getServiceProviderByCategory)

module.exports = serviceProvidersRouter;
