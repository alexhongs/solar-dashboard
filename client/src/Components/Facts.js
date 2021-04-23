import React, { Component } from 'react';
import solarfact1 from '../images/solar-fact-1.png';
import solarfact2 from '../images/solar-fact-2.png';
import city from '../images/city.png';

// eslint-disable-next-line react/prefer-stateless-function
class Facts extends Component {
  render() {
    return (
      <section id="facts">
        <div className="row">
          <div className="six columns main-col">
            <img className="solar-facts" src={solarfact1} alt="solarfact1" />
          </div>

          <div className="six columns main-col">
            <img className="solar-facts" src={solarfact2} alt="solarfact2" />
          </div>
        </div>

        <div className="city">
            <img className="city" src={city} alt="city" />
        </div>
      </section>
    );
  }
}

export default Facts;
