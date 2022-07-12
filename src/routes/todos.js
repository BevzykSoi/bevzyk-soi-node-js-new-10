const express = require('express');

const {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
} = require('../controllers/todosController');
const schemaValidate = require('../middlewares/schemaValidate');
const todosValidators = require('../validators/todos');

const router = express.Router();

router.post('/', schemaValidate(todosValidators.createOrUpdate), createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', schemaValidate(todosValidators.createOrUpdate), updateTodo);
router.delete('/:id', deleteTodo);
router.patch(
  '/:id/status',
  schemaValidate(todosValidators.updateStatus),
  updateTodoStatus
);

module.exports = router;
