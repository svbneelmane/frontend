import React from 'react';

const Input = (props) => (
  <input onChange={ (e) => props.onChange(e.target)} name={props.name} type={props.type} placeholder={props.placeholder} css={{
    ...props.styles,
    height: "32px",
    width: "250px",
    borderRadius: "3px",
    marginBottom: 10,
    border: "1px #efefef solid",
    paddingLeft: "16px",
    fontSize: "12px",
    outline: "0",
  }} />
);

const Button = (props) => (
  <button
    onClick={props.onClick}
    css={{
      ...props.styles,
      position: "relative",
      padding: "8px",
      borderRadius: "3px",
      backgroundColor: "#ff5800",
      color: "white",
      border: "none",
      cursor: "pointer",
      width: "100%",
      ":focus": { outline: 0 },
      ":hover": { opacity: 0.8 },
    }}>
    {props.value}
  </button>
);

export {
  Input,
  Button
}