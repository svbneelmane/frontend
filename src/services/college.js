import request from "../utils/request";

const create = async (college) => {
  let response = await request("/colleges", "POST", college);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const getAll = async () => {
  let response = await request("/colleges");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export default {
  create,
  getAll,
};
