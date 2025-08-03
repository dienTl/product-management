const express = require("express")
const router = express.Router();
// const storageMulter = require("../../helpers/storageMulter")

const multer = require("multer")// dùng để upload file

const upload = multer()

const controller = require("../../controllers/admin/product.comtroller")
const validate = require("../../validates/admin/product.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlerWare")

router.get("/" , controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteitem)

router.get("/create" , controller.create)

router.post("/create" , 
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.createPOST
)

router.get("/edit/:id", controller.edit)
router.patch("/edit/:id",
  upload.single('thumbnail'), 
  validate.createPost,
   controller.editPatch)


router.get("/detail/:id",controller.detail)
module.exports = router ;