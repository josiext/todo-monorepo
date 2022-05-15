let todosCache = [];

const findAll = () => {
  console.log(todosCache);
  return todosCache;
};

const create = (data) => {
  console.log(data);
  todosCache.push({ ...data, id: String(+new Date()) });
  return data;
};

const update = (id, data) => {
  console.log(data);

  const todos = todosCache.map((item) =>
    item.id === id ? { ...item, ...data } : item
  );
  todosCache = todos;
  return todosCache;
};

const remove = (id) => {
  console.log(id);

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
