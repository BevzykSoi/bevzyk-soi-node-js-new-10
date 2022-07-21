const Todo = require("../models/Todo.js");

exports.createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find(null, "-__v -_id");
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

exports.getAllFilteredTodosByPriority = async (req, res, next) => {
  try {
    const todos = await Todo.find({
      priority: 10,
    }, "-__v -_id");
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

exports.getAllFilteredTodosByTags = async (req, res, next) => {
  try {
    const { tags } = req.query;

    const tagsArray = tags.split(", ");

    const todos = await Todo.find({
      tags: {
        $in: tagsArray,
      },
    }, "-__v -_id");
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

exports.getAllFilteredTodosByPage = async (req, res, next) => {
  try {
    let { page, searchQuery } = req.query;

    if (!page) {
      page = 1;
    } else {
      page = +page;
    }

    const perPage = 3;

    const todos = await Todo.find({
      text: {
        $regex: searchQuery,
        $options: "i",
      }
    }, "-__v -_id", {
      limit: perPage,
      skip: (page - 1) * perPage,
    });
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
    const todo = await Todo.findById(id, "-__v");
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
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({
        message: `Not found id ${id}`,
      });
      return;
    }

    const response = await Todo.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      next(new Error(`Not found id ${id}`));
      return;
    }
    todo.completed = req.body.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
};


exports.addTagsToSet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      $addToSet: {
        tags: {
          $each: tags,
        }
      }
    }, {
      new: true,
    });

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
}

exports.pullAllTags = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      $pullAll: {
        tags,
      }
    }, {
      new: true,
    });

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
}