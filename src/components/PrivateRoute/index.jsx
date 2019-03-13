import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/userServices";

export default ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== "/login") {
    navigate("/login");
    console.log("LOGIN");
    return null;
  }
  console.log("Render");
  return <Component {...rest} />;
};
