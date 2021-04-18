import { createStore, action, persist } from 'easy-peasy';

const store = createStore(
  persist({
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
    incrementQuizStep: action((state, payload) => {
      state.quizResult[state.quizStep] = payload;
      state.quizStep += 1;
    }),
  }),
  {
    version: 1,
  }
)


export default store