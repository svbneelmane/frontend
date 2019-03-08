import {createStore} from 'redux';

const reducer =  (state = 'close', action) => {
  switch (action.type) {
    case 'open':
    case 'close':
    return action.type;
    default:
      return state
  }
}

export default createStore(reducer);