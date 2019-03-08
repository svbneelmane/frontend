import { userService } from '../services/userService';

const login = (username, password) => dispatch => {

  const request = (user) => { return { type: 'LOGIN_REQUEST', user } }
  const success = (user) => { return { type: 'LOGIN_SUCCESS', user } }
  const failure = (error) => { return { type: 'LOGIN_FAILURE', error } }

  dispatch(request({ username }));
  userService.login(username, password)
    .then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error.toString()));
      }
    )
}

const logout = () => dispatch => {
    userService.logout();
    dispatch({
      type: 'LOGOUT_SUCCESS',
    })
}

export {
  login,
  logout,
}