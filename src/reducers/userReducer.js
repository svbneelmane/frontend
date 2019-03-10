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
      let state = await login(action);
      return state;
    case 'LOGOUT':
      await logout();
      return {};
    case 'UPDATE':
      let state = await update(action.payload);
      return state;
    case 'CREATE':
      let state = await create(action.payload);
      return state;
    case 'GET':
      let state = await get(action.id);
      return state;
    default:
      return state
  }
}

export default createStore(reducers);
