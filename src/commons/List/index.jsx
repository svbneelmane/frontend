import React from 'react';

const List = (props) => (
  <div css={{
    padding: "12px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #efefef",
    position: "relative",
    ":hover": {
      cursor: "pointer",
    }
  }}>
    <div css={{
      position: "absolute",
      fontSize: "1.2em",
      top: "50%",
      transform: "translateY(-50%)"
    }}>{props.position}</div>
    <div css={{
      float: "right",
      marginTop: "18px"
    }}>
      {`Points: ${props.points}`}
    </div>
    <div css={{
      marginLeft: "40px",
    }}>
    <div css={{ fontSize: "1.2em"}} >{props.title}</div>
    <div css={{ opacity: "0.45", fontSize: "0.8em", marginTop: "8px" }}>{props.subTitle}</div>

    </div>

  </div>
);

export {
  List
}
