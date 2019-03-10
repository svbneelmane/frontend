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
      return await get();
    case 'GET_PARTICIPANTS':
      return await getParticipants(action.eventId);
    case 'GET_TEAMS':
      return await getTeams(action.eventId);
    case 'CREATE':
      return await create(action.payload);
    default:
      return state
  }
}

export default createStore(reducers);