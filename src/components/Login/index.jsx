import React,{Component} from "react";
import { Input, Button } from "../../commons/Form";
import { login } from '../../actions/userActions';


export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.name]: e.value
    })
  }

  login = () => {
    login(this.state.email, this.state.password);
  }

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
        }}>Login</div>
        <div>
          <Input onChange={this.handleChange} name="email" type="text" placeholder="Email" />
          <br />
          <Input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
        </div>
        <div css={{
          marginTop: "16px"
        }}>
          <Button styles={{ left : "50%", transform : "translateX(-50%)" }} onClick={this.login} value="Sign in"></Button>
        </div>
      </div>
    )
  }
}
