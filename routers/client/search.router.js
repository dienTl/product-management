const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/client/search.controllers")

Router.get("/" , controller.index)
module.exports = Router;