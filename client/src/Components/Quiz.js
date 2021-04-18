import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';

function getQuizContent(quizStep, incrementQuizStep) {
  switch(quizStep) {
    case 0: 
      return (
        <>
          <h1> Are you interested in adding solar energy to your home or business? </h1>

          <div className='quiz-row row'>
            <div className='six columns'>
              <button type='button' class='quiz-button btn bg-transparent'
              onClick={() => incrementQuizStep('Home')}> Home </button>
            </div>

            <div className='six columns'>
              <button type='button' class='quiz-button btn bg-transparent'
              onClick={() => incrementQuizStep('Business')}> Business </button>
            </div>
          </div>
        </>
      )
    case 1:
      return (
        <>
          <h1> What county is your home in? </h1>

          <div className='quiz-row row'>
            <div className='six columns'>
              <button type='button' class='quiz-button btn bg-transparent'
              onClick={() => incrementQuizStep('Home')}> Home </button>
            </div>

            <div className='six columns'>
              <button type='button' class='quiz-button btn bg-transparent'
              onClick={() => incrementQuizStep('Business')}> Business </button>
            </div>
          </div>
        </>
      )
  }
}

function Quiz() {
  const quizStep = useStoreState(state => state.quizStep);
  const incrementQuizStep = useStoreActions((actions) => actions.incrementQuizStep);

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
          {getQuizContent(quizStep, incrementQuizStep)}
        </div>

        <div className='quiz-submit-row twelve columns main-col'>
          <p> Skip <i class='icon-right-circle-1' /></p>
        </div>
      </div>
    </section>
  );
}

// class Quiz extends Component {
//   render() {
//     return (
      
//     )
//   }
// }

export default Quiz
