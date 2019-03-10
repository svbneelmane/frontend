import {createStore} from 'redux';

import {
  getEventLeaderboard,
  getRoundLeaderboard,
  getLeaderboard,
} from '../services/leaderboardServices';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'GET_EVENT_LEADERBOARD':
      let state = await getEventLeaderboard(action.eventId);
      return state;
    case 'GET_ROUND_LEADERBOARD':
      let state = await getRoundLeaderboard(action.eventId, action.roundId);
      return state;
    case 'GET_LEADERBOARD':
      let state = await getLeaderboard(action.eventId, action.roundId);
      return state;
    default:
      return state
  }
}

export default createStore(reducers);