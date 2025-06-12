const express = require('express');
const { createUser, getUserById, updateUser } = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.patch("/:id", updateUser);

module.exports = router;