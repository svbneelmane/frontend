import React from "react";

import loader from "../../images/loader.gif";

export default () => (
  <div css={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }}>
    <img src={ loader } alt="..." width="300" />
    <p css={{ margin: 0 }}>Loading...</p>
  </div>
);
