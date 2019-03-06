import React from 'react';

const Input = (props) => (
  <input
    type="text"
    name={props.name}
    css={{width:400, height:20, padding:20, fontSize: "1em"}}
  />
);

const Button = (props) => (
  <button
    css={{
      height:50, width:120, fontSize:"1em", background:"#ff5800", color:"#fff", borderRadius:"5px"
    }}>
    {props.value}
  </button>
);

export {
  Input,
  Button
}