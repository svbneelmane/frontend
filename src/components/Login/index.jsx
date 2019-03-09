import React from "react";
import { Input, Button } from "../../commons/Form";
import { connect } from 'react-redux';
import { login } from '../../actions/userActions';
import './style.css'

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
 login: (email, password) => dispatch(login(email, password))
})

class Login extends React.Component {

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
    this.props.login(this.state.email, this.state.password);
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
            <Button styles={{ left : "50%", transform : "translateX(-50%)" }} onClick={this.login} value="Sign in"></Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);