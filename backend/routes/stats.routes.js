const express = require("express");
const { getTrainerStatsHandler, incrementViews } = require("../controllers/stats.controller");
const router = express.Router();

router.get("/:trainerId", getTrainerStatsHandler);
router.patch("/views/:trainerId", incrementViews);

module.exports = router;