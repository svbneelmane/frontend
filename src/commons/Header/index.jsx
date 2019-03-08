import React, { Component } from "react";
import { Link } from "gatsby";
import {FiMenu, FiArrowLeft} from 'react-icons/fi'
import Logo from "../../../static/favicon.png";
import store from '../../reducers/sidebarReducer';
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
        borderTop: "2px solid orange",
      },
    }}>
      { props.title }
    </Link>
  </li>
);
const HeaderLinks = () => (
  <ul css = {{
    listStyle: "none",
    display: "flex",
    fontSize: "0.8em",
  }}>
    <HeaderLink title = "Events" to = "/events" />
    <HeaderLink title = "Leaderboard" to = "/leaderboard" />
  </ul>
);


export default class Header extends Component{
  state={
    menu:'close'
  }
  componentDidMount(){
    store.subscribe(()=>{
      let storeState = store.getState();
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
      this.state.menu=='close'?<FiMenu style={{transform: 'scale(2)',
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