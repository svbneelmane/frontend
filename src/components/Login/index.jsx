import React from "react";
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from "../../services/auth";
import {
  Form, Icon, Input, Button, message
} from 'antd';

class NormalLoginForm extends React.Component {

  componentWillMount(){
    if (isLoggedIn())
      navigate(`/app`);
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err){  
      
       let data = await handleLogin(values);
       if(data.status){
         console.log('error');
         if(data.status==401)
          message.error('You are not authorized to login.');
        else
          message.error(data.status+": "+data.message);
       }
       console.log('Login',isLoggedIn());
       if (isLoggedIn()) navigate(`/app`);
      }
    });
  }

  render() {
   

    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form
          onSubmit={event => {
            this.handleSubmit(event);
           
          }}
          className="login-form"
          style={{
            margin: "0 auto",
            maxWidth: 500
          }}
        >
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, type: "email", message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" autoComplete="email" placeholder="Email" required />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" autoComplete="new-password" placeholder="Password" required />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
