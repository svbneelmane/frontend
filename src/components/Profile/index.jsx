import React from "react";
import { navigate } from "gatsby";

// import userReducer from '../../reducers/userReducer';
import { getUser, logout } from "../../services/userServices";


export default class Profile extends React.Component {
  handleLogout() {
    logout(() => {
      navigate("/");
    });
  }

  // async componentDidMount(){
  //   this.setState({ ...await userReducer.getState() }, () => {
  //     console.log(this.state);
  //   });
  // }

  render() {
    let data = getUser();

    return (
      <>
        <h1>Your profile</h1>
        {/*<h3>{this.state&&this.state.name}</h3>*/}
        {/*<div>{this.state&&this.state.email}</div>*/}
        <ul>
          <li>Name: {data.name||'Loading...'}</li>
          <li>E-mail: {data.email||'Loading...'}</li>
        </ul>
        <button onClick={()=>this.handleLogout()}>Logout</button>
        <button onClick={() => localStorage.clear()}>clear</button>
      </>
    );
  }
}
