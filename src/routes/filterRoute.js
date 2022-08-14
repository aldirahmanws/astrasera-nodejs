const express = require("express");
const router = express.Router()

const filterController = require("../controllers/filterController")

router.get("/", filterController.filter)

module.exports = router