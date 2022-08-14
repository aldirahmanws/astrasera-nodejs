const express = require("express");
const router = express.Router()

const authRoute = require("./authRoute")
const campaignRoute = require("./campaignRoute")
const customerRoute = require("./customerRoute")
const integrationRoute = require("./integrationRoute")
const filterRoute = require("./filterRoute")

router.use("/auth", authRoute)
router.use("/campaign", campaignRoute)
router.use("/customer", customerRoute)
router.use("/integration", integrationRoute)
router.use("/filter", filterRoute)

module.exports = router