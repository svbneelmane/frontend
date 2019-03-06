export const login = async (username, password) => dispatch => {
  dispatch(request({ username }));
  let user = await userService.login(username, password)
  user => {
    dispatch(success(user));
  },
  error => {
    dispatch(failure(error.toString()));
  }

  request = (user) => { return { type: 'LOGIN_REQUEST', user } }
  success = (user) => { return { type: 'LOGIN_SUCCESS', user } }
  failure = (error) => { return { type: 'LOGIN_FAILURE', error } }
}

export const logout = () => dispatch => {
    userService.logout();
    dispatch({
      type: 'LOGOUT_SUCCESS',
    })
}
