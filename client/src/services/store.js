import { createStore, action } from 'easy-peasy';

const store = createStore({
  selected: '',
  quizStep: 0,
  quizResult: {
    0: 'Location',
    1: 'Allegheny',
    2: 'unanswered',
    3: 'unanswered',
    4: 'unanswered',
    5: 'unanswered',
    6: 'unanswered',
    7: 'unanswered'
  },
  setCounty: action((state, payload) => {
    state.quizResult[1] = payload;
  }),
  setQuizResult: action((state, payload) => {
    state.selected = payload;
    state.quizResult[state.quizStep] = payload;
  }),
  skipQuizStep: action((state) => {
    state.quizResult[state.quizStep] = 'unanswered';
    state.quizStep += 1;
  }),
  incrementQuizStep: action((state, payload) => {
    if (state.quizResult[state.quizStep] != 'unanswered' || state.quizResult[state.quizStep] != 'Location') {
      state.quizStep += 1;
    }
  }),
})


export default store