import constants from '../utils/constants';
import { send } from '../actions/commonActions';

export const get = async () => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events`, requestOptions);
  let json = await response.json();

  if(json.status&&json.status===200) {

    send({
      list: json.data,
      src: 'events'
    });
    return json;
  } else {
    return null;
  }
}

export const getRounds = async (eventId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
} 

export const getSlots = async (eventId, roundId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds/${roundId}/slots`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
} 

export const getTeams = async (eventId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/teams`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
} 

export const getRoundTeams = async (eventId, roundId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds/${roundId}/teams`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
} 

export const create = async (payload) => {
  const requestOptions = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/events`, requestOptions);
  let json = await response.json();
  return json;
}


export const createRound = async (payload, eventId) => {
  const requestOptions = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
}

export const createTeam = async (payload, eventId) => {
  const requestOptions = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/events/${eventId}/teams`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
}

export const createSlots = async (payload, eventId, roundId) => {
  const requestOptions = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds/${roundId}/slots`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
}

export const submitScore = async (payload, eventId, roundId) => {
  const requestOptions = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds/${roundId}/scores`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send({
      list: json.data,
      src: 'events'
    });
  } else {
    return null;
  }
}