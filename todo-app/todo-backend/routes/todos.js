const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const currentCount = await redis.getAsync('added_todos');
  const newCount = parseInt(currentCount || 0) + 1;
  await redis.setAsync('added_todos', newCount);


  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);
  next();
};

/* GET todo by ID. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo by ID. */
singleRouter.put('/', async (req, res) => {
  if (req.body.text) {
    req.todo.text = req.body.text;
  }
  if (req.body.done !== undefined) {
    req.todo.done = req.body.done;
  }

  const updatedTodo = await req.todo.save();
  res.send(updatedTodo);
});

/* DELETE todo by ID. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

// Usa el middleware findByIdMiddleware para todas las rutas en singleRouter
router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;