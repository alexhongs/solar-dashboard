import React, { Component } from 'react';
import tagline from '../images/tagline.png';
import tagline2 from '../images/tagline2.png';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    return (
      <header id="home">
        <div className="row banner">
          <div className="banner-text">
            <h2 className="responsive-headline">Did you know in the U.S, there are</h2>
            <img className="tagline" src={tagline} alt="tagline" />
            <img className="tagline2" src={tagline2} alt="tagline" />
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#facts">
            <i className="icon-down-circle" />
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
