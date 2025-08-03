const express = require("express")
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controllers")
const validate = require("../../middlewares/admin/auth.middleware")
router.get("/"  ,validate.requireAuth, controller.dashboard)
module.exports = router ;