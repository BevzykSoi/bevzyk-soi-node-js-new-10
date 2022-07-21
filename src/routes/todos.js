const express = require('express');

const {
  createTodo,
  deleteTodo,
  getAllTodos,
  getAllFilteredTodosByPriority,
  getAllFilteredTodosByTags,
  getAllFilteredTodosByPage,
  getTodoById,
  updateTodo,
  updateTodoStatus,
  addTagsToSet,
  pullAllTags,
} = require('../controllers/todosController');
const schemaValidate = require('../middlewares/schemaValidate');
const todosValidators = require('../validators/todos');

const router = express.Router();

router.post('/', schemaValidate(todosValidators.createOrUpdate), createTodo);
router.get('/', getAllTodos);
router.get('/filteredbypriority', getAllFilteredTodosByPriority);
router.get('/filteredbytags', getAllFilteredTodosByTags);
router.get('/filteredbypage', getAllFilteredTodosByPage);
router.get('/:id', getTodoById);
router.put('/:id', schemaValidate(todosValidators.createOrUpdate), updateTodo);
router.delete('/:id', deleteTodo);
router.patch(
  '/:id/status',
  schemaValidate(todosValidators.updateStatus),
  updateTodoStatus
);
router.patch('/:id/tags/addtoset', addTagsToSet);
router.patch('/:id/tags/pullall', pullAllTags);

module.exports = router;
