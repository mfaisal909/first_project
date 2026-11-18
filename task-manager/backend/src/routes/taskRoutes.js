const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} = require('../controllers/taskController');
const { validateTask } = require('../middleware/validationMiddleware');

router.route('/').get(getTasks).post(validateTask, createTask);
router.route('/:id').put(validateTask, updateTask).delete(deleteTask);
router.patch('/:id', toggleTask);

module.exports = router;
