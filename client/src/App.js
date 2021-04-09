import React, { Component } from 'react'
import Header from './Components/Header'
import About from './Components/About'
import Quiz from './Components/Quiz'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { apiResponse: '' }
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <About />
        <Quiz />
      </div>
    );
  }
}

export default App
