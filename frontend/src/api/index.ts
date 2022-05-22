import { Todo } from "../types";
import { API } from "../configs";

const apiUrl = API.BASE + "/todo";

const findAll = () => fetch(apiUrl).then((res) => res.json());

const create = async (item: Omit<Todo, "id">) => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return res.json();
};

const remove = async (id: Todo["id"]) => {
  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

const update = async (id: Todo["id"], data: Partial<Omit<Todo, "id">>) => {
  return fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, data }),
  });
};

export default { findAll, create, remove, update };
