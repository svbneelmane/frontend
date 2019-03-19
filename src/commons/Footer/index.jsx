import React from "react";
import { Link } from "gatsby";

const Contact = (props) => <a href={ "tel:+91" + props.number }>{ props.name } ({ props.number })</a>

export default () => (
  <footer css = {{
    color: "white",
    backgroundColor: "black",
    padding: "50px 20px",
    textAlign:"center"
  }}>
    <div>
      Copyright &copy; {(new Date().getFullYear())} - <Link to="/devs" css={{ color: "white" }}>Placeholder</Link>
    </div>
    <br />
    <div>
      If you have any issues or queries, please feel free to contact
      <br />
      <Contact name="Poornima" number="9980853396" />
      &ensp;or&ensp;
      <Contact name="Sambit" number="9986104763" />
    </div>
  </footer>
);
