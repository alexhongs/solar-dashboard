import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import solarWorks from '../images/solarworks.png';
import solarMan from '../images/solarman.png';

const CustomSlider = withStyles({
  root: {
    color: '#47AA24',
    height: 10,
    padding: '2px 0 42px',
  },
  thumb: {
    height: 24,
    width: 2,
    backgroundColor: 'currentColor',
    border: '1px solid currentColor',
    marginTop: -5,
    marginLeft: -1,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 12,
  },
  rail: {
    border: '1px solid #999999',
    color: '#fff',
    opacity: 1,
    height: 12,
    borderRadius: '20px',
  },
})(Slider);

function CustomThumbComponent(props) {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <span {...props}>
      <i className="bi bi-arrow-bar-up" />
    </span>
  );
}

function validEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getQuizContent(quizStep, quizResult, quizScore, setValue, setQuizResult, incrementQuizStep) {
  switch (quizStep) {
    case 0:
      return (
        <>
          <h1 className="pad-top-70"> Are you interested in adding solar energy to your home or business? </h1>

          <div className="quiz-row row">
            <div className="six columns">
              <button
                type="button"
                className={quizResult[0] === 'Home' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['Home', 0])}
              >
                {' '}
                Home
              </button>
            </div>

            <div className="six columns">
              <button
                type="button"
                className={quizResult[0] === 'Business' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['Business', 0])}
              >
                {' '}
                Business
              </button>
            </div>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <h1 className="pad-top-70">
            {' '}
            What county is your
            {' '}
            {quizResult[0]}
            {' '}
            in?
            {' '}
          </h1>

          <div className="quiz-row row">
            <input type="text" value={quizResult[1]} onChange={(event) => setValue(event.target.value)} />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <h1>
            {' '}
            How long do you plan to
            {' '}
            {quizResult[0] === 'Home' ? 'live' : 'stay'}
            {' '}
            at your current
            {' '}
            {quizResult[0]}
            ?
            {' '}
          </h1>

          <div className="quiz-row row">
            <div className="four columns">
              <button
                type="button"
                className={quizResult[2] === '1-7' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['1-7', -10])}
              >
                {' '}
                1-7 Years
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className={quizResult[2] === '7-10' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['7-10', 0])}
              >
                {' '}
                7-10 Years
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className={quizResult[2] === '10+' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['10+', 10])}
              >
                {' '}
                10+ Years
              </button>
            </div>

            <div className="twelve columns">
              <button
                type="button"
                className={quizResult[2] === 'unsure' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['unsure', 0])}
              >
                {' '}
                I&apos;m not sure
              </button>
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <h1> Which of the following best represents your current energy consumption? </h1>

          <div className="quiz-row row">
            <div className="four columns">
              <button
                type="button"
                className={quizResult[3] === 'below' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['below', -10])}
              >
                {' '}
                Below Average
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className={quizResult[3] === 'average' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['average', 5])}
              >
                {' '}
                Average
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className={quizResult[3] === 'above' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['above', 10])}
              >
                {' '}
                Above Average
              </button>
            </div>

            <div className="twelve columns">
              <button
                type="button"
                className={quizResult[3] === 'unsure' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult('unsure')}
              >
                {' '}
                I&apos;m not sure
              </button>
            </div>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <h1> Which of the following best represents your current home’s roof? </h1>

          <div className="quiz-row row">
            <div className="four columns">
              <button
                type="button"
                className={quizResult[4] === 'new' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['new', 20])}
              >
                {' '}
                Brand New
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className={quizResult[4] === 'okay' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['okay', 10])}
              >
                {' '}
                Okay Shape
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className={quizResult[4] === 'bad' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['bad', -10])}
              >
                {' '}
                Bad Shape
              </button>
            </div>

            <div className="twelve columns">
              <button
                type="button"
                className={quizResult[4] === 'unsure' ? 'selected quiz-button btn bg-transparent' : 'quiz-button btn bg-transparent'}
                onClick={() => setQuizResult(['unsure', 10])}
              >
                {' '}
                I&apos;m not sure
              </button>
            </div>
          </div>
        </>
      );
    case 5:
      return (
        <>
          <h1> Select all the following motivations that apply for going solar: </h1>

          <div className="quiz-row row">
            <div className="six columns">
              {
                quizResult[5].includes('Environmental Sustainability')
                  ? (
                    <button
                      type="button"
                      className="selected quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Environmental Sustainability', 5])}
                    >
                      {' '}
                      &#9635; Environmental Sustainability
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Environmental Sustainability', 5])}
                    >
                      {' '}
                      &#9634; Environmental Sustainability
                    </button>
                  )
              }
            </div>

            <div className="six columns">
              {
                quizResult[5].includes('Energy Savings')
                  ? (
                    <button
                      type="button"
                      className="selected quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Energy Savings', 5])}
                    >
                      {' '}
                      &#9635; Energy Savings
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Energy Savings', 5])}
                    >
                      {' '}
                      &#9634; Energy Savings
                    </button>
                  )
              }
            </div>

            <div className="six columns">
              {
                quizResult[5].includes('Energy Independence')
                  ? (
                    <button
                      type="button"
                      className="selected quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Energy Independence', 5])}
                    >
                      {' '}
                      &#9635; Energy Independence
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Energy Independence', 5])}
                    >
                      {' '}
                      &#9634; Energy Independence
                    </button>
                  )
              }
            </div>

            <div className="six columns">
              {
                quizResult[5].includes('Price Protection')
                  ? (
                    <button
                      type="button"
                      className="selected quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Price Protection', 5])}
                    >
                      {' '}
                      &#9635; Price Protection
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="quiz-button-multi btn bg-transparent"
                      onClick={() => setQuizResult(['Price Protection', 5])}
                    >
                      {' '}
                      &#9634; Price Protection
                    </button>
                  )
              }
            </div>
          </div>
        </>
      );
    case 6:
      return (
        <>
          <h1> What’s a good email address for our team at Solbridge Energy Advisors to reach out to you? </h1>
          <h4> (Don’t worry, we won’t add you to any mailing lists 😁) </h4>

          <div className="quiz-row row">
            <input type="text" value={quizResult[6]} onChange={(event) => setValue(event.target.value)} />
          </div>
        </>
      );
    case 7:
      return (
        <>
          <h1> Ok, we’ve ran the numbers, we think you would be a great fit for solar! </h1>

          <div className="quiz-row row">
            <>
              <div className="row">
                <div className="six columns more-suitable">
                  <h7>Less Suitable &#x2190;</h7>
                </div>
                <div className="six columns less-suitable">
                  <h7>&#x2192; More Suitable</h7>
                </div>
              </div>

              <CustomSlider
                ThumbComponent={CustomThumbComponent}
                defaultValue={[50, quizScore]}
                value={[50, quizScore]}
              />
            </>

            <div className="row">
              <div className="six columns">
                <h5> Contrary to popular belief, solar works in Western PA! </h5>
              </div>
            </div>

            <div className="row">
              <div className="six columns">
                <h5> Let’s get you connected with our team! </h5>
              </div>

              <div className="six columns confirm-button-wrapper">
                <button
                  type="button"
                  className="selected confirm-button btn bg-transparent"
                  onClick={() => incrementQuizStep()}
                >
                  {' '}
                  Confirm your contact info
                  <span STYLE="font-size:24pt">&#8594;</span>
                </button>
              </div>
            </div>
          </div>
        </>
      );
    case 8:
      return (
        <>
          <div className="quiz-row row">
            <img className="solar-result" src={solarWorks} alt="solarworks" />
            <h1> Fantastic! Please confirm below that this is a good email for you! </h1>
            <h1>{quizResult[6]}</h1>
            <button
              type="button"
              className="quiz-button btn bg-transparent"
              onClick={() => incrementQuizStep()}
            >
              {' '}
              All set!
            </button>
          </div>
        </>
      );
    case 9:
      return (
        <>
          <div className="quiz-row row">
            <img className="solarman" src={solarMan} alt="solarman" />
            <h1> Huzzah! We got your details, and we’ll be in touch shortly! </h1>
          </div>
        </>
      );
    default:
      return (
        <div />
      );
  }
}

