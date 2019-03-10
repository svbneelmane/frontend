import {createStore} from 'redux';

let reducers = async (state = {}, action) => {
  switch (action.type) {
    case 'SEND':
      return action;
    default:
      return state
  }
}

export default createStore(reducers);