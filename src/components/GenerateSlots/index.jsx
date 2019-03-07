// TODO: This is just a temporary component to test login.

import React,{Component} from "react";
import constants from '../../utils/constants';
import './style.css';
import {Table} from "antd";

function WordShuffler(holder,opt){
  var that = this;
  var time = 0;
  this.then = Date.now();
  
  this.currentTimeOffset = 0;
  
  this.word = null;
  this.currentWord = null;
  this.currentCharacter = 0;
  this.currentWordLength = 0;


  var options = {
    fps : 20,
    timeOffset : 5,
    textColor : '#000',
    fontSize : "50px",
    useCanvas : false,
    mixCapital : false,
    mixSpecialCharacters : false,
    needUpdate : true,
    colors : [
      '#f44336','#e91e63','#9c27b0',
      '#673ab7','#3f51b5','#2196f3',
      '#03a9f4','#00bcd4','#009688',
      '#4caf50','#8bc34a','#cddc39',
      '#ffeb3b','#ffc107','#ff9800',
      '#ff5722','#795548','#9e9e9e',
      '#607d8b'
    ]
  }

  if(typeof opt != "undefined"){
    for(let key in opt){
      options[key] = opt[key];
    }
  }


  
  this.needUpdate = true;
  this.fps = options.fps;
  this.interval = 1000/this.fps;
  this.timeOffset = options.timeOffset;
  this.textColor = options.textColor;
  this.fontSize = options.fontSize;
  this.mixCapital = options.mixCapital;
  this.mixSpecialCharacters = options.mixSpecialCharacters;
  this.colors = options.colors;

   this.useCanvas = options.useCanvas;
  
  this.chars = [
    'A','B','C','D',
    'E','F','G','H',
    'I','J','K','L',
    'M','N','O','P',
    'Q','R','S','T',
    'U','V','W','X',
    'Y','Z'
  ];
  this.specialCharacters = [
    '!','§','$','%',
    '&','/','(',')',
    '=','?','_','<',
    '>','^','°','*',
    '#','-',':',';','~'
  ]

  if(this.mixSpecialCharacters){
    this.chars = this.chars.concat(this.specialCharacters);
  }

  this.getRandomColor = function () {
    var randNum = Math.floor( Math.random() * this.colors.length );
    return this.colors[randNum];
  }

  //if Canvas
 
  this.position = {
    x : 0,
    y : 50
  }

  //if DOM
  if(typeof holder != "undefined"){
    this.holder = holder;
  }

  if(!this.useCanvas && typeof this.holder == "undefined"){
    console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
  }


  this.getRandCharacter = function(characterToReplace){    
    if(characterToReplace === " "){
      return ' ';
    }
    var randNum = Math.floor(Math.random() * this.chars.length);
    var lowChoice =  -.5 + Math.random();
    var picketCharacter = this.chars[randNum];
    var choosen = picketCharacter.toLowerCase();
    if(this.mixCapital){
      choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
    }
    return choosen;
    
  }

  this.writeWord = function(word){
    this.word = word;
    this.currentWord = word.split('');
    this.currentWordLength = this.currentWord.length;

  }

  this.generateSingleCharacter = function (color,character) {
    var span = document.createElement('span');
    span.style.color = color;
    span.innerHTML = character;
    return span;
  }

  this.updateCharacter = function (time) {
    
      this.now = Date.now();
      this.delta = this.now - this.then;

       

      if (this.delta > this.interval) {
        this.currentTimeOffset++;
      
        var word = [];

        if(this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength){
          this.currentCharacter++;
          this.currentTimeOffset = 0;
        }
        for(var k=0;k<this.currentCharacter;k++){
          word.push(this.currentWord[k]);
        }

        for(var i=0;i<this.currentWordLength - this.currentCharacter;i++){
          word.push(this.getRandCharacter(this.currentWord[this.currentCharacter+i]));
        }


        if(that.useCanvas){
         
        }else{

          if(that.currentCharacter === that.currentWordLength){
            that.needUpdate = false;
          }
          this.holder.innerHTML = '';
          word.forEach(function (w,index) {
            var color = null
            if(index > that.currentCharacter){
              color = that.getRandomColor();
            }else{
              color = that.textColor;
            }
            that.holder.appendChild(that.generateSingleCharacter(color, w));
          }); 
        }
        this.then = this.now - (this.delta % this.interval);
      }
  }

  this.restart = function () {
    this.currentCharacter = 0;
    this.needUpdate = true;
  }

  function update(time) {
    time++;
    if(that.needUpdate){
      that.updateCharacter(time);
    }
    requestAnimationFrame(update);
  }

  this.writeWord(options.word);


  //console.log(this.currentWord);
  update(time);
}






