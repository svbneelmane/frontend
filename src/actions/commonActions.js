import reducer from "../reducer/commonReducer";

export const send = (data) => {
  reducer.dispatch({type: 'SEND', data});
}