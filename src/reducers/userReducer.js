import {createStore} from 'redux';
import {login} from '../services/userService';
let reducers =  async (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    console.log('action',action)
      let state = await login(action)
      return state;
    case 'LOGOUT':
      return {};
    default:
      return state
  }
}
export default createStore(reducers);