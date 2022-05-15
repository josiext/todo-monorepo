import Koa from "koa";

const app = new Koa();

const TODO_CACHE = [];

const get = () => {
  return TODO_CACHE;
};

const post = (data) => {
  TODO_CACHE.push(data);
  return data;
};

const update = (data) => {
  return data;
};

const remove = (id) => {
  return { id: "123", label: "123" };
};

app.use(async (ctx) => {
  if (ctx.method === "GET") ctx.body = get();
  if (ctx.method === "POST") ctx.body = post();
  if (ctx.method === "UPDATE") ctx.body = update();
  if (ctx.method === "DELETE") ctx.body = remove();
});

app.on("error", (err) => {
  console.log("server error", err);
});

app.listen(3001);

console.log("Backend on http://localhost:3001/");
