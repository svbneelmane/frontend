import React from "react";

const Contact = (props) => <a href={ "tel:+91" + props.number }>{ props.name } ({ props.number })</a>

export default () => (
  <footer css = {{
    color: "white",
    backgroundColor: "black",
    padding: "50px 20px",
  }}>
    <div>
      Copyright &copy; 2019
    </div>
    <br />
    <div>
      If you've any issues or queries, please feel free to contact
      <br />
      <Contact name="Abid" number="9902447429" />,&ensp;
      <Contact name="Adarsh" number="8250362683" />,&ensp;
      <Contact name="Meghashyam" number="8660852458" />,&ensp;or&ensp;
      <Contact name="Sankarsan" number="9776774337" />
    </div>
  </footer>
);
