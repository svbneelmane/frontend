import React from 'react';
import { Button } from '../Form'
import { navigate } from 'gatsby';

const RoundCard = (props) => (
  <div
    css={{
      margin: "2%",
      borderRadius: "4px",
      // border: "2px solid #efefef",
      width: "29%",
      display: "inline-block",
      boxShadow: "0px 5px 12px -5px rgba(0, 0, 0, .1)",
    }}
  > 
    <div
      css={{
        padding: "16px",
        fontSize: "1.2em",
        display: "inline-block"
      }}
    >{props.title} </div>

      {/* TODO: enable tag later on*/}
      {/*<Tag styles={{
              float: "right",
              margin: 16,
            }} type={props.type}/>*/}
    <div
    css={{
      padding: "16px",
      // borderTop: "2px solid #efefef",
    }}
    >
      <Button onClick={ event => { navigate(`/events/${props.eventId}/rounds/${props.RoundId}/slot`) }} fontColor="black" color="#f5f5f5" value="View Slots" /> 
      <Button onClick={ event => { navigate(`/judge/${props.eventId}/rounds/${props.RoundId}`); }} styles={{marginTop: "16px"}} value="Start Round" /> 
    </div>
  </div>
);

export {
  RoundCard,
}