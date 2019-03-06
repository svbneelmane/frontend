import React from 'react';
import { AutoComplete } from 'antd';
import './style.css'

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

const JudgeTable = (props) => {
  console.log(props);
  return (
    <table>
      <thead>
        <tr>
          <th>Slot No.</th>
          <th>Team Name</th>
          {props.round.criteria.map((each, k) => {
              return (
                <th key={k}>{each}</th>
              )
            })
          }
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          props.slotData.map((each, k) => {
            return (
              <tr key={k}>
                <th>{each.number}</th>
                <th>{each.teamName}</th>
                {props.round.criteria.map((ele,ke) => {
                  return(
                    <th><input type="text"></input></th>
                  )
                })}
                <th></th>
              </tr>
              )
            })
        }
      </tbody>
    </table>
  )
}

export {
  AutoCompleteInput,
  JudgeTable
}