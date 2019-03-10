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
      <div css = {{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div css = {{
          padding: 20,
          borderRadius: 5,
          boxShadow: "0 10px 50px -10px rgba(0, 0, 0, .2)",
        }}>
          <div css={{
            textAlign: "center",
            marginBottom: "16px"
          }}>Login to your account</div>
          <div>
            <Input onChange={this.handleChange} name="email" type="email" placeholder="Email" />
            <br />
            <Input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <Button  onClick={this.login} value="Login"></Button>
          </div>
        </div>
      </div>
    )
  }
}
