import { createStore, action } from 'easy-peasy';

const store = createStore({
  // Quiz
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

  // Auth
  registerStep: 0,
  registerInfo: {
    APICode: '',
    systemId: '',
    moneyInvested: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  incrementRegisterStep: action((state) => {
    state.registerStep += 1;
  }),
  setAPICode: action((state, payload) => {
    state.registerInfo.APICode = payload;
  }),
  setSystemId: action((state, payload) => {
    state.registerInfo.systemId = payload;
  }),
  setMoneyInvested: action((state, payload) => {
    state.registerInfo.moneyInvested = payload;
  }),
  setEmail: action((state, payload) => {
    state.registerInfo.email = payload;
  }),
  setPassword: action((state, payload) => {
    state.registerInfo.password = payload;
  }),
  setConfirmPassword: action((state, payload) => {
    state.registerInfo.confirmPassword = payload;
  }),

  loginInfo: {
    email: '',
    password: '',
  },
  setLoginEmail: action((state, payload) => {
    state.loginInfo.email = payload;
  }),
  setLoginPassword: action((state, payload) => {
    state.loginInfo.password = payload;
  }),

  // Dashboard
  selectedTab: 0,
  setSelectedTab: action((state, payload) => {
    state.selectedTab = payload;
  }),
});

export default store;
