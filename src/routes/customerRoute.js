const express = require("express");
const router = express.Router()

const customerController = require("../controllers/customerController")

router.get("/list", customerController.list)
router.post("/create", customerController.create)
router.get("/read/:email", customerController.read)
router.put("/update/:email", customerController.update)
router.delete("/delete/:email", customerController.delete)

module.exports = router