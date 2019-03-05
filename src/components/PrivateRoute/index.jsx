import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/auth";

export default ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`  && typeof window !== `undefined`){
     navigate(`/app/login`);
     return <div></div>
  } 

  return <Component {...rest} />
};
