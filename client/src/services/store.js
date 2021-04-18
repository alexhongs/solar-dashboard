import { createStore, action } from 'easy-peasy';

const store = createStore({
  selected: '',
  quizStep: 0,
  quizResult: {
    0: 'unanswered',
    1: 'unanswered',
    2: 'unanswered',
    3: 'unanswered',
    4: 'unanswered',
    5: 'unanswered',
    6: 'unanswered',
    7: 'unanswered'
  },
  setQuizResult: action((state, payload) => {
    state.selected = payload;
    state.quizResult[state.quizStep] = payload;
  }),
  skipQuizStep: action((state) => {
    state.quizResult[state.quizStep] = 'unanswered';
    state.quizStep += 1;
  }),
  incrementQuizStep: action((state, payload) => {
    state.quizStep += 1;
  }),
})


export default store