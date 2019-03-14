import React from 'react';

const Input = (props) => (
  <input
    onChange = { (e) => props.onChange(e.target)}
    autoComplete = "off"
    name = {props.name}
    type = {props.type}
    min={props.min}
    max={props.max}
    value={props.value}
    placeholder = {props.placeholder}
    css = {{
      ...props.styles,
    }}
  />
);

const TextArea = (props) => (
  <textarea
    onChange = { (e) => props.onChange(e.target)}
    autoComplete = "off"
    name = {props.name}
    type = {props.type}
    placeholder = {props.placeholder}
    css = {{
      ...props.styles,
    }}
  >{props.children}</textarea>
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
    css = {{
      ...props.styles,
    }}
    onClick = {props.onClick}
    disabled={props.disabled?"disabled":false}
  >
    {props.children}
  </button>
);

export {
  Input,
  Button,
  Tag,
  TextArea
}
