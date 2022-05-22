import Fastify from "fastify";
import cors from "@fastify/cors";

import TodoService from "./services.js";
import { TodoRequestSchemas } from "./schemas.js";

const fastify = Fastify();

async function todoRoute(fastify, options) {
  fastify.get("/todo", (request, reply) => {
    return TodoService.findAll();
  });

  fastify.post("/todo", TodoRequestSchemas.Post, async (request, reply) => {
    reply.status(201);
    return TodoService.create(request.body);
  });

  fastify.patch("/todo", TodoRequestSchemas.Patch, async (request, reply) => {
    return TodoService.update(request.body.id, request.body.data);
  });

  fastify.delete("/todo", TodoRequestSchemas.Delete, async (request, reply) => {
    return TodoService.remove(request.body.id);
  });
}

fastify.register(cors);
fastify.register(todoRoute);

const start = async () => {
  try {
    await fastify.listen(3001);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
