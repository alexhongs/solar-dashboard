import {
  createStore, action, thunk, persist,
} from 'easy-peasy';

function compareWeeklyData(data, attribute) {
  let firstHalfSum = 0;
  let secondHalfSum = 0;
  const n = data.length;

  for (let i = 0; i < n; i += 1) {
    if (i < Number(n / 2)) {
      firstHalfSum += data[i][attribute];
    } else {
      secondHalfSum += data[i][attribute];
    }
  }

  return firstHalfSum - secondHalfSum;
}

const store = createStore(
  persist({
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
    panelData: {},
    liveData: {},
    panelDataFetched: false,
    liveDataFetched: false,
    weeklyMoneySaved: 0,
    weeklyEmissionsReduced: 0,

    setPanelData: action((state, payload) => {
      state.panelData = payload;
    }),
    setLiveData: action((state, payload) => {
      state.liveData = payload;
    }),
    setPanelDataFetched: action((state, payload) => {
      state.panelDataFetched = payload;
    }),
    setLiveDataFetched: action((state, payload) => {
      state.liveDataFetched = payload;
    }),
    setWeeklyMoneySaved: action((state, payload) => {
      state.weeklyMoneySaved = payload;
    }),
    setWeeklyEmissionReduced: action((state, payload) => {
      state.weeklyEmissionsReduced = payload;
    }),
    setPanelDataAsync: thunk(async (actions) => {
      await fetch('http://localhost:9000/panels/live', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((value) => value.json())
        .then((response) => {
          if (response.success === true) {
            console.log('live');
            actions.setLiveData(response.data);
            actions.setLiveDataFetched(true);
          }
        });

      await fetch('http://localhost:9000/panels/production', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          period: 'd',
        },
      })
        .then((value) => value.json())
        .then((response) => {
          if (response.success === true) {
            console.log('live2');
            actions.setPanelData(response.data);
            actions.setWeeklyMoneySaved(compareWeeklyData(response.data.slice(0, -1), 'money'));
            actions.setWeeklyEmissionReduced(compareWeeklyData(response.data.slice(0, -1), 'carbon'));
            actions.setPanelDataFetched(true);
          }
        });
    }),
  }),
);

export default store;
