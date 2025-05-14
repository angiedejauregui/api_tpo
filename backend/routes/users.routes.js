const express = require('express');
const { createUser, getUserById } = require('../controllers/users.controller');

const router = express.Router();

router.post('/api/v1/users', createUser);
router.get('users/:id', getUserById);

module.exports = router;