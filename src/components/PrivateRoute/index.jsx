import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/userService";

export default ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== "/login") navigate("/login");

  return <Component {...rest} />;
};
