let todosCache = [];
let counter = 0;

const findAll = () => {
  return todosCache;
};

const create = (data) => {
  counter++;
  const newTodo = { ...data, id: counter };
  todosCache.push(newTodo);
  return newTodo;
};

const update = (id, data) => {
  const todos = todosCache.map((item) =>
    item.id === id ? { ...item, ...data } : item
  );
  todosCache = todos;
  return todosCache;
};

const remove = (id) => {
  const todos = todosCache.filter((item) => item.id !== id);
  todosCache = todos;
  return todosCache;
};

export default {
  findAll,
  create,
  update,
  remove,
};
