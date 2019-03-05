import React from "react";
import { AutoComplete, Form, Button } from 'antd';

export const Judge = (props) => {
  const { getFieldDecorator } = this.props.form;
  const Option = AutoComplete.Option;

  const options = this.props.judges.map(val => (
    <Option key={val.id} text={val.name}>
      {val.name}
    </Option>
  ));
    
  return (
    <Form
      style={{
        margin: "0 auto",
        maxWidth: 500
      }}
    >
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please enter your name!' }],
        })(
          <AutoComplete
            style={{ width: 200 }}
            dataSource={options}
            placeholder="Name"
            onSelect={this.props.handleJudge}
            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          />
        )}
      </Form.Item>
    </Form>
  );
}