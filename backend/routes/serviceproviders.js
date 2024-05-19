const express = require("express");

const serviceProvidersRouter = express.Router();

const {
  createServiceProvider,
  updateServiceProviderById,
  readAllServiceProvider,
  deleteServiceProvider,
  readById,
  getServiceProviderByCategory,
} = require("../controllers/service_provider");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

serviceProvidersRouter.post(
  "/",
  authentication,
  authorization("create_service_provider"),
  createServiceProvider
);

/* serviceProvidersRouter.post('/',createServiceProvider) */

serviceProvidersRouter.put(
  "/:id",
  authentication,
  authorization("create_service_provider"),
  updateServiceProviderById
);
/* serviceProvidersRouter.put('/:id',updateServiceProviderById) */

serviceProvidersRouter.get("/", readAllServiceProvider);

serviceProvidersRouter.delete(
  "/:id",
  authentication,
  authorization("create_service_provider"),
  deleteServiceProvider
);

/* serviceProvidersRouter.delete('/:id',deleteServiceProvider); */


serviceProvidersRouter.get(
  "/category/:category_id",
  getServiceProviderByCategory
);

module.exports = serviceProvidersRouter;
