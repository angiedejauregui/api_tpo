const express = require('express');
const { loginController, forgotPasswordController, resetPasswordController, verifyCodeController } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController)
router.post('/verify-code', verifyCodeController);
router.post('/reset-password', resetPasswordController);

module.exports = router;