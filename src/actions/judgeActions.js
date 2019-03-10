import reducer from "../reducer/judgeReducer";

export const create = (payload) => {
  reducer.dispatch({type: 'CREATE', payload});
}

export const get = () => {
  reducer.dispatch({type: 'GET'});
}
