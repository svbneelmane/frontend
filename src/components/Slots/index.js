// TODO: This is just a temporary component to test login.

import React,{Component} from "react";
import './style.css';
import { Button } from "../../commons/Form";
import eventsService from "../../services/events";
import { navigate } from "gatsby";

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
    console.log("WORD",word);
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


  update(time);
}

export default class GenerateSlots extends Component {
  
  constructor(props){
    super(props);
    this.startSlotting=this.startSlotting.bind(this);
    this.deleteSlots=this.deleteSlots.bind(this);
    this.state={
      slotted:false,
      loaded:false,
      slottingStarted:false,
      columns:[],
      dataSource:[],
      slots:[]
    }
  }
  teams=[];
  async componentDidMount(){
    
    let slots = await eventsService.getSlots2(this.props.event,this.props.round);
    let event = await eventsService.get(this.props.event);
    console.log(event);
    this.setState({
      loaded:true,
      slotted:slots.length>0,
      slots,
      eventName:event.name
    });
  }


  async startSlotting(){
    let slottable = document.querySelector(".slottable");
    slottable.classList.add("rotate");

    let slots = await eventsService.createSlots2(this.props.event,this.props.round);
    this.setState({slots},()=>{
      setTimeout(()=>this.animate(0),2000);
    })
  }
    animate=(i)=>{
      if(i>=this.state.slots.length)
        return;
      let teamName = this.state.slots[i].teamName;
    let wordLen = teamName.length;
    let element = document.querySelector('#team-'+this.state.slots[i].number);
    let fps = 50;
    let timeOffset = 10;
    let tpc = timeOffset/fps;
    new WordShuffler(element,{
      textColor : '#000',
      timeOffset,
      fps,
      word:teamName,
      mixCapital : true,
      mixSpecialCharacters : true
    });
    console.log(element);
    this.scroll(element.offsetTop)
    setTimeout(()=>{
      this.animate(++i);
    },tpc*wordLen*1000);  
  };
  scroll(y){
    let slotWrapper = document.querySelector("#slotWrapper");
    console.log(slotWrapper);
    let currentY = slotWrapper.scrollTop;
    let part = (y-currentY)/100;
    let timer = setInterval(()=>{
      currentY = slotWrapper.scrollTop;
      if(currentY>=y)
        clearInterval(timer);
        slotWrapper.scrollTo(0,currentY+part);
    },10);
    setTimeout(()=>{
      clearInterval(timer)
    },1000)
  }
  notLoaded=()=>(<div>Please wait while we check for slots...</div>);
  async deleteSlots(){
      if(typeof(window)=="undefined")
        return;
      if(!window.confirm("Are you sure?"))
        return;
      console.log(this);
      await eventsService.deleteSlots2(this.props.event,this.props.round);
      
      navigate(`/events/${this.props.event}/rounds/`);
  }
  notSlotted=()=>(
    <div id="slotWrapper">
      <div className="slottable">
        <div id="intro">
            <h1>{this.state.eventName}</h1>
            <h2>Click to generate slots now</h2>
            
            <button className="slotButton" onClick={this.startSlotting}>START</button>
            <div><Button>View Teams</Button></div>
          </div>
          <div className="table">
          <table>
            <caption>Slots for {this.state.eventName}</caption>
            <thead>
              <tr><th>Slot. No. </th><th>Team Name</th></tr>
              </thead>
              <tbody>
              {
                this.state.slots.map((slot, k) => {
                  return (
                    <tr key={k}>
                      <th>{slot.number}</th>
                      <th id={"team-"+slot.number} ></th>
                    </tr>
                  )
                })
              }
              </tbody>
          </table>
         
          </div>
      </div>
      
    </div>);

  slotted=()=>(
    <div>
      <table className="afterSlotTable">
      <caption>Event</caption>
        <thead>
          <tr>
            <th>Slot No.</th>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.slots.map((slot,index)=><tr key={index}><td>{slot.number}</td><td>{slot.teamName}</td></tr>)}
        </tbody>
      </table>
      <div style={{textAlign:"center",padding:20}}>
      <Button onClick={this.deleteSlots}>Reslot</Button>
      </div>
    </div>);
  render=()=>
    this.state.loaded?
      (this.state.slotted?
          this.slotted()
          :this.notSlotted())
      :this.notLoaded();
}