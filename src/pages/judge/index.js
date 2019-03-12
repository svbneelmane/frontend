import React, { Component } from "react";
import { Button } from "../../commons/Form";
import Select from 'react-select';
import './style.css';
import { get } from '../../actions/judgeActions';
// import { getTeams } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';
import { CriteriaCard } from "../../commons/Card";
import { TeamList } from "../../commons/List";
export default class Judge extends Component {

  constructor(props) {
    super(props)
    this.state = {
      judgeOption: [],
      JudgeId: null,
      judgeSelected: false,
      totalPoint: 0
    }
  }

  componentWillMount = () => {
    get();
    store.subscribe(async () => {
      let data = await store.getState();
      let judge = [];
      judge = data.data.map(each => {
        return { value: each.id, label: each.name }
      });
      this.setState({
        judgeOption: judge,
      })

    });
  }

  handleJudgeChange = (value) => {
    this.setState({
      JudgeId: value,
    })
  }

  selectJudge = () => {

    this.setState({
      judgeSelected: true
    })
  }

  handelCritriaChange = () => {
    console.log("get")
  }

  render() {
    return (
      <div>

        <div
          css={{
            position: "relative",
            float: "right",
            margin: "16px"
          }}
        >{`${this.state.totalPoint} Points`}</div>
        {(this.state.judgeSelected) ?
          <div>
            <div
              css={{
                boxShadow: "0px 5px 12px -5px rgba(0, 0, 0, .1)",
                width: "25%",
                height: "94vh",
                display: "inline-block",
                backgroundColor: "#FFFFFF"
              }}
            >
              <TeamList title="hello" />
              <TeamList title="hello" />
            </div>
            <div css={{
              display: "inline-block",
              width: "",
              position: "absolute",
              marginTop: "32px"
            }}>
              <div>
                <CriteriaCard onChange={this.handelCritriaChange} title="Criteria 1" />
                <CriteriaCard onChange={this.handelCritriaChange} title="Criteria 2" />
                <CriteriaCard onChange={this.handelCritriaChange} title="Criteria 3" />
                <CriteriaCard onChange={this.handelCritriaChange} title="Criteria 4" />
              </div>
              <div>
                <Button styles={{
                  display: "inline-block",
                  margin: "16px",
                  backgroundColor: "white",
                  color: "black",
                }}>Prev</Button>
                <Button styles={{ display: "inline-block" }}>Next</Button>
              </div>
            </div>
          </div>
          :
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
                  onChange={(selected) => this.handleJudgeChange(selected.value)}
                  options={this.state.judgeOption}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      marginBottom: 10,
                      border: state.isFocused ? "1px solid #ffd100" : "1px solid rgba(0, 0, 0, .1)",
                      boxShadow: state.isFocused ? "0 3px 10px -5px rgba(0, 0, 0, .3)" : "",
                      ":hover": {
                        border: "1px solid #ff5800",
                        boxShadow: "0 3px 10px -5px rgba(0, 0, 0, .3)",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#ff5800" : "",
                      ":hover": {
                        backgroundColor: "#ffd100",
                        color: "black",
                      },
                    }),
                  }}
                  css={{
                    marginBottom: "16px",
                  }}
                  isSearchable={true}
                  name="Judge"
                />

              </div>
              <div>
                <Button
                  onClick={this.selectJudge}
                  styles={{ width: "100%" }}> Start Round </Button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
