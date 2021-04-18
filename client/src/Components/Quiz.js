import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';

function getQuizContent(selected, quizStep, quizResult, setCounty, setQuizResult) {
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
          <h1> What county is your {quizResult[0]} in? </h1>

          <div className='quiz-row row'>
            <input type="text" value={quizResult[1]} onChange={event => setCounty(event.target.value)} />
          </div>
        </>
      )
    case 2: 
      return (
        <>
          <h1> How long do you plan to {quizResult[0] == 'Home' ? 'live' : 'stay'} at your current {quizResult[0]}? </h1>

          <div className='quiz-row row'>
            <div className='four columns'>
              <button type='button' class={selected === '1-7' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('1-7')}> 1-7 Years </button>
            </div>

            <div className='four columns'>
              <button type='button' class={selected === '7-10' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('7-10')}> 7-10 Years </button>
            </div>

            <div className='four columns'>
              <button type='button' class={selected === '10+' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('10+')}> 10+ Years </button>
            </div>

            <div className='twelve columns'>
              <button type='button' class={selected === 'unsure' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('unsure')}> I'm not sure </button>
            </div>
          </div>
        </>
      )
    case 3: 
      return (
        <>
          <h1> Which of the following best represents your current energy consumption? </h1>

          <div className='quiz-row row'>
            <div className='four columns'>
              <button type='button' class={selected === 'below' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('below')}> Below Average </button>
            </div>

            <div className='four columns'>
              <button type='button' class={selected === 'average' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('average')}> Average </button>
            </div>

            <div className='four columns'>
              <button type='button' class={selected === 'above' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('above')}> Above Average </button>
            </div>

            <div className='twelve columns'>
              <button type='button' class={selected === 'unsure' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('unsure')}> I'm not sure </button>
            </div>
          </div>
        </>
      )
    case 4: 
      return (
        <>
          <h1> Which of the following best represents your current home’s roof? </h1>

          <div className='quiz-row row'>
            <div className='four columns'>
              <button type='button' class={selected === 'new' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('new')}> Brand New </button>
            </div>

            <div className='four columns'>
              <button type='button' class={selected === 'okay' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('okay')}> Okay Shape </button>
            </div>

            <div className='four columns'>
              <button type='button' class={selected === 'bad' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('bad')}> Bad Shape </button>
            </div>

            <div className='twelve columns'>
              <button type='button' class={selected === 'unsure' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
              onClick={() => setQuizResult('unsure')}> I'm not sure </button>
            </div>
          </div>
        </>
      )
  }
}

function Quiz() {
  const selected = useStoreState(state => state.selected);
  const quizStep = useStoreState(state => state.quizStep);
  const quizResult = useStoreState(state => state.quizResult);
  const setCounty = useStoreActions((actions) => actions.setCounty);
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
            <ul className={quizStep === 0 ? 'highlight' : ''}>• Building Type</ul>
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
          {getQuizContent(selected, quizStep, quizResult, setCounty, setQuizResult)}
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
