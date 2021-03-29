import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }
  callAPI() {
      fetch('http://localhost:9000/testAPI')
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
      this.callAPI();
  }

  testAPI = () => {
    return "Test API";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a>
            Hey {this.testAPI()} {this.state.apiResponse}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
