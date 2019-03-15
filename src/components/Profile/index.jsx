import React from "react";
import { navigate } from "gatsby";

import { Input } from "../../commons/Form";
import { getUser, logout } from "../../services/userServices";
import usersService from "../../services/users";
import constants from "../../utils/constants";

import avatar from "../../images/user.svg";
import { toast } from "../../actions/toastActions";

export default class Profile extends React.Component {
  state = {
    logoutClicks: 0,
    changePassword: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.name]: e.value
    })
  }

  handleLogout() {
    if (!this.state.logoutClicks) {
      this.setState({
        logoutClicks: this.state.logoutClicks + 1,
      });
    } else {
      this.setState({
        logoutClicks: this.state.logoutClicks - 1,
      });

      logout(() => {
        navigate("/");
        return null;
      });
    }
  }

  handleChangePassword() {
    this.setState({
      changePassword: !this.state.changePassword,
    });

    if(this.state["password:new"]!==this.state["password:new:confirm"]){
      return toast("Confirm pasword does not match");
    }


    if (this.state.changePassword) {
      let payload = {
        oldUser: {
          ...this.state.user,
          password: this.state["password:old"],
        },
        newUser: {
          ...this.state.user,
          password: this.state["password:new"],
        },
      };

      // TODO: Check if oldpassword is correct, & new & confirm passwords match

      usersService.update(payload);
    }
  }

  componentWillMount() {
    this.setState({
      user: getUser(),
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
          <p css={{ color: "truergba(0, 0, 0, .5)" }}>{ data.type ? constants.getUserType(data.type) : "..." }</p>
        </div>
        <div>
          <button css={{ margin: 5, }} onClick={ () => this.handleLogout() }>{ this.state.logoutClicks ? "Sure?" : "Logout" }</button>
          <button css={{ margin: 5, }} onClick={ () => this.handleChangePassword() }>{ this.state.changePassword ? "Change?" : "Change Password" }</button>
        </div>
        <div>
          {
            this.state.changePassword
            ? <>
              <Input onChange={this.handleChange} type="password" name="password:old" placeholder="Old Password" />
              <Input onChange={this.handleChange} type="password" name="password:new" placeholder="New Password" />
              <Input onChange={this.handleChange} type="password" name="password:new:confirm" placeholder="Confirm Password" />
            </>
            : null
          }
        </div>
      </div>
    );
  }
}
