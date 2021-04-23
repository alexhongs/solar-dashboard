import { createStore, action } from 'easy-peasy';

const store = createStore({
  quizStep: 0,
  quizResult: {
    0: 'Location',
    1: 'Allegheny',
    2: 'unanswered',
    3: 'unanswered',
    4: 'unanswered',
    5: '',
    6: '',
  },
  setValue: action((state, payload) => {
    state.quizResult[state.quizStep] = payload;
  }),
  setQuizResult: action((state, payload) => {
    if (state.quizStep === 5) {
      if (state.quizResult[5].includes(payload)) {
        state.quizResult[5] = state.quizResult[5].replace(payload, '');
      } else {
        state.quizResult[5] += ' ';
        state.quizResult[5] += payload;
      }
    } else {
      state.selected = payload;
      state.quizResult[state.quizStep] = payload;
    }
  }),
  skipQuizStep: action((state) => {
    state.quizResult[state.quizStep] = 'unanswered';
    state.quizStep += 1;
  }),
  decrementQuizStep: action((state) => {
    state.quizStep = Math.max(0, state.quizStep - 1);
  }),
  incrementQuizStep: action((state) => {
    if (state.quizResult[state.quizStep] !== 'unanswered'
      && state.quizResult[state.quizStep] !== 'Location') {
      state.quizStep += 1;
    }
  }),
});

export default store;
