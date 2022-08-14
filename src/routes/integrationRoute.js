const express = require("express");
const router = express.Router()

const integrationController = require("../controllers/integrationController")

router.post("/register", integrationController.register)
router.post("/login", integrationController.login)

module.exports = router