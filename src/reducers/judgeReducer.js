import {createStore} from 'redux';

import {
  get,
  create,
} from '../services/judgeServices';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'GET':
      return await get();
    case 'CREATE':
      return await create(action.payload);
    default:
      return state
  }
}

export default createStore(reducers);