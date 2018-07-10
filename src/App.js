import React, { Component } from 'react';
import './App.css';

class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rot: 0,
      value: 'default',
      faceValue: [
        this.props.value, '', '', '',
      ],
    }
  }
  change(newValue) {
    if (newValue === this.state.value)
       return;
    var newFaces = this.state.faceValue;
    newFaces[(this.getFace() + 1) % 4] = newValue;
    this.setState({value: newValue, rot: (this.state.rot - 90)});
  }
  getFace() {
    return Math.abs(this.state.rot / 90) % 4;
  }
  render() {
    var myStyle = {
      transform: 'rotateX('+this.state.rot+'deg)',
    };
    return (
        <div className="cube" id="cube" style={myStyle}>
          <div className="face face-front" id="front">{this.state.faceValue[0]}</div>
          <div className="face face-top" id='top'>{this.state.faceValue[1]}</div>
          <div className="face face-back" id='back'>{this.state.faceValue[2]}</div>
          <div className="face face-bottom" id='bottom'>{this.state.faceValue[3]}</div>
        </div>
      );
  }
}
class CubeClock extends Component {
  constructor(props) {
    super(props);
    this.cubeHour = React.createRef();
    this.cubeMin = React.createRef();
    this.cubeSec = React.createRef();
    this.cubeTod = React.createRef();

    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => {this.tick();}, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({date: new Date()});
    this.cubeHour.current.change(pad(this.state.date.getHours() - 12));
    this.cubeMin.current.change(pad(this.state.date.getMinutes()));
    this.cubeSec.current.change(pad(this.state.date.getSeconds()));
    this.cubeTod.current.change(tod(this.state.date));
  }
  render() {
    return (
      <div className="clock-wrap">
      <div className="clock">
        <Cube ref={this.cubeHour} value={pad(this.state.date.getHours() - 12)} />
        <Cube ref={this.cubeMin} value={pad(this.state.date.getMinutes())} />
        <Cube ref={this.cubeSec} value={pad(this.state.date.getSeconds())} />
        <Cube ref={this.cubeTod} value={tod(this.state.date)} />
      </div>
      </div>
     );
  }
}

const phrases_morning = ['Nothing a cup o\' Joe won\'t fix', 'Smile - it\'s a new day', 'Good morning', 'Top o\' the morning'];
const phrases_afternoon = ['Over halfway there!', 'Good afternoon'];
const phrases_evening = ['The night is young','Sweet dreams', 'Good evening'];

function PhraseMachine(props) {
  let d = new Date();
  let arr = null;
  if (d.getHours() < 12) {
    arr = phrases_morning;
  } else {
    arr = d.getHours() < 18 ? phrases_afternoon : phrases_evening;
  }
  let index = Math.floor(Math.random() * arr.length);
  return (
    <div class="phrase">
    {arr[index]}
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <div id="logo"><a href="http://www.pagekeysolutions.com/"><img src="logo.png" /></a></div>
        <CubeClock />
        <PhraseMachine />
      </div>
    );
  }
}

function pad(num) {
  return num < 10 ? '0' + num : num;
  }
function tod(date) {
  return date.getHours() < 12 ? 'AM' : 'PM';
}

export default App;
