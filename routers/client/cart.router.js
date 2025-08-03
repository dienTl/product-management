const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/client/cart.controllers")

Router.get("/" , controller.index)

Router.get("/delete/:productId" , controller.delete)

Router.get("/update/:productId/:quantity" , controller.update)

Router.post("/add/:productId" , controller.add)
module.exports = Router;