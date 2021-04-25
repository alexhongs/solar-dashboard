import React, { Component } from 'react';
import Header from './Header';
import Facts from './Facts';
import About from './About';
import Quiz from './Quiz';
import Footer from './Footer';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Facts />
        <Quiz />
        <About />
        <Footer />
      </>
    );
  }
}

export default Home;
