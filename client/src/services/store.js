/* eslint-disable no-unused-vars */
import {
  createStore, action, thunk, persist,
} from 'easy-peasy';

const moment = require('moment');

function compareData(data, attribute) {
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
  return firstHalfSum * 0 + secondHalfSum;
}

function getMax(data, attribute) {
  let maximum = 0;
  const n = data.length;
  for (let i = n - 1; i > n - 8; i -= 1) {
    if (maximum < data[i][attribute]) {
      maximum = data[i][attribute];
    }
  }
  return maximum;
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
    resetDashboardData: action((state) => {
      state.liveData = {};
      state.liveDataFetched = false;
      state.panelData = {};
      state.panelDataFetched = false;
      state.weeklyMoneySaved = 0;
      state.weeklyEmissionsReduced = 0;
      state.showAllTimeData = false;
      state.allData = {};
      state.allDataFetched = false;
    }),

    // LIVE
    liveData: {},
    liveDataFetched: false,
    setLiveData: action((state, payload) => {
      state.liveData = payload;
    }),
    setLiveDataFetched: action((state, payload) => {
      state.liveDataFetched = payload;
    }),
    setLastUpdated: action((state, payload) => {
      state.lastUpdated = payload;
    }),

    // DAY
    panelData: {},
    panelDataFetched: false,
    weeklyMoneySaved: 0,
    weeklyEmissionsReduced: 0,
    weeklyEnergyProduced: 0,
    weeklyPeakPowerOutput: 0,
    setPanelData: action((state, payload) => {
      state.panelData = payload;
    }),
    setPanelDataFetched: action((state, payload) => {
      state.panelDataFetched = payload;
    }),
    setWeeklyMoneySaved: action((state, payload) => {
      state.weeklyMoneySaved = payload;
    }),
    setWeeklyEmissionReduced: action((state, payload) => {
      state.weeklyEmissionsReduced = payload;
    }),
    setWeeklyEnergyProduced: action((state, payload) => {
      state.weeklyEnergyProduced = payload;
    }),
    setWeeklyPeakPowerOutput: action((state, payload) => {
      state.weeklyPeakPowerOutput = payload;
    }),

    // WEEK
    weekData: {},
    weekDataFetched: false,
    setWeekData: action((state, payload) => {
      state.weekData = payload;
    }),
    setWeekDataFetched: action((state, payload) => {
      state.weekDataFetched = payload;
    }),

    // MONTH
    monthData: {},
    monthDataFetched: false,
    setMonthData: action((state, payload) => {
      state.monthData = payload;
    }),
    setMonthDataFetched: action((state, payload) => {
      state.monthDataFetched = payload;
    }),

    // YEAR
    yearData: {},
    yearDataFetched: false,
    setYearData: action((state, payload) => {
      state.yearData = payload;
    }),
    setYearDataFetched: action((state, payload) => {
      state.yearDataFetched = payload;
    }),

    // ALL TIME
    showAllTimeData: false,
    setShowAllTimeData: action((state, payload) => {
      state.showAllTimeData = payload;
    }),

    allData: {},
    allDataFetched: false,
    setAllData: action((state, payload) => {
      state.allData = payload;
    }),
    setAllDataFetched: action((state, payload) => {
      state.allDataFetched = payload;
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
            actions.setLiveData(response.data);
            actions.setLiveDataFetched(true);
            const dataLength = response.data.productions.length;
            const { date } = response.data.productions[dataLength - 1];
            actions.setLastUpdated(moment(date).local().format('h:mm a z'));
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
            actions.setPanelData(response.data);
            actions.setWeeklyMoneySaved(compareData(response.data.slice(0, -1), 'money'));
            actions.setWeeklyEmissionReduced(compareData(response.data.slice(0, -1), 'carbon'));
            actions.setWeeklyEnergyProduced(compareData(response.data.slice(0, -1), 'magnitude'));
            actions.setWeeklyPeakPowerOutput(getMax(response.data.slice(0, -1), 'peak_power'));
            actions.setPanelDataFetched(true);
          }
        });

      await fetch('http://localhost:9000/panels/production', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          period: 'w',
        },
      })
        .then((value) => value.json())
        .then((response) => {
          if (response.success === true) {
            actions.setWeekData(response.data);
            actions.setWeekDataFetched(true);
          }
        });

      await fetch('http://localhost:9000/panels/production', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          period: 'm',
        },
      })
        .then((value) => value.json())
        .then((response) => {
          if (response.success === true) {
            actions.setMonthData(response.data);
            actions.setMonthDataFetched(true);
          }
        });

      await fetch('http://localhost:9000/panels/production', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          period: 'y',
        },
      })
        .then((value) => value.json())
        .then((response) => {
          if (response.success === true) {
            actions.setYearData(response.data);
            actions.setYearDataFetched(true);
          }
        });

      await fetch('http://localhost:9000/panels/production', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          period: 't',
        },
      })
        .then((value) => value.json())
        .then((response) => {
          if (response.success === true) {
            actions.setAllData(response.data);
            actions.setAllDataFetched(true);
          }
        });
    }),

    // Analytics
    selectedPeriod: '',
    setSelectedPeriod: action((state, payload) => {
      state.selectedPeriod = payload;
    }),
  }),
);

export default store;
