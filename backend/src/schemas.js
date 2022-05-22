const Post = {
  body: {
    type: "object",
    required: ["label"],
    properties: {
      label: { type: "string" },
    },
  },
};

const Patch = {
  body: {
    type: "object",
    required: ["id", "label"],
    properties: {
      id: { type: "string" },
      label: { type: "string" },
    },
  },
};

const Delete = {
  body: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

export const TodoRequestSchemas = {
  Post,
  Patch,
  Delete,
};
