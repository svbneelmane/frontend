import {createStore} from 'redux';
import {login} from '../services/userService';
let reducers =  async (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      let state = await login(action.username,action.password)
      return state;
    case 'LOGOUT':
      return {};
    default:
      return state
  }
}
export default createStore(reducers);