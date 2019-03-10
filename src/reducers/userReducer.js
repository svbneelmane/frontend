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
      return await login(action);
    case 'LOGOUT':
      await logout();
      return {};
    case 'UPDATE':
      return await update(action.payload);
    case 'CREATE':
      return await create(action.payload);
    case 'GET':
      return await get(action.id);
    default:
      return state
  }
};

export default createStore(reducers);
