import {createStore} from 'redux';

import {
  get,
  getParticipants,
  getTeams,
  create,
} from '../services/collegeServices';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'GET':
      let state = await get();
      return state;
    case 'GET_PARTICIPANTS':
      let state = await getParticipants(action.eventId);
      return state;
    case 'GET_TEAMS':
      let state = await getTeams(action.eventId);
      return state;
    case 'CREATE':
      let state = await create(action.payload);
      return state;
    default:
      return state
  }
}

export default createStore(reducers);