import React from "react";
import { navigate } from "gatsby";

// import userReducer from '../../reducers/userReducer';
import { getUser, logout } from "../../services/userServices";
import { Button } from "../../commons/Form";


export default class Profile extends React.Component {
  handleLogout() {
    logout(() => {
      navigate("/");
      return null;
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
        <Button onClick={()=>this.handleLogout()}>Logout</Button>
        <Button onClick={() => localStorage.clear()}>clear</Button>
      </>
    );
  }
}
