import React from 'react';
import { Button, Input } from '../Form'
import { navigate } from 'gatsby';
import { FiX } from "react-icons/fi";

const RoundCard = (props) => (
  <div
    css={{
      margin: "2%",
      padding: 20,
      borderRadius: "4px",
      // border: "2px solid #efefef",
      width: "29%",
      display: "inline-block",
      boxShadow: "0px 5px 12px -5px rgba(0, 0, 0, .1)",
    }}
  >
    <div css={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 20,
      fontSize: "1.2em",
    }}>
      <span>{ props.title }</span>
      <span css={{
        cursor: "pointer",
        ":hover": {
          color: "red",
        },
      }}>
        <FiX onClick={ () => props.onClick(props.roundId) } />
      </span>
    </div>

      {/* TODO: enable tag later on*/}
      {/*<Tag styles={{
              float: "right",
              margin: 16,
            }} type={props.type}/>*/}
    <div>
      <Button onClick={ event => { navigate(`/events/${props.eventId}/rounds/${props.roundId}/slot`) }} styles={{color:"black", backgroundColor : "#f5f5f5", width: "100%"}}  color="#f5f5f5" value="View Slots" >View Slots</Button>
      <Button onClick={ event => { navigate(`/judge/${props.eventId}/rounds/${props.roundId}`); }} styles={{marginTop: "16px", width: "100%"}} value="Start Round" >Start Round</Button>
    </div>
  </div>
);

const CriteriaCard = (props) => (
  <div
    css={{
      margin: "2%",
      borderRadius: "4px",
      width: (props.single) ? "100%" : "40%",
      display: "inline-block",
      boxShadow: "0px 5px 12px -5px rgba(0, 0, 0, .1)",
    }}
  >
    <div
      css={{
        padding: "16px",
        fontSize: "1.2em",
        textAlign: "center"
      }}
    >{props.title} </div>

    <div
    css={{
      padding: "16px",
    }}
    >
      <Input
        value={props.value}
        name = {props.name}
        onChange={props.onChange}
        styles={{
          width: "100%",
          textAlign: "center",
          fontSize: "200%"
        }}
      />
    </div>
  </div>
);

export {
  RoundCard,
  CriteriaCard
}
