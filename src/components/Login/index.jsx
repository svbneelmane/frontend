import React from "react";
import { Input, Button } from "../../commons/Form";

export default class Login extends React.Component {
  render(){
    return(
      <div css={{
        boxShadow: "0px 9px 12px -5px rgba(0, 0, 0, 0.1)",
        padding: "16px 16px",
        display: "block",
        borderRadius: "5px",
        position: "absolute",
        left: "50%",
        top: "50%",
      }}>
        <div css={{
          textAlign: "center",
          marginBottom: "16px"
        }}>Lorem</div>
        <div>
          <Input type="text" placeholder="Email" />
          <br />
          <Input type="password" placeholder="Password" />
        </div>
        <div css={{
          marginTop: "16px"
        }}>
          <Button styles={{ left : "50%", transform : "translateX(-50%)" }} onClick={() => { console.log("here") }} value="Sign in"></Button>
        </div>
      </div>
    )
  }
}