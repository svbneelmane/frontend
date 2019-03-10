import constants from '../utils/constants';

export const getEventLeaderboard = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${id}/leaderboard`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}

export const getRoundLeaderboard = async (eventId, roundId) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/events/${eventId}/rounds/${roundId}/leaderboard`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}

export const getLeaderboard = async (eventId, roundId) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/leaderboard`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    return json.data;
  } else {
    return null;
  }
}

