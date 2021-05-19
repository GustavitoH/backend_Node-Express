const { Router } = require('express');
const router = Router();

const {
  authController,
} = require('../controller/auth.controller');


router.post('/auth', authController);

module.exports = router;
