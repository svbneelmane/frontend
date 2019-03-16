import React from "react";

const Contact = (props) => <a href={ "tel:+91" + props.number }>{ props.name } ({ props.number })</a>

export default () => (
  <footer css = {{
    color: "white",
    backgroundColor: "black",
    padding: "50px 20px",
    textAlign:"center"
  }}>
    <div>
      &copy; {(new Date().getFullYear())} MAHE, Manipal.
    </div>
    <br />
    <div>
      If you have any issues or queries, please feel free to contact: 
      <br />
      <Contact name="Poornima" number="9980853396" />,&ensp;
      <Contact name="Sambit" number="9986104763" />.
    </div>
  </footer>
);
