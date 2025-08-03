const express = require('express')
const Router = express.Router();
const controller = require("../../controllers/client/products.contoller")
Router.get("/", controller.index )

Router.get("/:slugCategory", controller.category )

Router.get("/detail/:slugProduct", controller.detail )
module.exports = Router;