import request from "../utils/request";

const create = async (judge) => {
  let response = await request("/judges", "POST", judge);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const getAll = async () => {
  let response = await request("/judges");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export default {
  create,
  getAll,
};
