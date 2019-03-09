import React, { Component } from "react";
import { Link } from "gatsby";
import {FiMenu, FiArrowLeft,FiUser, FiUserCheck} from 'react-icons/fi'
import Logo from "../../../static/favicon.png";
import sidebarStore from '../../reducers/sidebarReducer';
import userStore from '../../reducers/userReducer';
import {open,close} from '../../actions/sidebarActions';

import './style.css';

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
      <div css = {{
        fontSize: "1.3em",
      }}>
        MUCAPP
      </div>
    </div>
  </Link>
);

const HeaderLink = (props) => (
  <li>
    <Link to = { props.to } title = { props.title } css = {{
      padding: "20px 10px",
      color: "black",
      ":hover": {
        borderTop: "4px solid #ff5800",
      },
    }}>
      { props.title }
    </Link>
  </li>
);
class HeaderLinks extends Component {
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
  render= () => (
    <ul css = {{
      listStyle: "none",
      display: "flex",
      fontSize: "0.8em",
      marginRight:50
    }}>
      <HeaderLink title = "Events" to = "/events" />
      <HeaderLink title = "Leaderboard" to = "/leaderboard" />
  <Link to="/login"> {this.state.loggedIn?<FiUserCheck className="userIcon"/>:<FiUser className="userIcon"/>}</Link>
    </ul>
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
      boxShadow: "0 2px 8px #f0f1f2",
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
      <HeaderLinks />
    </header>
  );  
} 