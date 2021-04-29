import { createStore, action } from 'easy-peasy';

const store = createStore({
  quizStep: 0,
  quizResult: {
    0: 'Home',
    1: 'Allegheny',
    2: 'unanswered',
    3: 'unanswered',
    4: 'unanswered',
    5: '',
    6: '',
  },
  quizScore: 50,
  setValue: action((state, payload) => {
    state.quizResult[state.quizStep] = payload;
  }),
  setQuizResult: action((state, payload) => {
    const ans = payload[0];
    const score = payload[1];

    if (state.quizStep === 5) {
      if (state.quizResult[5].includes(ans)) {
        state.quizResult[5] = state.quizResult[5].replace(ans, '');
      } else {
        state.quizResult[5] += ' ';
        state.quizResult[5] += ans;
      }
    } else {
      state.selected = ans;
      state.quizResult[state.quizStep] = ans;
    }

    state.quizScore += score;
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
