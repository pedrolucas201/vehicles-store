const express = require('express');
const { profile } = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/me', auth, profile);

module.exports = router;