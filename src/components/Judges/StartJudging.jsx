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


export default class Judge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmBox : false,
      noteWidth: 0,
      judgeOption: [],
      JudgeId: null,
      judgeSelected: false,
      criteria: [],
      selectedSlot: null,
      idx: 0,
      teams: [],
      ...JSON.parse(sessionStorage.getItem('judgeScoresheet')) || {}
    }
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

  selectJudge = async () => {
    if (this.state.JudgeId) {
      await events.getSlots2(this.props.event, this.props.round).then(async teams => {
        teams.map(each => { each.score = {} })
        await this.setState({ teams: teams });
        console.log(teams)
      })
      await events.getRound(this.props.event, this.props.round).then(round => {
        this.setState({ criteria: round.criteria });
      })
      this.setState({ selectedSlot: this.state.teams[this.state.idx].number })
      this.setState({
        judgeSelected: true
      })
    }
  }

  handelCritriaChange = async (event) => {
    let { name, value } = event;

    if (value < 0 || value > 10) {
      toast("Score cannot be above 10 or below 0");
      return;
    }
    let teams = await this.state.teams;
    let slotNo = this.state.selectedSlot;
    teams[slotNo - 1].score = { ...teams[slotNo - 1].score, [name.substr(name.indexOf('c'))]: value }
    let total = 0;

    Object.values(this.state.teams[slotNo - 1].score).map((each) => {
      total += parseInt(each);
    });

    teams[slotNo - 1].total = total;

    await this.setState({
      teams
    }, () => {
      sessionStorage.setItem('judgeScoresheet', JSON.stringify(this.state));
    })
  }

  nextTeam = async () => {
    let idx = this.state.idx + 1
    if (idx != this.state.teams.length) {
      await this.setState({
        idx: idx,
      })
      this.setState({ selectedSlot: this.state.teams[this.state.idx].number })
    }
  }

  prevTeam = async () => {
    let idx = this.state.idx - 1;
    if (idx >= 0) {
      await this.setState({
        idx: idx,
      })
      this.setState({ selectedSlot: this.state.teams[this.state.idx].number })
    }
  }
  changeTeam = (e) => {
    let slot = e.target.id.substring(1);
    this.setState({
      selectedSlot: slot,
      idx: slot - 1
    })
  }

  toggleNote = () => {
    if (this.state.noteWidth === 0) {
      this.setState({
        noteWidth: 350,
      })
    } else {
      this.setState({
        noteWidth: 0,
      })
    }
  }

  toggleConfirmBox = () => {
    if(this.state.showConfirmBox){
      this.setState({ showConfirmBox : false })
    } else {
      this.setState({ showConfirmBox : true })
    }
  }

  submitScore = async () => {
    let score = await this.state.teams.map(each => {
      return {
        judges: [{
          id: this.state.JudgeId,
          points: each.total | 0
        }],
        team: each.id,
        round: each.round,
      }
    });

    let response = await events.createScores(this.props.event, this.props.round, score);
    if (response) {
      sessionStorage.removeItem('judgeScoresheet');
      // navigate("/events");
    }
  }



  render() {
    return (
      <div>
        {(this.state.showConfirmBox) ?
          <div
            css={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              left: "0px",
              top: "60px",
              zIndex: 2,
              backgroundColor: "rgba(0,0,0,0.4)"
            }}
          >
            <div css={{
              padding: "16px",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              left: "50%",
              top: "50%",
              boxShadow: "0px 5px 20px -4px rgba(0, 0, 0, .1)",
              maxWidth: "400px",
              transform: "translate(-50%, -50%)",
              borderRadius: 5
            }}>
              <div css={{
                textAlign: "center",

              }}>Are you sure ?</div>
              <div css={{
                textAlign: "center",
                color: "rgba(0,0,0,0.6)",
                marginTop: "8px"
              }}> Once you submit you cannot change the scores </div>
              <div css={{
                paddingTop: "16px",
                textAlign: "center"
              }}>
                <Button onClick={this.toggleConfirmBox} styles={{ marginRight: "8%", backgroundColor: "#ffffff", color: "#000000" }}>Cancel</Button>
                <Button onClick={this.submitScore} styles={{ marginLeft: "8%" }}>Submit</Button>
              </div>
            </div>
          </div>
          :
          null
        }

        {(this.state.judgeSelected) ?
          <div>
            <div
              css={{
                position: "relative",
                float: "right",
                margin: "16px",
                fontSize: "1.3em"
              }}
            >{this.state.teams[this.state.selectedSlot - 1].total | 0} Points</div>
            <div css={{
              position: "absolute",
              right: 0,
              zIndex: 1,
              marginTop: "70px",
            }}>
              <div onClick={this.toggleNote}
                css={{
                  padding: "4px 8px",
                  backgroundColor: "#ff5800",
                  color: "#FFFFFF",
                  borderRadius: "5px",
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
                overflow: "hidden"
              }}>
                <textarea onChange={this.handelNoteChange} css={{
                  height: "100%",
                  width: "100%",
                  resize: "none",
                }}></textarea>
              </div>
            </div>
            <div
              css={{
                // boxShadow: "0px 5px 12px -5px rgba(0, 0, 0, .1)",
                width: "25%",
                height: "94vh",
                display: "inline-block",
                backgroundColor: "#FFFFFF",
                overflow: "scroll"
              }}
            >
              {this.state.teams.map((each, i) => {
                return (
                  <TeamList score={each.total || 0} backgroundColor={(each.number == this.state.selectedSlot) ? "#EEEEEE" : "#FFFFFF"} onClick={this.changeTeam} key={i} slot={`#${each.number}`} name={each.teamName} />
                );
              })}
            </div>
            <div css={{
              display: "inline-block",
              position: "absolute",
              marginTop: "32px",
            }}>
              <div>
                {(this.state.criteria.length == 0) ?
                  <div css={{
                    left: "50%",
                    position: "relative",
                    transform: "translateX(-25%)",
                    marginTop: "50px"
                  }}>
                    <CriteriaCard value={this.state.teams[this.state.selectedSlot - 1].score[`c${0}`] | 0} name={`s${this.state.selectedSlot}-c${0}`} onChange={this.handelCritriaChange} title={"Score"} />
                  </div>
                  :
                  this.state.criteria.map((each, i) => {
                    return (
                      <CriteriaCard value={this.state.teams[this.state.selectedSlot - 1].score[`c${i}`] | 0} name={`s${this.state.selectedSlot}-c${i}`} key={i} onChange={this.handelCritriaChange} title={each} />
                    );
                  })
                }
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
                <Button styles={{ float: "right", marginTop: "16px", marginRight: "18px" }} onClick={this.toggleConfirmBox} >Submit</Button>
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
