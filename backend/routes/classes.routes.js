const express = require("express");
const router = express.Router();
const classController = require("../controllers/classes.controller");
const upload = require("../middlewares/uploadImage");

router.post("/", upload.array("images"), classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/by-instructor", classController.getClassesByInstructor);
router.get("/:id", classController.getClassById);
router.patch("/:id", upload.single("images"), classController.updateClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
