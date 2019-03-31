import request from "../utils/request";
import toast from '../reducers/toastReducer';

const get = async () => {
  let response = await request("/leaderboard");

  if (response && response.status === 200) {
    return response.data;
  } else {
    if(response&&response.status===401)
      toast("Your session has expired, please logout and login again.")
    return [];
  }
}

const getRound = async (event,round) => {
  let response = await request(`/events/${event}/rounds/${round}/leaderboard`);
  if (response && response.status === 200) {
    return response.data;
  } else {
    if(response&&response.status===401)
      toast("Your session has expired, please logout and login again.")
    return [];
  }
}

export default {
  get,
  getRound,
};
