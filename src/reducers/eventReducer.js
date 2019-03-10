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
  send,
} from '../services/eventServices';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'CREATE':
      let state = await create(action.payload);
      return state;
    case 'CREATE_ROUND':
      let state = await createRound(action.payload, action.eventId);
      return state;
    case 'CREATE_TEAM':
      let state = await createTeam(action.payload, action.eventId);
      return state;
    case 'CREATE_SLOTS':
      let state = await createSlots(action.payload, action.eventId, action.roundId);
      return state;
    case 'SUBMIT_SCORE':
      let state = await submitScore(action.payload, action.eventId, action.roundId);
      return state;
    case 'GET':
      let state = await get();
      return state;
    case 'GET_TEAMS':
      let state = await getTeams(action.eventId);
      return state;
    case 'GET_ROUNDS':
      let state = await getRounds(action.eventId);
      return state;
    case 'GET_ROUND_TEAMS':
      let state = await getRoundTeams(action.eventId, action.roundId);
      return state;
    case 'GET_SLOTS':
      let state = await getSlots(action.eventId, action.roundId);
      return state;
    default:
      return state
  }
}

export default createStore(reducers);