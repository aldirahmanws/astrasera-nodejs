const express = require("express");
const router = express.Router()

const authController = require("../controllers/authController")

const authentication = require("../middlewares/authentication")

router.post("/login", authController.login)
router.get("/checkLogin", authentication, authController.checkLogin)
router.get("/logout",authController.logout)

module.exports = router