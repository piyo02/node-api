const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verification = require('./verification');

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// page with authorization
router.get('/api/v1/index', verification(2), auth.page);

module.exports = router;