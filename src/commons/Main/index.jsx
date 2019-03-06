import React from "react";

export default (props) => (
  <main css = {{
    minHeight: "100vh",
    display: "flex",
  }}>
    { props.children }
  </main>
);
