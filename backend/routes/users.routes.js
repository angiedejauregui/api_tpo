const express = require('express');
const { createUser, getUserById, updateUser, getUserProfile } = require('../controllers/users.controller');
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post('/', createUser);
router.get("/me", verifyToken, getUserProfile);
router.get('/:id', getUserById);
router.patch("/:id", updateUser);

module.exports = router;