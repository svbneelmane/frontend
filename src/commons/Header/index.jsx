import React from "react";
import { Link } from "gatsby";

import Logo from "../../../static/favicon.png";

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
        Manipal Utsav
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

export default () => (
  <header css = {{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,
    boxShadow: "0 2px 8px #f0f1f2",
  }}>
    <HeaderLogo />
    <HeaderLinks />
  </header>
);
