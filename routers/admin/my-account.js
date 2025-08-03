const express = require("express")
const route = express.Router()
const multer = require("multer")// dùng để upload file

const upload = multer()
const controller = require("../../controllers/admin/myaccount.controllers")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlerWare")

const validate = require("../../validates/admin/product-category-validate")
route.get("/" ,controller.index)

route.get("/edit" ,controller.edit)

route.patch("/edit" ,
  upload.single('avatar'),
  uploadCloud.upload,
  controller.editPatch)
module.exports = route ;