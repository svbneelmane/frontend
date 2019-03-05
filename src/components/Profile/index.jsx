// TODO: This is just a temporary component to test login.

import React from "react";
import { getUser, logout } from "../../services/auth";
import { navigateTo } from "gatsby";


export default class Profile extends React.Component {
  handleLogout(){
    logout(()=>{
      if(typeof window !== `undefined`) 
        navigateTo("/app")
    })
  }
  render(){
    let {name,email} = getUser().data;
    return(<>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {name||'Loading...'}</li>
        <li>E-mail: {email||'Loading...'}</li>
      </ul>
      <button onClick={()=>this.handleLogout()}>Logout</button>
    </>);
  }

}