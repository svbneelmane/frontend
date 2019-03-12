import React from "react";

export default (props) => (
  <div css = {{
    minHeight: "100vh",
    padding: 20,
    width:'100%',
  }}>
    { props.children }
  </div>
);
