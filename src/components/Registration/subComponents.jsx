import React from 'react';
import { Input, Divider, Form } from 'antd'

export const Participant = (props) => {
  const { getFieldDecorator } = props.form;
  getFieldDecorator('keys', { initialValue: [] });
  return (
    < Form.Item required={false} >
      {getFieldDecorator(`data[${props.idx}].${props.val}`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{
          required: true,
          whitespace: props.whitespace,
          message: props.message,
          type: props.type,
        }],
      })(
        <Input addonBefore={props.hint} size="large" className="field" />
      )}
    </Form.Item>
  )
} 