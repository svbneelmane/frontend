import request from "../utils/request";
import { send } from '../actions/commonActions';
import {getUser} from './userServices';

export const getAll = async () => {
  let response = await request("/colleges");

  if (response && response.status === 200 && response.data) {
    send({
      list: response.data,
      src: 'colleges',
    });
  } else {
    send([]);
  }
};

export const get = async () => {
  let response = await request(`/colleges`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'colleges',
    });
  } else {
    return null;
  }
}

export const getParticipants = async (eventId) => {
  let response = await request(`/colleges/${eventId}/particpants`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'colleges'
    });
  } else {
    return null;
  }
}

export const getTeams = async () => {
  let response = await request(`/colleges/${getUser().college}/teams`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'colleges'
    });
  } else {
    return null;
  }
}

export const getTeamsForCollege = async (collegeId) => {
  let response = await request(`/colleges/${collegeId}/teams`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'colleges'
    });
  } else {
    return null;
  }
}

export const create = async (payload) => {
  let response = await request(`/colleges`, "POST", payload);

  return response;
}
