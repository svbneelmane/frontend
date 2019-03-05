import React from 'react';

const Input = (props) => (
  <input
    type="text"
    name={props.name}
    value={props.value}
  />
);

export {
  Input
}