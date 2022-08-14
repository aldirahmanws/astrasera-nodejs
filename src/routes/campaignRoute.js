const express = require("express");
const router = express.Router()

const campaignController = require("../controllers/campaignController")

router.get("/list", campaignController.list)
router.post("/create", campaignController.create)
router.get("/read/:id", campaignController.read)
router.put("/update/:id", campaignController.update)
router.delete("/delete/:id", campaignController.delete)

module.exports = router