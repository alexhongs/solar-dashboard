import React, { Component } from 'react'
import Header from './Components/Header'
import About from './Components/About'
import Quiz from './Components/Quiz'
import Footer from './Components/Footer'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      quizStep: 0
    }
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <About />
        <Quiz />
        <Footer />
      </div>
    );
  }
}

export default App
