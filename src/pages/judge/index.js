import React, { Component } from "react";
import { Button } from "../../commons/Form";
import Select from 'react-select';
import './style.css';
import { get } from '../../actions/judgeActions';
import store from '../../reducers/commonReducer';

export default class Judge extends Component {

  constructor(props){
    super(props)
    this.state = {
      judgeOption : [],
      JudgeId: null
    }
    
  }

  state = {
    college:null,
    type:null
  }
  judges = [
    { value: 'Abid Hussan', label: 'Abid Hussain' },
    { value: 'Adarsh Bhalotia', label: 'Adarsh Bhalotia' },
    { value: 'Siddhant Jain', label: 'Siddhant Jain' }
  ];


  componentWillMount = () => {
    get();
    store.subscribe(async () => {
      let data = await store.getState();
      let judge = [];
      judge = data.data.map(each => {
        return {value : each.id, label : each.name}
      });
      this.setState({
        judgeOption : judge,
      })

    });
  }

  handleChange = (value) => {
    this.setState({
      JudgeId: value,
    })
  }

  render() {
    return (
      <div css={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div css={{
          width: 350,
          padding: 20,
          borderRadius: 5,
          boxShadow: "0 10px 50px -10px rgba(0, 0, 0, .2)",
        }}>
          <div css={{
            textAlign: "center",
            marginBottom: "16px",
          }}>Select Judge</div>
          <div css={{
            display: "flex",
            flexDirection: "column",
          }}>
            <Select
              value={this.state.Judge}
              onChange={(selected) => this.handleChange(selected.value)}
              options={this.state.judgeOption}
              className="test"
              css={{
                marginBottom: "16px",
              }}
              isSearchable={true}
              name="Judge"
            />
            
          </div>
          <div>
            <Button
              styles={{ width: "100%" }}> Start Round </Button>
          </div>
        </div>
      </div>
    )
  }
}
