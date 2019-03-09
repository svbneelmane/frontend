import React from 'react';

const Input = (props) => (
  <input onChange={ (e) => props.onChange(e.target)} autoComplete="off" name={props.name} type={props.type} placeholder={props.placeholder} css={{
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

const Tag = (props) => (
  <div css={{
    ...props.styles,
    display : "inline-block"
  }}>
    {(props.type === 1) ? 
      <div css={{
        fontSize : "12px",
        backgroundColor: "#108ee9",
        color: "#ffffff",
        padding: "4px",
        borderRadius: "3px"
      }}>
        scheduled
      </div>
      :
      (props.type === 2) ?
      <div css={{
        fontSize : "12px",
        backgroundColor: "#87d068",
        color: "#ffffff",
        padding: "4px",
        borderRadius: "3px"
      }}>
        In Process
      </div> :
      <div css={{
        fontSize : "12px",
        backgroundColor: "#f5222d",
        color: "#ffffff",
        padding: "4px",
        borderRadius: "3px"
      }}>
        Finished
      </div>
    }
  </div>
);

const Button = (props) => (
  <button
    onClick={props.onClick}
    css={{
      ...props.styles,
      position: "relative",
      padding: "8px",
      borderRadius: "3px",
      backgroundColor: props.color ? props.color : "#ff5800",
      color: props.fontColor ? props.fontColor : "white",
      border: "none",
      cursor: "pointer",
      width: "100%",
      fontSize: "16px",
      ":focus": { outline: 0 },
      ":hover": { opacity: 0.8 },
    }}>
    {props.value}
  </button>
);

export {
  Input,
  Button,
  Tag
}