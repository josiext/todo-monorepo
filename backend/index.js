import Fastify from "fastify";
import cors from "@fastify/cors";

import TodoService from "./services.js";

const fastify = Fastify({
  logger: true,
});

const PostSchema = {
  body: {
    type: "object",
    required: ["label"],
    properties: {
      label: { type: "string" },
    },
  },
};

const PatchSchema = {
  body: {
    type: "object",
    required: ["id", "label"],
    properties: {
      id: { type: "string" },
      label: { type: "string" },
    },
  },
};

const DeleteSchema = {
  body: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

async function todoRoute(fastify, options) {
  fastify.get("/todo", (request, reply) => {
    return TodoService.findAll();
  });

  fastify.post("/todo", PostSchema, async (request, reply) => {
    reply.status(201);
    return TodoService.create(request.body);
  });

  fastify.patch("/todo", PatchSchema, async (request, reply) => {
    return TodoService.update(request.body);
  });

  fastify.delete("/todo", DeleteSchema, async (request, reply) => {
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
