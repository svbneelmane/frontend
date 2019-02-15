import constants from '../utils/constants';
export const isBrowser = () => typeof window !== "undefined";


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("utsavUser")
    ? JSON.parse(window.localStorage.getItem("utsavUser"))
    : {};

const setUser = user =>
  window.localStorage.setItem("utsavUser", JSON.stringify(user));

const authorize = async ({ email, password }) => {
  let response = await fetch(constants.server+'/user/login', {
    method: 'post',
    mode: "cors",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
     email,
     password
    })
   });
   /*return {
    name: "Jane Doe",
    email: "jane@nsa.gov",
    contact: [ 9999999999 ],
    type: 1 << 2,
    password: "SomeHashedPassword",
    collegeId: 12,
    regNo: 160120001,
    teams: [ 1234, 5678 ],
  }
  */
   return await response.json();
};

export const handleLogin = async (partialUser) => {
  // TODO: Add some sanity checks

  let user = await authorize(partialUser);

  return setUser(user);
}

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.email;
};

export const logout = callback => {
  setUser({});
  callback();
};
