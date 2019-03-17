import request from "../utils/request";
import { send } from '../actions/commonActions';

export const getEventLeaderboard = async (eventId) => {
  let response = await request(`/events/${eventId}/leaderboard`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'leaderboard'
    });
  } else {
    return null;
  }
}

export const getRoundLeaderboard = async (eventId, roundId) => {
  let response = await request(`/events/${eventId}/rounds/${roundId}/leaderboard`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'leaderboard'
    });
  } else {
    return null;
  }
}

export const getLeaderboard = async () => {
  let response = await request(`/leaderboard`);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'leaderboard'
    });
  } else {
    return null;
  }
}
