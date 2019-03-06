import React from 'react';

const Input = (props) => (
  <input
    type="text"
    name={props.name}
  />
);

const Button = (props) => (
  <button
    css={{
      backgroundColor: (props.type === "primary") ? "#FF5800" :  null,
    }}
  >{props.value}</button>
);

export {
  Input,
  Button
}