import request from "../utils/request";

const get = async () => {
  let response = await request("/leaderboard");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export default {
  get,
};
