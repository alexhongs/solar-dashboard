import React, { Component } from 'react'

class Quiz extends Component {
  render() {
    return (
      <section id='quiz'>
        <div className='row'>
          <div className='twelve columns main-col'>
            <h3> Clean Actions </h3>
            <h2> How should you decide if solar is right for you? </h2>
          </div>

          <div className='three columns main-col'>
            <li>
              <ul>• Building Type</ul>
              <ul>• Location</ul>
              <ul>• Time Horizon</ul>
              <ul>• Financial Logistics</ul>
              <ul>• Current Energy Use</ul>
              <ul>• Roof Age</ul>
              <ul>• Solar Motivation</ul>
              <ul>• Contact</ul>
            </li>
          </div>

          <div className='nine columns main-col'>
            <h4> Are you interested in adding solar energy to your home or business? </h4>

            <div className='quiz-row row'>
              <div className='six columns'>
                <button type='button' class='quiz-button btn bg-transparent'> Home </button>
              </div>

              <div className='six columns'>
                <button type='button' class='quiz-button btn bg-transparent'> Business </button>
              </div>
            </div>
          </div>

          <div className='quiz-submit-row twelve columns main-col'>
            <p> Skip <i class='icon-right-circle-1' /></p>
          </div>
        </div>
      </section>
    )
  }
}

export default Quiz
