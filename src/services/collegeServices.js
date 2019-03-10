import constants from '../utils/constants';

export const get = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/colleges`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}

export const getParticipants = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/colleges/${id}/particpants`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}

export const getTeams = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/colleges/${id}/teams`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}

export const create = async (payload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/colleges`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}