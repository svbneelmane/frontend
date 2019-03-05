import React from "react";

export default (props) => (
  <main css = {{
    minHeight: "100vh",
  }}>
    { props.children }
  </main>
);
