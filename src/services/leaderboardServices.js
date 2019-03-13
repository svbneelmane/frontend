import constants from '../utils/constants';
import { send } from '../actions/commonActions';

export const getEventLeaderboard = async (eventId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/leaderboard`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

export const getRoundLeaderboard = async (eventId, roundId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds/${roundId}/leaderboard`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

export const getLeaderboard = async (eventId, roundId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/leaderboard`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

