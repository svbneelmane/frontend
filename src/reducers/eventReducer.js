import {createStore} from 'redux';

import {
  create,
  createRound,
  createTeam,
  createSlots,
  submitScore,
  get,
  getTeams,
  getRounds,
  getRoundTeams,
  getSlots,
} from '../services/eventService';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'CREATE':
      return await create(action.payload);
    case 'CREATE_ROUND':
      return await createRound(action.payload, action.eventId);
    case 'CREATE_TEAM':
      return await createTeam(action.payload, action.eventId);
    case 'CREATE_SLOTS':
      return await createSlots(action.payload, action.eventId, action.roundId);
    case 'SUBMIT_SCORE':
      return await submitScore(action.payload, action.eventId, action.roundId);
    case 'GET':
      return await get();
    case 'GET_TEAMS':
      return await getTeams(action.eventId);
    case 'GET_ROUNDS':
      return await getRounds(action.eventId);
    case 'GET_ROUND_TEAMS':
      return await getRoundTeams(action.eventId, action.roundId);
    case 'GET_SLOTS':
      return await getSlots(action.eventId, action.roundId);
    default:
      return state
  }
}

export default createStore(reducers);