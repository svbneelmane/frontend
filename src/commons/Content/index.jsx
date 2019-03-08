import React from "react";

export default (props) => (
  <main css = {{
    minHeight: "100vh",
    padding: 20,
    width:'100%',
  }}>
    { props.children }
  </main>
);
