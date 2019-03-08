import React from 'react';

const EventList = (props) => (
  <div css={{
    padding: "12px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #efefef",
    ":hover": {
      cursor: "pointer",
    }
  }}>
    <div css={{ fontSize: "1.2em"}} >{props.title}</div>
    <div css={{ opacity: "0.45" }}>{props.description}</div>
  </div>
);

export {
  EventList
}