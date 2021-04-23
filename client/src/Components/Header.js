import React, { Component } from 'react';
import tagline from '../images/tagline.png';
import tagline2 from '../images/tagline2.png';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    return (
      <header id="home">
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <ul id="nav" className="nav">
            {/* <li className="current"><a className="smoothscroll" href="#home">Home</a></li> */}
            <li><a className="smoothscroll" href="#about">Facts vs. Fiction</a></li>
            <li><a className="smoothscroll" href="#quiz">Is Solar Right for You?</a></li>
            <li><a className="smoothscroll" href="https://solbridgeea.com/">Visit Solbridge</a></li>
            <li><button className='btn btn-warning' id="login-button">Log In</button></li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
		  	<h2 className="responsive-headline">Did you know Western PA, there are</h2>
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
