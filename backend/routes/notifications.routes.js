const express = require("express");
const router = express.Router();
const { createNotification, getUserNotifications, markAsRead } = require("../controllers/notification.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, createNotification);
router.get("/", verifyToken, getUserNotifications);
router.patch("/:id/read", verifyToken, markAsRead);

module.exports = router;
