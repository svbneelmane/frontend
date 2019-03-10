import { createStore } from 'redux';

import {
  login,
  get,
  create,
  update,
  logout
} from '../services/userServices';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      state = await login(action);
      return state;
    case 'LOGOUT':
      await logout();
      return {};
    case 'UPDATE':
      state = await update(action.payload);
      return state;
    case 'CREATE':
      state = await create(action.payload);
      return state;
    case 'GET':
      state = await get(action.id);
      return state;
    default:
      return state
  }
};

export default createStore(reducers);
