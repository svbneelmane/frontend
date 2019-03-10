import {createStore} from 'redux';

import {
  get,
  create,
} from '../services/judgeServices';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'GET':
      let state = await get();
      return state;
    case 'CREATE':
      let state = await create(action.payload);
      return state;
    default:
      return state
  }
}

export default createStore(reducers);