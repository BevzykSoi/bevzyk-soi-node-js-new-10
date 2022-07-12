const express = require('express');

const todosRouter = require('./todos');

const router = express.Router();

// http://localhost:6000/api/v1/todos
router.use('/todos', todosRouter);

module.exports = router;