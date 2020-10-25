const router = require('express').Router();
const { login, register } = require('../controllers/auth');

// localhost:5000/api/auth/...
router.post('/login', login)
      .post('/register', register);

module.exports = router;
