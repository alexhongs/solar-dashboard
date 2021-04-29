import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends Component {
  render() {
    return (
      <section id="navbar">
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <div className="nav-row">
            <div className="three columns">
              <a className="logo" href="/home">
                <img className="logo-img" src="/images/logo.png" alt="logo" />
              </a>
            </div>

            <div className="nine columns">
              <ul id="nav" className="nav">
                {/* <li className="current"><a className="smoothscroll" href="#home">Home</a></li> */}
                <li><a className="smoothscroll" href="#quiz">Is Solar Right for You?</a></li>
                <li><a className="smoothscroll" href="#about">Facts vs. Fiction</a></li>
                <li><a className="smoothscroll" href="https://solbridgeea.com/">Visit Solbridge</a></li>

                {window.location.href.endsWith('dashboard')
                  ? (
                    <li>
                      <a
                        type="button"
                        className="btn btn-warning"
                        id="logout-button"
                        href="\home"
                      >
                        Log Out
                      </a>
                    </li>
                  )
                  : (
                    <li>
                      <a
                        type="button"
                        className="btn btn-warning"
                        id="login-button"
                        href="\login"
                      >
                        Log In
                      </a>
                    </li>
                  ) }
              </ul>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}

export default NavBar;
