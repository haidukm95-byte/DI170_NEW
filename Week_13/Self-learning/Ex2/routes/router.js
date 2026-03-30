const exp = require("express");
const router = exp.Router();

let todos = [];
router.get("/todos", (req, res) => {
  res.json(todos);
});

router.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

router.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    todo: req.body.todo,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  const updTodo = {
    id: todos[index].id,
    todo: req.body.todo,
  };
  todos[index] = updTodo;
  res.status(200).json(updTodo);
});

router.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  res.status(200).send("Todo deleted!");
});

module.exports = router;
