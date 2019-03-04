import React from "react";
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from "../../services/auth";
import {
  Form, Icon, Input, Button, Layout,
} from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err){  
      
       await handleLogin(values);
       if (isLoggedIn()) navigate(`/app`);
      }
    });
  }

  render() {
    if (isLoggedIn()) navigate(`/app`);

    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Form
          onSubmit={event => {
            this.handleSubmit(event);
            navigate(`/app`);
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
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" required />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" required />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
