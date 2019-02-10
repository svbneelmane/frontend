export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("utsavUser")
    ? JSON.parse(window.localStorage.getItem("utsavUser"))
    : {};

const setUser = user =>
  window.localStorage.setItem("utsavUser", JSON.stringify(user));

const authorize = ({ email, password }) => {
  // TODO: Get user details from /users/login route.
  // Send a GET request to API and check if the email & hashed password is
  // present in the database.
  // Return the user, if authorized. Otherwise, return {}.
  // NOTE: If you wanna test it, return the following object instead:
  // return {
  //   name: "Jane Doe",
  //   email: "jane@nsa.gov",
  //   contact: [ 9999999999 ],
  //   type: 1 << 2,
  //   password: "SomeHashedPassword",
  //   collegeId: 12,
  //   regNo: 160120001,
  //   teams: [ 1234, 5678 ],
  // }
  return {};
};

export const handleLogin = (partialUser) => {
  // TODO: Add some sanity checks

  let user = authorize(partialUser);

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
