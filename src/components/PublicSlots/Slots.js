import React from "react";
import Select from "react-select";

import eventsService from "../../services/events";
import LBList from "../../commons/LBList";

export default class extends React.Component {
  constructor(props){
    super(props);

    this.slots = [];

    this.state = {
      loaded: false,
      event: {},
      round: null,
      roundOptions: [],
      slots: [],
      slotted: false,
    }
  }

  componentWillMount() {
    eventsService.get(this.props.event).then(event =>
      this.setState({
        event,
        round: event.rounds[0],
        roundOptions: event.rounds.map((round, i) => ({
          label: "Round " + (i + 1),
          value: round,
        }))
      }, () =>
        eventsService.getSlots2(this.props.event, this.state.round).then(slots =>
          this.setState({ slotted: !!slots.length, slots }, () =>
            this.setState({ loaded: true })
          )
        )
      )
    );
  }

  handleRoundChange = (e) => {
    this.setState(
      { round: e.value, loaded: false, },
      () =>
        eventsService.getSlots2(this.props.event, this.state.round).then(slots =>
          this.setState({ slotted: !!slots.length, slots }, () =>
            this.setState({ loaded: true })
          )
        )
    );
  }

  render = () => (
    <div>
      <div css={{
        textAlign: "center",
        marginBottom: 30,
      }}>
        <h2>
          { this.state.event.name } Slots
        </h2>
        <div>
          <Select
            isSearchable={ false }
            name="round"
            placeholder="Select Round"
            value={{ label: "Round " + (this.state.event.rounds && (this.state.event.rounds.indexOf(this.state.round) + 1)), value: this.state.round }}
            options={ this.state.roundOptions }
            onChange={ (e) => this.handleRoundChange(e) }
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
            css = {{
              fontSize: "16px",
              width: 200,
              display:'inline-block'
            }}
          />
        </div>
      </div>

      <div>
        {
          this.state.loaded
          ? this.state.slotted
            ? <div>
                <div>
                  {
                    this.state.slots.map((slot, i) =>
                      <LBList
                        key={ i }
                        position={ slot.number }
                        title={ slot.teamName }
                      />
                    )
                  }
                </div>
              </div>
            : <div css={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <h2>{ this.state.event.name }</h2>
                <div css={{ color: "rgba(0, 0, 0, .5)" }}>
                  Teams haven't been slotted for Round { this.state.event.rounds && (this.state.event.rounds.indexOf(this.state.round) + 1) }
                </div>
                <p css={{ color: "green" }}>Please contact the organizers if this is a mistake.</p>
              </div>
          : <div css={{ textAlign: "center", }}>Please wait while we check for slots...</div>
        }
      </div>
    </div>
  );
};
