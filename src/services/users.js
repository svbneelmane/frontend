import request from "../utils/request";

const create = async (user) => {
  let response = await request("/users", "POST", user);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const get = async (id) => {
  let response = await request("/users/" + id);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const getAll = async () => {
  let response = await request("/users");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const update = async (user) => {
  if (!user || !user.oldUser || !user.newUser) return null;

  let response = await request("/users/" + user.oldUser.id, "PATCH", user);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

export default {
  create,
  get,
  getAll,
  update,
};