function SkipButton(quizStep, skipQuizStep) {
  return (
    quizStep !== 6
    && (
    <button
      type="button"
      className="skip-button btn"
      onClick={() => skipQuizStep()}
    >
      {' '}
      Skip
    </button>
    )
  );
}

function NextButton(quizStep, quizResult, incrementQuizStep) {
  const ans = quizResult[quizStep];

  if (quizStep !== 6) {
    if (ans === 'unanswered' || ans === 'Location') {
      return (
        <button type="button" disabled className="incomplete next-button btn">
          {' '}
          <span STYLE="font-size:24pt; color: #888888">&#8594;</span>
          {' '}
        </button>
      );
    }
    return (
      <button
        type="button"
        className="next-button btn"
        onClick={() => incrementQuizStep()}
      >
        {' '}
        <span STYLE="font-size:24pt">&#8594;</span>
        {' '}

      </button>
    );
  }
  if (validEmail(ans)) {
    return (
      <button
        type="button"
        className="next-button btn"
        onClick={() => incrementQuizStep()}
      >
        {' '}
        <span STYLE="font-size:24pt">&#8594;</span>
        {' '}

      </button>
    );
  }
  return (
    <button type="button" disabled className="incomplete next-button btn">
      {' '}
      <span STYLE="font-size:24pt; color: #888888">&#8594;</span>
      {' '}
    </button>
  );
}

