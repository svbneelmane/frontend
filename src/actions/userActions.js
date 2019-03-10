import reducer from "../reducers/userReducer";


export const   login = (email, password) =>  {
    reducer.dispatch({type:'LOGIN',email,password});
  };

export const  logout = () => {
    reducer.dispatch({type:'LOGOUT'});
  }