import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';

function getQuizContent(selected, quizStep, quizResult, setQuizResult) {
  switch(quizStep) {
    case 0: 
      return (
        <>
          <h1> Are you interested in adding solar energy to your home or business? </h1>

          <div className='quiz-row row'>
            <div className='six columns'>
              <button type='button' class={selected === 'Home' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('Home')}> Home </button>
            </div>

            <div className='six columns'>
              <button type='button' class={selected === 'Business' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('Business')}> Business </button>
            </div>
          </div>
        </>
      )
    case 1:
      return (
        <>
          <h1> What county is your home in? </h1>

          <div className='quiz-row row'>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </>
      )
  }
}

function Quiz() {
  const selected = useStoreState(state => state.selected);
  const quizStep = useStoreState(state => state.quizStep);
  const quizResult = useStoreState(state => state.quizResult);
  const setQuizResult = useStoreActions((actions) => actions.setQuizResult);
  const skipQuizStep = useStoreActions((actions) => actions.skipQuizStep);
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
          {getQuizContent(selected, quizStep, quizResult, setQuizResult)}
        </div>

        <div className='quiz-submit-row twelve columns main-col'>
          <button type='button' class='skip-button btn' 
          onClick={() => skipQuizStep()}> Skip </button>

          <button type='button' class='next-button btn' 
          onClick={() => incrementQuizStep()}> <span STYLE="font-size:24pt">&#8594;</span> </button>
        </div>
      </div>
    </section>
  );
}

export default Quiz
