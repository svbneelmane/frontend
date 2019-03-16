import React, { Component } from "react";
import { Button } from "../../commons/Form";
import Select from 'react-select';
import { get } from '../../actions/judgeActions';
// import { getTeams } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';
import { CriteriaCard } from "../../commons/Card";
import { TeamList } from "../../commons/List";
import events from "../../services/events"
export default class Judge extends Component {



  constructor(props) {
    super(props)
    this.state = {
      judgeOption: [],
      JudgeId: null,
      judgeSelected: false,
      totalPoint: 0,
      teams: [],
      criteria: [],
      score: [],
      selectedSlot: null,
      idx : 0
    }
    this.data = [{
      id: "a",
      number: 4,
      round: "5c894e1fba1190463e34ab9d",
      team: "5c8aa179b002c22001a36388",
      name: "PSPH (Team A)"
    }, {
      id: "b",
      number: 1,
      round: "5c894e1fba1190463e34ab9d",
      team: "5c8aa6e7d0a1c52283f72645",
      name: "MCODS (Team A)"
    }, {
      id: "c",
      number: 5,
      round: "5c894e1fba1190463e34ab9d",
      team: "5c8aa6e7d0a1c52283f72647",
      name: "KMC (Team A)"
    }, {
      id: "d",
      number: 3,
      round: "5c894e1fba1190463e34ab9d",
      team: "5c8ab453a5fe9d244ef0676c",
      name: "SOAHS (Team A)"
    }, {
      id: "e",
      number: 2,
      round: "5c894e1fba1190463e34ab9d",
      team: "5c8ab453a5fe9d244ef0676f",
      name: "SOAHS (Team B)"
    }]
  }

  componentWillMount = () => {
    get();
    store.subscribe(async () => {
      let data = await store.getState();
      let judge = [];
      judge = data.data.list.map(each => {
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
    if (this.state.JudgeId) {
      this.setState({
        judgeSelected: true
      })
      // events.getTeamsByRound(this.props.event, this.props.round).then(teams => {
      //   this.setState({ teams: teams });
      // })
      this.setState({ selectedSlot: this.data[this.state.idx].number })
      events.getRound(this.props.event, this.props.round).then(round => {
        this.setState({ criteria: round.criteria });
      })
    }
  }

  handelCritriaChange = async (event) => {
    let { name, value } = event;
    await this.setState({ [name]: value }, () => {
      let slotNo = this.state.selectedSlot;
      let total = 0;
      this.state.criteria.map((i, k) => total += Number(this.state[`s${slotNo}-c${k}`] || 0));
      this.setState({
        [`s${slotNo}-total`]: total
      })
    })
  }

  nextTeam = async () => {
    let idx = this.state.idx + 1
    if(idx != this.data.length){
      await this.setState({
        idx : idx,
      })
      this.setState({ selectedSlot: this.data[this.state.idx].number })
   }
  }

  prevTeam = async () => {
    let idx = this.state.idx - 1;
    if(idx >= 0){
      await this.setState({
        idx : idx,
      })
      this.setState({ selectedSlot: this.data[this.state.idx].number })
    }
  }
  changeTeam = (e) => {

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
        >{this.state[`s${this.state.selectedSlot}-total`] || 0} Points</div>
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
              {this.data.map((each, i) => {
                return (
                  <TeamList backgroundColor={(each.number == this.state.selectedSlot)? "#EEEEEE" : "#FFFFFF"} onClick={this.changeTeam} key={i} slot={`#${each.number}`} name={each.name} />
                );
              })}
            </div>
            <div css={{
              display: "inline-block",
              width: "",
              position: "absolute",
              marginTop: "32px"
            }}>
              <div>
                {this.state.criteria.map((each, i) => {
                  return (
                    <CriteriaCard name={`s${this.state.selectedSlot}-c${i}`} key={i} onChange={this.handelCritriaChange} title={each} />
                  );
                })}
              </div>
              <div>
                <Button
                  onClick={this.prevTeam}
                  styles={{
                  display: "inline-block",
                  margin: "16px",
                  backgroundColor: "white",
                  color: "black",
                }}>Prev</Button>
                <Button onClick={this.nextTeam} styles={{ display: "inline-block" }}>Next</Button>
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
                  disabled={!this.state.JudgeId}
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
