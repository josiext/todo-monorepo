const todosCache = [];

const findAll = () => {
  return todosCache.sort((a, b) => b.createdAt - a.createdAt);
};

const create = (data) => {
  const { label } = data;

  const newTodo = {
    id: String(+new Date()),
    label,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  todosCache.push(newTodo);

  return newTodo;
};

const update = (id, data) => {
  const { label } = data;

  const todo = todosCache.find((item) => item.id === id);
  todo.label = label;
  todo.updatedAt = new Date();

  return todo;
};

const remove = (id) => {
  const todoToRemoveIndex = todosCache.findIndex((item) => item.id === id);
  const todoRemoved = todosCache[todoToRemoveIndex];

  if (todoToRemoveIndex > -1) todosCache.splice(todoToRemoveIndex, 1);

  return todoRemoved;
};

export default {
  findAll,
  create,
  update,
  remove,
};
