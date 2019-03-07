import React, { Component } from 'react';
import { AutoComplete, message } from 'antd';
import './style.css'
import constants from '../../utils/constants';
import { Button } from 'antd';
import { navigate } from 'gatsby';

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
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = JSON.parse(localStorage.getItem('JudgeTable'))||{};
}
handleInput(event){
  let {name,value} = event.target
  if(value<0||value>10){
    message.error("Score cannot be above 10 or below 0");
    return;
  }
  this.setState({[name]:value},()=>{
    let criteria = this.props.round.criteria;
    let slotNo = name.split('-')[0].replace("s","");
    let total =0;
    criteria.map((i,k)=>total+=Number(this.state[`s${slotNo}-c${k}`]||0));
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
async handleSubmit(){
 let scores= await this.props.slotData.map(slot=>{
  return{
    judges:[{
      id:JSON.parse(localStorage.getItem('Judge')).JudgeId,
      points:this.props.round.criteria.map((name,index)=>Number(this.state[`s${slot.number}-c${index}`]||0)),
    }],
    team:slot.team,
    round:slot.round,
  }
 });
 let response = await fetch(`${constants.server}/events/${this.props.round.event}/rounds/${this.props.round.id}/scores`,{
   method:"POST",
   headers:{
    'Content-Type':'application/json',
    'Accept':'application/json'
  },
   body:JSON.stringify(scores)
 });
 let json = await response.json();
 if(json){
   localStorage.setItem('JudgeTable','');
   localStorage.setItem('Judge','');
   navigate("/app/events")
 }
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
        <Button type="primary" onClick={this.confirmSubmit}>Submit</Button>
        </div>
        <div className="dialog-background hide">
          <div className="dialog">
            <div className="header">Are you sure?</div>
            <div className="body">
              Once you submit you cannot change your scores, do you want to proceed?
            </div>
            <div className="options">
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                <Button type="primary" ghost onClick={this.hideDialog}>Cancel</Button>
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