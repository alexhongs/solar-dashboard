import React, { Component } from 'react';
import Header from './Components/Header';
import Facts from './Components/Facts';
import About from './Components/About';
import Quiz from './Components/Quiz';
import Footer from './Components/Footer';
import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Facts />
        <Quiz />
        <About />
        <Footer />
      </div>
    );
  }
}

export default App;