export default class GenerateSlots extends Component {
  state={
    slotted:false,
    loaded:false,
    slottingStarted:false,
    columns:[],
    dataSource:[],
    slots:[]
  }
  constructor(props){
    super(props);
    this.startSlotting=this.startSlotting.bind(this);
  }
  teams=[];
  async componentDidMount(){
    /**
     * TODO: Fetch teams from server (in slotted order)
     */
    let response =  await fetch(constants.server + `/events/${this.props.event}/rounds/${this.props.round}/slots`);
    let json = await response.json();
    console.log('json',json);
    let dataSource=[],columns=[];
    ///:event/rounds/:round/slots
    if(json.data.length===0){
      
    }
    else{
      columns = [{
        title: 'Slot No.',
        dataIndex: 'slot',
        key: 'slot',
      }, {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
      }];
      
      dataSource = json.data.map((data,k)=>{
        console.log(data);
        return {
          key: k,
          slot:data.number,
          team:data.teamName
        }
      })
      
      
    }
    this.setState({
      loaded:true,
      slotted:json.data.length>0,
      columns,
      dataSource
    });
  }
  async startSlotting(){
    console.log(this);
    let slottable = document.querySelector(".slottable");
    slottable.classList.add("rotate");
    let response =  await fetch(constants.server + `/events/${this.props.event}/rounds/${this.props.round}/slots`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    let json = await response.json();
    let slots = json.data;
    
    this.setState({slots},()=>{
      setTimeout(()=>this.animate(0),2000);
    })
  }
    animate=(i)=>{
      if(i>=this.state.slots.length)
        return;
      console.log(this.state.slots[i]);
    let wordLen = this.state.slots[i].name.length;
    let fps = 50;
    let timeOffset = 10;
    let tpc = timeOffset/fps;
    console.log(document.querySelector('#team-'+this.state.slots[i].number),this.state.slots[i].name);
    new WordShuffler(document.querySelector('#team-'+this.state.slots[i].number),{
      textColor : '#000',
      timeOffset,
      fps,
      word:this.state.slots[i].name,
      mixCapital : true,
      mixSpecialCharacters : true
    });  
    setTimeout(()=>{this.animate(++i)},tpc*wordLen*1000);  
  };
  notLoaded=()=>(<div>Please wait while we check for slots...</div>);

  notSlotted=()=>(
    <div id="slotWrapper">
      <div className="slottable">
        <div id="intro">
            <h1>Click to generate slots now</h1>
            
            <button className="slotButton" onClick={this.startSlotting}>START</button>
          </div>
          <div className="table">
          <table>
            <caption>Slots for the event</caption>
            <thead>
              <tr><th>Slot. No. </th><th>Team Name</th></tr>
              </thead>
              <tbody>
              {
                this.state.slots.map((slot, k) => {
                  return (
                    <tr key={k}>
                      <th>{slot.number}</th>
                      <th id={"team-"+slot.number} >{slot.teamName}</th>
                    </tr>
                  )
                })
              }
              </tbody>
          </table>
          </div>
      </div>
      
    </div>);
  componentDidUpdate(){
    console.log(this);
  }
  slotted=()=>(
    <div>
      <Table dataSource={this.state.dataSource} columns={this.state.columns} />
    </div>);
  render=()=>
    this.state.loaded?
      (this.state.slotted?
          this.slotted()
          :this.notSlotted())
      :this.notLoaded();
    

}