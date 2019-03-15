import React from "react";
import { navigate } from "gatsby";

import { getUser, logout } from "../../services/userServices";
import constants from "../../utils/constants";

import avatar from "../../images/user.svg";

export default class Profile extends React.Component {
  handleLogout() {
    logout(() => {
      navigate("/");
      return null;
    });
  }

  render() {
    let data = getUser();

    return (
      <div css={{
        marginTop: 50,
        textAlign: "center",
      }}>
        <div>
          <img src={ avatar } alt="Avatar" height="200" width="200" />
        </div>
        <div>
          <h1>{ data.name || "..." }</h1>
          <p css={{ color: "rgba(0, 0, 0, .7)" }}>{ data.email || "..." }</p>
          <p css={{ color: "rgba(0, 0, 0, .5)" }}>{ data.type ? constants.getUserType(data.type) : "..." }</p>
        </div>
        <button onClick={ () => this.handleLogout() }>Logout</button>
      </div>
    );
  }
}
