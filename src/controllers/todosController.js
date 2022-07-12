const Todo = require('../db/todos');

// export const createTodo = async (req, res) => {};
exports.createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.getAllTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getTodoById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getTodoById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    const updatedTodo = await Todo.updateTodo(id, req.body);
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getTodoById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    await Todo.deleteTodo(id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getTodoById(id);
    if (!todo) {
      res.status(404);
      next(new Error(`Not found id ${id}`));
      return;
    }

    const updatedTodo = await Todo.updateTodoCompleted(id, req.body.completed);
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
