import React, { Component } from 'react';
import Canvas from './Components/Canvas';
import life from './Components/life';
import styled from "styled-components";
import './App.css';

class App extends Component {
  state = {
    width: 600,
    height: 600,
    rowsPx: 15,
    colsPx: 15,
    board: [],
    running: false,
    generation: 0,
    speed: 20,
    speedTemp:null,
  }

  componentDidMount(){
    const newBoard = this.blankBoard();
    this.setState({board: newBoard});
    
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  blankBoard = (tOrf = false) => {
    const xIs = Math.floor(this.state.width / this.state.colsPx);
    const yIs = Math.floor(this.state.height / this.state.rowsPx); 
    const newBoard = Array(yIs).fill().map(() => Array(xIs).fill().map((yes) => {
        let rand = false;
        if(tOrf){
        rand = Math.random() > 0.65;
        }
        return yes = rand;
      }));
    return newBoard;
  }

  boardInput = (row, col) => {
    const newBoard = this.state.board.map(arr => [...arr]);
    if(newBoard[row][col]){
      newBoard[row][col] = false;
    }else{
      newBoard[row][col] = true;
    }
    this.setState({board: newBoard});
  }

  loopGame = () => {
    if(!this.state.running){
      const stop = setInterval(this.startGame, this.state.speed);
      this.setState({
        stop: stop,
        running: true,
      })
    }
  }
  startGame = () => {
    const newBoard = life(this.state.board);
    console.log(newBoard)
    let newGen = this.state.generation + 1; 
    this.setState({
      board: newBoard,
      generation: newGen,
    });
  };

  stopGame = () => {
    clearInterval(this.state.stop);
    this.setState({
      running: false,
    });
  }

  clearBoard = () => {
    const newBoard = this.blankBoard();
    this.stopGame();
    this.setState({
      board: newBoard,
      generation: 0,
    });
  }

  randomBoard = () => {
    const newBoard = this.blankBoard(true)
    this.stopGame();
    this.setState({
      board: newBoard,
      generation: 0,
    });
  }

  changeSpeed = () => {
    this.setState({
      speed: this.state.speedTemp,
      speedTemp: '',
    })
  }

  render() {
    return (
      <div className="App">
        <Container size={(this.state.width * 2.5) + "px"}>
          <h1>Conways's Game of Life</h1>
          <h3>Generation: {this.state.generation}</h3>
          <Canvas 
            width={this.state.width} 
            height={this.state.width}
            colPx={this.state.colsPx}
            rowPx={this.state.rowsPx}
            boardClick={this.boardInput}
            run={this.state.running}
            board={this.state.board}
          />
          <div>
            <b>Game Rules</b>
            <ul>
              <li>If a cell is alive and it has exactly 2 or 3 living neigbors, it stays alive</li>
              <li>If a cell is dead and it has exactly 3 living neigbors, it rises again</li>
            </ul>
            <Container size={(this.state.width) + "px"}>
              <Button
                onClick={this.randomBoard}>
                Random
              </Button>
              <Button
                onClick={this.loopGame}>
                  Start
              </Button>
              <Button
                onClick={this.stopGame}>
                  Stop
              </Button>
              <Button
                onClick={this.startGame}>
                  One Gen
              </Button>
              <Button
                onClick={this.clearBoard}>
                  Clear
              </Button>
              <div>
              <input 
                type="text" 
                name="speedTemp" 
                value={this.state.speedTemp} 
                onChange={this.handleInput}
                placeholder={this.state.speed}/>
              <Button
                onClick={this.changeSpeed}>
                  Change Speed
              </Button>
              </div>
            </Container>
          </div>
        </Container>
        </div>
    );
  }
}

const Button = styled("button")`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  bottom: 0;

  :hover {
    background-color: lightgray;
  }
  :active{
    background-color: darkgray;
  }
  :focus{
    outline: 0;
  }  
`

const Container = styled("div")`
  width: ${props => props.size};
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-items: center;

  h1{
    width: 100%;
  }
  h3{
    width: 100%
  }
  ul{
    text-align: left;
  }
`
export default App;
