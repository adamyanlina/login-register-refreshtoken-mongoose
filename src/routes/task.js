const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const { getAll, getById, remove, create, update } = require('../controllers/task');

// localhost:5000/api/tasks/...
router.get('/', authMiddleware, getAll)
      .get('/:id', authMiddleware, getById)
      .post('/create', authMiddleware, create)
      .patch('/update/:id', authMiddleware, update)
      .delete('/delete/:id', authMiddleware, remove);

module.exports = router;
