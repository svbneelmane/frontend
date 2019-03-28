import request from "../utils/request";

const get = async () => {
  let response = await request("/stats");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

export default {
  get,
};
