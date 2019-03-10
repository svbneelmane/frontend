import reducer from "../reducers/toastReducer";

export const toast = (message) =>  {

  reducer.dispatch({type:'SHOW_TOAST',message});
}
