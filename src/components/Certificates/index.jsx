import React from "react";

import collegesService from "../../services/colleges";
import { getUser } from "../../services/userServices";
import request from '../../utils/request';
import certificateURL from '../../images/participation-certificate.jpg'
import JSZip from "jszip";

export default class Certificates extends React.Component {
  state = {
    college: {},
    events: [],
    teams: {},
    buttonName:"Download All"
  };

  constructor(props){
    super(props);
    this.downloadAll=this.downloadAll.bind(this);
  }
  componentWillMount() {
    let user = getUser();

    collegesService.get(user.college).then(college => this.setState({ college }));

    collegesService.getTeams(user.college).then(teams => {
      let sortedTeams = {};

      collegesService.getParticipants(user.college).then(participants => {
        for (let team of teams) {
          let members = participants.filter(member => team.members.includes(member.id));
          team.members = members;
        }

        let events = Array.from(new Set(teams.map(team => team.event.name)));

        for (let event of events) {
          sortedTeams[event] = teams.filter(team => team.event.name === event);
        }

        this.setState({
          events,
          teams: sortedTeams,
        });
      });
    });
  }
   download(member,event){
     const canvas = document.createElement("canvas");
     const context = canvas.getContext("2d");
     const image = new Image();
     const link = document.createElement('a');
     image.onload=()=>{
        canvas.width=image.width;
        canvas.height=image.height;
        context.drawImage(image,0,0);
        context.font = "45px Segoe UI";
        context.fillStyle = "#555";
        context.textAlign = "center";

        // INFO: Adjust position of the participant name according to the image
        context.fillText(member.name, (canvas.width / 2)+100, 460);

        // INFO: Adjust position of the college name according to the image
        context.fillText(event,(canvas.width / 2)+100, 670);
        link.download=member.name+" - "+event+".png"
        canvas.toBlob(function(blob){
          link.href = URL.createObjectURL(blob);
          console.log(blob);
          console.log(link.href);
          link.type="hidden";
          document.body.append(link);
          link.click();
          link.remove(); // this line should be here
        },'image/png');
        //
       
        //
     };
     image.src=certificateURL;
    //  Array.from(document.querySelector(".output").children).forEach(item=>item.remove());
    //  document.querySelector(".output").append(canvas);
    console.log(certificateURL);
  }
  async downloadAll(){
    let list = Object.values(this.state.teams).flat().map(i=>{
      i.members.forEach(j=>j.event=i.event.name);
      return i.members}).flat();

    let total=list.length;
    let processing=0;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    const link = document.createElement('a');
    let result = [];
    for(let i=0;i<total;i++){
      image.src=certificateURL;
      const blob = await new Promise((resolve,reject)=>{
        image.onload=()=>{
        canvas.width=image.width;
        canvas.height=image.height;
        context.drawImage(image,0,0);
        context.font = "45px Segoe UI";
        context.fillStyle = "#555";
        context.textAlign = "center";

        // INFO: Adjust position of the participant name according to the image
        context.fillText(list[i].name, (canvas.width / 2)+100, 460);

        // INFO: Adjust position of the college name according to the image
        context.fillText(list[i].event,(canvas.width / 2)+100, 670);
        
        canvas.toBlob((blob)=>{
          processing++;
          this.setState({buttonName:`Processing ${Math.round(processing/total*100)}%...`});
          resolve(blob)
        },'image/png');
       
        };
      });
      result.push({
        filename: list[i].name+" - "+list[i].registrationID+" - "+list[i].event+".png",
        blob,
        event: list[i].event
      });
    }
    console.log(result);
    let zip = new JSZip();
    result.map(i=>{
      zip.folder(i.event).file(i.filename,i.blob);
    })
    this.setState({buttonName:`Zipping...`});
    zip.generateAsync({type:"blob"})
      .then((content)=> {
          // see FileSaver.js
          link.download = this.state.college.name
          link.href = URL.createObjectURL(content);
          link.type="hidden";
          document.body.append(link);
          link.click();
          link.remove();
          this.setState({buttonName:"Download All"}); // this line should be here
      });
    
  }
  render = () => {
    console.log(this.state);
    return (
      <div>
        <div>
          <h2>Participation Certificates</h2>
        </div>
        <div className="output">

        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Register Number</th>
              <th>Name</th>
              <th>Event</th>
    <th><button onClick={this.downloadAll}>{this.state.buttonName}</button></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.events.map((event,i)=>(
                this.state.teams[event].map((team,j)=>(
                  team.members.map((member,k)=>(<tr key={`${i}.${j}.${k}`}>
                    <td>{member.registrationID}</td>
                                    <td>{member.name}</td>
                  <td>{event}</td>
                  <td><button onClick={()=>this.download(member,event)}>Download</button></td>
                                  </tr>))
                ))
              ))
            }
          </tbody>
        </table>
        
      </div>
    );
  }
};
