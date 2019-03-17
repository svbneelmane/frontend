import request from "../utils/request";
import { send } from '../actions/commonActions';

export const getAll = async () => {
  let response = await request("/judges");

  if (response && response.status === 200 && response.data) {
    send({
      list: response.data,
      src: 'judges',
    });
  } else {
    send([]);
  }
}

export const get = async () => {
  let response = await request(`/judges`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'judges'
    });
  } else {
    return null;
  }
}

export const create = async (payload) => {
  let response = await request(`/judges`, "POST", payload);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'judges'
    });
  } else {
    return null;
  }
}
