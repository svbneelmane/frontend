import React from 'react';
import { Button } from '../Form'

const RoundCard = (props) => (
  <div
    css={{

      margin: "2%",
      borderRadius: "4px",
      border: "2px solid #efefef",
      width: "45%",
      display: "inline-block"
    }}
  >
    <div
      css={{
        padding: "16px",
        fontSize: "1.2em",
        color: "#FF5800"
      }}
    >{props.title}</div>
    <div
    css={{
      padding: "16px",
      borderTop: "2px solid #efefef",
    }}
    >
      
    </div>
  </div>
);

export {
  RoundCard,
}