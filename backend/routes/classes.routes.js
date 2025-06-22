const express = require("express");
const router = express.Router();
const classController = require("../controllers/classes.controller");
const upload = require("../middlewares/uploadImage");

router.post("/", upload.array("images"), classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/by-instructor", classController.getClassesByInstructor);
router.get("/:id", classController.getClassById);
/* put no estaba definido en el contrato API pero si PATCH */
/*router.put("/:id", classController.updateClass);*/
router.delete("/:id", classController.deleteClass);

module.exports = router;
