import React,{Component} from "react";
import { Input, Button } from "../../commons/Form";
import { login } from '../../actions/userActions';
import './style.css'


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
      <div className="loginBoxContainer">
        <div className="loginBox">
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
            <Button  onClick={this.login} value="Sign in"></Button>
          </div>
        </div>
      </div>
    )
  }
}
