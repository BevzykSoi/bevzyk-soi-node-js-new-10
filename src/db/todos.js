const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');

const todosPath = path.join(__dirname, 'todos.json');

async function writeTodos(todos) {
  await fs.writeFile(todosPath, JSON.stringify(todos));
}

async function getAllTodos() {
  const todos = JSON.parse(await fs.readFile(todosPath));
  return todos;
}

async function createTodo({ text, priority }) {
  const newTodo = {
    id: nanoid(),
    text,
    priority,
    completed: false,
  };

  const todos = await getAllTodos();
  todos.push(newTodo);
  await writeTodos(todos);

  return newTodo;
}

async function getTodoById(todoId) {
  const todos = await getAllTodos();
  const targetTodo = todos.find(({ id }) => id === todoId);

  return targetTodo;
}

async function updateTodo(todoId, { text, priority }) {
  const todos = await getAllTodos();

  const targetTodo = todos.find(({ id }) => id === todoId);
  targetTodo.text = text;
  targetTodo.priority = priority;

  const updatedTodos = todos.map((todo) =>
    todo.id === todoId ? targetTodo : todo
  );

  await writeTodos(updatedTodos);
  return targetTodo;
}

async function deleteTodo(todoId) {
  const todos = await getAllTodos();
  const updatedTodos = todos.filter(({ id }) => id !== todoId);
  await writeTodos(updatedTodos);
  return updatedTodos;
}

async function updateTodoCompleted(todoId, completed) {
  const todos = await getAllTodos();

  const targetTodo = todos.find(({ id }) => id === todoId);
  targetTodo.completed = completed;

  const updatedTodos = todos.map((todo) =>
    todo.id === todoId ? targetTodo : todo
  );

  await writeTodos(updatedTodos);
  return targetTodo;
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  updateTodoCompleted,
};
