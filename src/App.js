import React, { Component } from 'react';
import Canvas from './Components/Canvas';
import life from './Components/life';
import styled from "styled-components";
import './App.css';

class App extends Component {
  state = {
    width: 300,
    height: 300,
    rowsPx: 15,
    colsPx: 15,
    board: [],
    running: false,
    generation: 0
  }

  componentDidMount(){
    const newBoard = this.blankBoard();
    this.setState({board: newBoard});
    
  }

  blankBoard = () => {
    const xIs = Math.floor(this.state.width / this.state.colsPx);
    const yIs = Math.floor(this.state.height / this.state.rowsPx);
    const newBoard = Array(yIs).fill().map(() => Array(xIs).fill(false));
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
      const stop = setInterval(this.startGame, 300);
      this.setState({stop: stop})
    }
  }
  startGame = () => {
    const newBoard = life(this.state.board);
    console.log(newBoard)
    let newGen = this.state.generation + 1; 
    this.setState({
      board: newBoard,
      running: true,
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

  render() {
    return (
      <div className="">
        <p>Generation: {this.state.generation}</p>
        <Canvas 
          className="App" 
          width={this.state.width} 
          height={this.state.width}
          boardClick={this.boardInput}
          run={this.state.running}
          board={this.state.board}
        />
        <Button
          onClick={this.loopGame}>
            Start
        </Button>
        <Button
          onClick={this.stopGame}>
            Stop
        </Button>
        <Button
          onClick={this.clearBoard}>
            Clear
        </Button>
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
export default App;
