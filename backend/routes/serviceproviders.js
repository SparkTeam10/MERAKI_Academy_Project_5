const express = require("express");

const serviceProvidersRouter = express.Router();

const { createServiceProvider,
    updateServiceProviderById,
    readAllServiceProvider,
    deleteServiceProvider }
    = require("../controllers/service_provider")


serviceProvidersRouter.post('/', createServiceProvider)

serviceProvidersRouter.put('/:id', updateServiceProviderById)

serviceProvidersRouter.get('/', readAllServiceProvider)

serviceProvidersRouter.delete('/:id', deleteServiceProvider) 


module.exports = serviceProvidersRouter;