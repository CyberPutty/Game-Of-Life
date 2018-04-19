import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell.js';
import { arrayDeepCopy, SetGrid, Random, isAlive } from './helper/Generator.js';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: "",
      cols: "",
      grid: [],
      run: null,
      generations: 0,
      toggle: 'start'
    }

  }

  set = (event) => {
    event.preventDefault();
    if (this.state.cols <= 100 && this.state.rows <= 100) {
      let newGrid = SetGrid(this.state.cols, this.state.rows);
      this.setState({ grid: newGrid, generations: 0 });
      console.log(newGrid);
    }

  }
  componentDidMount() {
    this.setState({ rows: '50', cols: "50", grid: SetGrid(50, 50) });
  }

  start = (event) => {
    event.preventDefault();
    if (this.state.run === null) {

      this.state.run = window.setInterval(function () {

        this.setState({ grid: isAlive(this.state.grid), generations: this.state.generations + 1, toggle: 'stop' });
      }.bind(this), 125);
    }
    else {
      event.currentTarget.value = "start"
      window.clearInterval(this.state.run);
      this.setState({ run: null, toggle: 'start' });
    }


  }
  render() {
    return (<div className="game">
      <h1>Conway's Game of Life</h1>
      <div className="cellrows">{this.state.grid.map(function (arr, index) {
        return (<Cell size={arr} row={index + 1} />);
      })}</div>

      <div class="controls" >
        <form >
          <label>Height</label>
          <input id="row" type="number" min='9' max="100" value={this.state.rows}
            onChange={(event) => this.setState({ rows: event.target.value })}></input>
          <label>Width</label>
          <input id="col" type="number" min='9' max="100" value={this.state.cols}
            onChange={(event) => this.setState({ cols: event.target.value })}></input>
          <button type="submit" onClick={this.set}>New Generation</button>
          <button onClick={this.start}>{this.state.toggle}</button>
        </form>
      </div>
      <h1>Generations:{this.state.generations}</h1>
    </div>);
  }

}

export default App;
