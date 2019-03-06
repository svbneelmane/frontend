import React, { Component } from 'react';
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

class JudgeTable extends Component{

constructor(props){
  super(props);
  this.handleInput=this.handleInput.bind(this);
  this.state = JSON.parse(localStorage.getItem('JudgeTable'))||{};
}
handleInput(event){
  let {name,value} = event.target
  console.log(name,this.state,this.props);
  
  this.setState({[name]:value},()=>{
    let criteria = this.props.round.criteria;
    let slotNo = name.split('-')[0].replace("s","");
    let total =0;
    criteria.map((i,k)=>total+=Number(this.state[`s${slotNo}-c${k}`]||0));
    console.log(total);
    this.setState({
      [`s${slotNo}-total`]:total
    },()=>{
      localStorage.setItem('JudgeTable',JSON.stringify(this.state));

    });
  })
}
confirmSubmit(){
  let dialog = document.querySelector(".dialog-background");
  dialog.classList.remove('hide');
}
hideDialog(){
  let dialog = document.querySelector(".dialog-background");
  dialog.classList.add('hide');
}
handleSubmit(){
  console.log(1);
}
render = () => {
  let props = this.props;
  return (
    <>
    <table className="judgeTable">
      <thead>
        <tr>
          <th>Slot No.</th>
          <th>Team Name</th>
          {props.round.criteria.map((criteria,cindex) => {
              return (
                <th key={cindex}>{criteria}</th>
              )
            })
          }
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          props.slotData.map((slot, sindex) => {
            return (
              <tr key={sindex}>
                <th>{slot.number}</th>
                <th>{slot.teamName}</th>
                {props.round.criteria.map((criteria,cindex) =><th key={cindex}><input type="number" name={`s${slot.number}-c${cindex}`} value={this.state[`s${slot.number}-c${cindex}`]} onChange={this.handleInput} min="0" max="10" /></th>)}
                <th>{this.state[`s${slot.number}-total`]||0}</th>
              </tr>
              )
            })
        }
      </tbody>
    </table>
        <div className="submit">
          <button onClick={this.confirmSubmit}>Submit</button>
        </div>
        <div className="dialog-background hide">
          <div className="dialog">
            <div className="header">Are you sure?</div>
            <div className="body">
              Once you submit you cannot change your scores, do you want to proceed?
            </div>
            <div className="options">
                <button className="left" onClick={this.handleSubmit}>Submit</button>
                <button className="right" onClick={this.hideDialog}>Cancel</button>
            </div>
          </div>
        </div>
    </>
  )
}
}

export {
  AutoCompleteInput,
  JudgeTable
}