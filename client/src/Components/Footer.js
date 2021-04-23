import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="copyright">
              <li>&copy; 2021 Solbridge EA. All rights reserved.</li>
            </ul>
          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open " aria-label="Scroll back up" /></a></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
