const express = require("express")
const router = express.Router();


const multer = require("multer")// dùng để upload file

const upload = multer(); 

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlerWare")

const controller = require("../../controllers/admin/setting.controllers")

router.get("/general" , controller.general)

router.patch("/general", upload.single("logo") ,uploadCloud.upload , controller.generalPatch)

module.exports = router ;