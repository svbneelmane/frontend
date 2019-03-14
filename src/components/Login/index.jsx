import React,{Component} from "react";
import { Input, Button } from "../../commons/Form";
import { login, setUser } from '../../services/userServices';
import { toast } from "../../actions/toastActions";
import { navigate } from "gatsby";


export default class Login extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  email: null,
	  password: null,
	  loginButton: 'Login'
	};
  }

  handleChange = (e) => {
  	this.setState({
  	  [e.name]: e.value
  	})
  }

  login = () => {
	if(!this.state.email)
		return toast("Please enter email");
	if(!this.state.password)
		return toast("Please enter password");
	this.setState({
		loginButton:'Logging in...'
	},async ()=>{
		let response = await login({email:this.state.email, password:this.state.password});
		if(response.status===200){
			setUser(response.data);
			navigate("/profile");
		}
		else{
			toast(response.message);
			this.setState({
				loginButton:'Login'
			})
		}
	})

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
		  width: 350,
		  padding: 20,
		  borderRadius: 5,
		  boxShadow: "0 10px 50px -10px rgba(0, 0, 0, .2)",
		}}>
		  <div css={{
			textAlign: "center",
			marginBottom: "16px",
		  }}>Login to MUCAPP</div>
		  <div css ={{
			display: "flex",
			flexDirection: "column",
		  }}>
			<Input onChange={this.handleChange} name="email" type="email" placeholder="Email" />
			<Input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
		  </div>
		  <div>
			<Button
			  styles = {{
				width: "100%",
			  }}
			  onClick = {this.login}
			>
			  {this.state.loginButton}
			</Button>
		  </div>
		</div>
	  </div>
	)
  }
}
