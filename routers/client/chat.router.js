const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/client/chat.controllers")

Router.get("/" , controller.index)

module.exports = Router;