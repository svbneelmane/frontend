import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/auth";

export default ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) return navigate(`/app/login`);

  return <Component {...rest} />
};
