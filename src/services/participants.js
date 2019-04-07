import request from "../utils/request";
import toast from '../reducers/toastReducer';

const get = async (participantID) => {
  let response = await request("/participants/" + participantID);

  if (response && response.status === 200) {
    return response.data;
  } else {
    if (response && response.status === 401) toast("Your session has expired, please logout and login again.");
    return null;
  }
};

const update = async (participantID, participant) => {
  let response = await request("/participants/" + participantID, "PATCH", participant);

  if (response && response.status === 200) {
    return response.data;
  } else {
    if (response && response.status === 401) toast("Your session has expired, please logout and login again.");
    return [];
  }
};

export default {
  get,
  update,
};
