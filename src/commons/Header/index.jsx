import React, { Component } from "react";
import { Link } from "gatsby";
import {FiMenu, FiArrowLeft,FiUser, FiUserCheck} from 'react-icons/fi'
import Logo from "../../../static/favicon.png";
import sidebarStore from '../../reducers/sidebarReducer';
import userStore from '../../reducers/userReducer';
import {open,close} from '../../actions/sidebarActions';

const HeaderLogo = () => (
  <Link to="/">
    <div css = {{
      display: "flex",
      alignItems: "center",
    }}>
      <div>
        <img
          src = { Logo }
          alt="Logo"
          height = "64"
          css = {{
            padding: 15,
          }}
        />
      </div>
    </div>
  </Link>
);

class UserLink extends Component {
  state={
    loggedIn:false
  }

  async checkLoggedIn(){
    let userState = await userStore.getState();

    this.setState({loggedIn:!!userState},()=>{
      console.log(this.state);
    });
  }

  componentDidMount(){
      this.checkLoggedIn();
      userStore.subscribe(()=>{
        this.checkLoggedIn();
      })
  }

  render = () => (
    <Link to = { this.state.loggedIn ? "/profile" : "/login" }>
      <button css = {{
        margin: 10,
      }}>
        <FiUser />&ensp;{ this.state.loggedIn ? "Profile" : "Login" }
      </button>
    </Link>
  );
}


export default class Header extends Component{
  state={
    menu:'close'
  }
  componentDidMount(){
    sidebarStore.subscribe(()=>{
      let storeState = sidebarStore.getState();
      this.setState({menu:storeState})
      console.log(storeState,this.state);
    });
  }

  render = () => (
    <header css = {{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 64,
      boxShadow: "0 5px 50px 10px #f0f1f2",
    }}>
      {
        this.state.menu==='close'?<FiMenu style={{transform: 'scale(2)',
        marginLeft: 5,
        color:'#df6148'}}
        onClick={open}/>:<FiArrowLeft style={{transform: 'scale(2)',
        marginLeft: 5,
        color:'#df6148'}}
        onClick={close}/>
      }
      <HeaderLogo />
      <UserLink />
    </header>
  );
}
