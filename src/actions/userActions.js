import reducer from "../reducers/userReducer";


export const   login = (username, password) =>  {
    reducer.dispatch({type:'LOGIN',username,password});
  };

export const  logout = () => {
    reducer.dispatch({type:'LOGOUT'});
  }