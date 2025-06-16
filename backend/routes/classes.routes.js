const express = require("express");
const router = express.Router();
const classController = require("../controllers/classes.controller");

// POST /api/v1/services
router.post("/", classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/by-instructor", classController.getClassesByInstructor);
router.get("/:id", classController.getClassById);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
