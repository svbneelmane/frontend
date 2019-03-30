import React, { Component } from "react";
import { Button } from "../../commons/Form";
import Select from "react-select";
import { CriteriaCard } from "../../commons/Card";
import { TeamList } from "../../commons/List";
import judges from "../../services/judges";
import events from "../../services/events";
import { toast } from "../../actions/toastActions";


export default class Judge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      judgeOptions: [],
      judge: null,
      slots: [],
      selection: null,

      judgeSelected: false,
      criteria: [],

      ...JSON.parse(sessionStorage.getItem("scoresheet:" + this.props.round)) || {}
    };
  }

  componentWillMount = () => {
    judges.getAll().then(judges => this.setState({
      judgeOptions: judges.map(judge => ({ value: judge.id, label: judge.name }))
    }));
  };

  handleJudgeChange = (id) => {
    this.setState({
      judge: id,
    });
  };

  selectJudge = async () => {
    if (this.state.judge) {
      events.getSlots(this.props.event, this.props.round).then(slots => {
        slots.map(team =>  team.points = []);
        this.setState({
          slots,
          selection: slots[0] && slots[0].number
        });
      });

      events.getRound(this.props.event, this.props.round).then(round => {
        this.setState({ criteria: round.criteria });
      });

      this.setState({
        judgeSelected: true
      })
    }
  };

  handelCritriaChange = async (event) => {
    let { name, value } = event;

    if (value < 0 || value > 10) {
      return toast("Score cannot be above 10 or below 0");
    }

    let teams = this.state.slots;

    if (!teams[this.getSlotIndex(this.state.selection)].points.length) teams[this.getSlotIndex(this.state.selection)].points = new Array(this.state.criteria.length).fill(0);

    teams[this.getSlotIndex(this.state.selection)].points[name] = value;

    let total = 0;

    for (let score of this.state.slots[this.getSlotIndex(this.state.selection)].points) {
      if (score) total += parseInt(score);
    }

    teams[this.getSlotIndex(this.state.selection)].total = total;

    await this.setState({
      slots: teams
    }, () => {
      sessionStorage.setItem("scoresheet:" + this.props.round, JSON.stringify(this.state));
    })
  };

  changeTeam = (team) => {
    this.setState({
      selection: team.number,
    });
  };

  getSlotIndex = (number) => {
    let index = 0;
    for (let slot of this.state.slots) {
      if (slot.number === number) return index;
      index++;
    }
  }

  submitScore = async () => {
    let score = this.state.slots.map(team => ({
      judges: [{
        id: this.state.judge,
        points: team.points
      }],
      team: team.id,
      round: team.round,
    }));

    let response = await events.createScores(this.props.event, this.props.round, score);
    if (response) {
      sessionStorage.removeItem("scoresheet:" + this.props.round);
      // navigate("/events");
    }
  };


  render = () => (
    <div>
      {
        this.state.judgeSelected
        ? <div css={{
            display: "flex",
          }}>
            <div css={{
              width: "25%",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              flex: 1,
            }}>
              {
                this.state.slots.map((team, i) => (
                  <TeamList
                    key={ i }
                    score={ team.total || 0 }
                    slot={ "#" + team.number }
                    name={ team.team && team.team.name }
                    backgroundColor={ team.number === this.state.selection ? "rgba(255, 209, 0, .2)" : "" }
                    onClick={ () => this.changeTeam(team) }
                  />
                ))
              }
            </div>

            <div css={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              flex: 3,
            }}>
              <div css={{
                color: "#ff5800",
                fontSize: "1.5em"
              }}>
                { (this.state.slots.length && this.state.slots[this.getSlotIndex(this.state.selection)] && this.state.slots[this.getSlotIndex(this.state.selection)].total) || 0 } Points
              </div>

              <div css={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}>
                {
                  this.state.criteria.length === 0
                  ? <CriteriaCard
                      title="Score"
                      onChange={ this.handelCritriaChange }
                      value={ (this.state.selection && this.state.slots[this.getSlotIndex(this.state.selection)].points[0]) || 0 }
                      name={ 0 }
                    />
                  : this.state.criteria.map((criterion, i) => (
                      <CriteriaCard
                        key={ i }
                        title={ criterion }
                        onChange={ this.handelCritriaChange }
                        value={ (this.state.selection && this.state.slots[this.getSlotIndex(this.state.selection)].points[i]) || 0 }
                        name={ i }
                      />
                    ))
                }
              </div>

              <div>
                <Button styles={{ marginTop: 16, }} onClick={this.submitScore} >Submit</Button>
              </div>
            </div>
          </div>
        : <div css={{
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
                  // value={this.state.judge}
                  onChange={(selected) => this.handleJudgeChange(selected.value)}
                  options={this.state.judgeOptions}
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
                  disabled={!this.state.judge}
                  onClick={this.selectJudge}
                  styles={{ width: "100%" }}
                >Start Round</Button>
              </div>
            </div>
          </div>
      }
    </div>
  )
};
