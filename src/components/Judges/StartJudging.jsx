import React, { Component } from "react";
import { Button } from "../../commons/Form";
import Select from 'react-select';
import { get } from '../../actions/judgeActions';
// import { getTeams } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';
import { CriteriaCard } from "../../commons/Card";
import { TeamList } from "../../commons/List";
import events from "../../services/events";
import { toast } from "../../actions/toastActions";
import { navigate } from 'gatsby';

export default class Judge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noteWidth: 0,
      judgeOption: [],
      JudgeId: null,
      judgeSelected: false,
      criteria: [],
      selectedSlot: null,
      idx: 0,
      ...JSON.parse(sessionStorage.getItem('judgeScoresheet'))||{}
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

    console.log(this.state)
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
    if(value<0||value>10){
      toast("Score cannot be above 10 or below 0");
      return;
    }
    await this.setState({ [name]: value }, () => {
      let slotNo = this.state.selectedSlot;
      let total = 0;
      this.state.criteria.map((i, k) => total += Number(this.state[`s${slotNo}-c${k}`] || 0));
      this.setState({
        [`${slotNo}-total`]: total
      }, () => {
        sessionStorage.setItem('judgeScoresheet',JSON.stringify(this.state));
      });
    })
  }

  nextTeam = async () => {
    let idx = this.state.idx + 1
    if (idx != this.data.length) {
      await this.setState({
        idx: idx,
      })
      this.setState({ selectedSlot: this.data[this.state.idx].number })
    }
  }

  prevTeam = async () => {
    let idx = this.state.idx - 1;
    if (idx >= 0) {
      await this.setState({
        idx: idx,
      })
      this.setState({ selectedSlot: this.data[this.state.idx].number })
    }
  }
  changeTeam = (e) => {
    let slot = e.target.id.substring(1);
    this.setState({
      selectedSlot: slot
    })
  }

  toggleNote = () => {
    if(this.state.noteWidth === 0){
      this.setState({
        noteWidth : 350,
      })
    } else {
      this.setState({
        noteWidth : 0,
      })
    }
  }

  submitScore = async () => {
    let score = await this.data.map(slot=>{
      return{
        judges:[{
          id: this.state.JudgeId,
          points:this.state.criteria.map((each,i)=>Number(this.state[`s${slot.number}-c${i}`]||0)),
        }],
        team:slot.team,
        round:slot.round,
      }
    });

    let response = events.createScores(this.props.event, this.props.round, score)
    if(response){
      sessionStorage.removeItem('judgeScoresheet');
      navigate("/app/events");
   }
  }

  render() {
    return (
      <div>
        {(this.state.judgeSelected) ?
          <div>
            <div
            css={{
              position: "relative",
              float: "right",
              margin: "16px",
              fontSize: "1.3em"
            }}
          >{this.state[`${this.state.selectedSlot}-total`] || 0} Points</div>
          <div css={{
            position:"absolute",
            right: 0,
            zIndex: 10,
            marginTop: "70px",
          }}>
            <div onClick={this.toggleNote}
              css={{
              padding: "4px 8px",
              backgroundColor: "#ff5800",
              color: "#FFFFFF",
              borderRadius:"5px",
              display: "inline-block",
              verticalAlign: "top",
            }}>{(this.state.noteWidth) ? "Close" : "Notes"}
            </div> 
            <div css={{
              backgroundColor: "red",
              height: "250px",
              width: this.state.noteWidth,
              display: "inline-block",
              transition: "1s",
              overflow : "hidden"
            }}>
              <textarea onChange={this.handelNoteChange} css={{
                height: "100%",
                width: "100%",
                resize : "none",
              }}></textarea>
            </div>
          </div>
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
                  <TeamList backgroundColor={(each.number == this.state.selectedSlot) ? "#EEEEEE" : "#FFFFFF"} onClick={this.changeTeam} key={i} slot={`#${each.number}`} name={each.name} />
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
                    <CriteriaCard value={this.state[`s${this.state.selectedSlot}-c${i}`] | 0} name={`s${this.state.selectedSlot}-c${i}`} key={i} onChange={this.handelCritriaChange} title={each} />
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
                <Button styles={{ float: "right",marginTop: "16px", marginRight: "16px" }} onClick={this.submitScore} >Submit</Button>
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
