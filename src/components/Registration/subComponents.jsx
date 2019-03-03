import React from 'react';
import { Input, Form } from 'antd'

export const Participant = (props) => {
  const { getFieldDecorator } = props.form;
  getFieldDecorator('keys', { initialValue: [] });
  return (
    < Form.Item required={false} >
      {getFieldDecorator(`participants[${props.idx}].${props.val}`, {
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