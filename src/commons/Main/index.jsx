import React from "react";

export default (props) => (
  <main css = {{
    minHeight: "100vh",
    padding: 20,
  }}>
    { props.children }
  </main>
);