function Quiz() {
  const quizStep = useStoreState((state) => state.quizStep);
  const quizResult = useStoreState((state) => state.quizResult);
  const quizScore = useStoreState((state) => state.quizScore);
  const setValue = useStoreActions((actions) => actions.setValue);
  const setQuizResult = useStoreActions((actions) => actions.setQuizResult);
  const skipQuizStep = useStoreActions((actions) => actions.skipQuizStep);
  const decrementQuizStep = useStoreActions((actions) => actions.decrementQuizStep);
  const incrementQuizStep = useStoreActions((actions) => actions.incrementQuizStep);

  return (
    <section id="quiz">
      <div className="row">
        <div className="twelve columns main-col">
          <h3> Clean Actions </h3>
          <h2> Is Solar Right for You? </h2>
        </div>

        {[0, 1, 2, 3, 4, 5, 6, 7].includes(quizStep)
          && (
          <div className="three columns main-col question-list">
            <li>
              <ul className={quizStep === 0 ? 'highlight' : ''}>• Building Type</ul>
              <ul className={quizStep === 1 ? 'highlight' : ''}>• Location</ul>
              <ul className={quizStep === 2 ? 'highlight' : ''}>• Time Horizon</ul>
              <ul className={quizStep === 3 ? 'highlight' : ''}>• Current Energy Use</ul>
              <ul className={quizStep === 4 ? 'highlight' : ''}>• Roof Age</ul>
              <ul className={quizStep === 5 ? 'highlight' : ''}>• Solar Motivations</ul>
              <ul className={quizStep === 6 ? 'highlight' : ''}>• Contact</ul>
              <ul className={quizStep === 7 ? 'highlight' : ''}>• Result</ul>
            </li>
          </div>
          )}

        <div className={[8, 9].includes(quizStep) ? 'twelve columns main-col' : 'nine columns main-col'}>
          {
            [2, 3, 4, 5, 6].includes(quizStep)
              && (
              <>
                <div className="row">
                  <div className="six columns more-suitable">
                    <h7>Less Suitable &#x2190;</h7>
                  </div>
                  <div className="six columns less-suitable">
                    <h7>&#x2192; More Suitable</h7>
                  </div>
                </div>

                <CustomSlider
                  ThumbComponent={CustomThumbComponent}
                  defaultValue={[50, quizScore]}
                  value={[50, quizScore]}
                />
              </>
              )
          }

          {getQuizContent(quizStep, quizResult, quizScore, setValue, setQuizResult, incrementQuizStep)}
        </div>

        <div className="quiz-submit-row twelve columns main-col">
          {[0, 1, 2, 3, 4, 5, 6].includes(quizStep)
            && (
            <>
              <button
                type="button"
                className="back-button btn"
                onClick={() => decrementQuizStep()}
              >
                {' '}
                Back
              </button>

              {SkipButton(quizStep, skipQuizStep)}

              {NextButton(quizStep, quizResult, incrementQuizStep)}
            </>
            )}
        </div>
      </div>
    </section>
  );
}

export default Quiz;
