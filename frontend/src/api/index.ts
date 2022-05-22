import { Todo } from "../types";
import { API } from "../configs";

const apiUrl = API.BASE + "/todo";

const findAll = () => fetch(apiUrl).then((res) => res.json());
const create = async (item: Omit<Todo, "id">) =>
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
const remove = async (id: Todo["id"]) => {
  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

const update = async (id: Todo["id"], data: Partial<Todo>) =>
  fetch(apiUrl, { method: "PATCH", body: JSON.stringify({ id, data }) });

export default { findAll, create, remove, update };
