import reducer from "../reducers/commonReducer";

export const send = (data) => {
  reducer.dispatch({type: 'SEND', data});
}