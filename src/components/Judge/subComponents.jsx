import React from 'react';
import { AutoComplete } from 'antd';

const AutoCompleteInput = (props) => {
  const Option = AutoComplete.Option;

  const options = props.judges.map(val => (
    <Option key={val.id} text={val.name}>
      {val.name}
    </Option>
  ));

  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={options}
      placeholder="Name"
      onSelect={props.onSelect}
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  );
}

export {
  AutoCompleteInput,
}