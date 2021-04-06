import React, { Component } from 'react'
import Header from './Components/Header'
import About from './Components/About'
import FlowChart from './Components/FlowChart'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  render () {
    return (
      <div className="App">
        <Header />
        <About />
        <FlowChart />
      </div>
    );
  }
}

export default App;
