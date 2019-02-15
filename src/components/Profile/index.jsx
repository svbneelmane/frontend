// TODO: This is just a temporary component to test login.

import React from "react";
import { getUser, logout } from "../../services/auth";
import { navigateTo } from "gatsby";

export default class NormalLoginForm extends React.Component {
  handleLogout(){
    logout(()=>{
      navigateTo("/app")
    })
  }
  render=()=>(
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().name}</li>
      <li>E-mail: {getUser().email}</li>
    </ul>
    <button onClick={()=>this.handleLogout()}>Logout</button>
  </>
);

}