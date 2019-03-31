import React from "react";
import html2canvas from 'html2canvas'

import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';
import Top from "../../images/top.png"
import Bottom from "../../images/bottom.png"

export default class extends React.Component {
  BUTTON_NORMAL = "Publish";
  BUTTON_CLICKED = "Publishing...";

  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);
    this.state = {
      event: {},
      leaderboard: [],
      published: false,
      button: this.BUTTON_NORMAL,
    };
  }

  getRank = (points) => {
    if (!this.state.leaderboard.length) return 0;

    let scores = Array.from(new Set(this.state.leaderboard.map(team => team.points)));
    return scores.indexOf(points) + 1;
  };

  componentWillMount = () => {
    eventService.get(this.props.event).then(event => this.setState({ event }));

    leaderboardService.getRound(this.props.event,this.props.round).then(lb => {
      this.setState({
        leaderboard: lb.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
      });
    });

    eventService.getRound(this.props.event, this.props.round).then(round => this.setState({ published: round.published }));

    leaderboardService.getRound(this.props.event, this.props.round).then(leaderboard => {
      this.setState({
        leaderboard: leaderboard.filter(slot => !slot.disqualified).sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
      });
    });
  }

  handlePublish = () => {
    this.setState({ button: this.BUTTON_CLICKED });

    eventService.publishRoundLeaderboard(this.props.event, this.props.round).then(status =>
      this.setState({
        published: !!status,
        button: this.BUTTON_NORMAL,
      })
    );
  }
  async componentDidMount(){
    let leaderboard = document.querySelector("#leaderboard");
    let canvas = await html2canvas(leaderboard);
    document.body.appendChild(canvas);
  }
  render = () => (
    <div id="leaderboard" css={{width:1000,background: "#eae8e3",margin:"auto"}}>
      <img src={Top} alt="top" style={{width:"100%"}}/>
      <div css={{textAlign:"center"}}>
        <h1 css={{color:"#900"}}>FIRST POSITION</h1>
        <h2>#2 KMC, Manipal</h2>
        <h2>#4 MIT, Manipal</h2>
      </div>
      <div css={{textAlign:"center"}}>
        <h1 css={{color:"#900"}}>SECOND POSITION</h1>
        <h2>#1 MCODS, Manipal</h2>
      </div>
      <div css={{textAlign:"center"}}>
        <h1 css={{color:"#900"}}>THIRD POSITION</h1>
        <h2>#7 SOIS, Manipal</h2>
      </div>
      <img src={Bottom} alt="top" style={{width:"100%"}}/>
    </div>
  );
};
