import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import moment from 'moment';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SideNavBar from './Dashboard/SideNavBar';
import DailyReport from './Dashboard/DailyReport';
import WeeklyReport from './Dashboard/WeeklyReport';
import Summary from './Dashboard/Summary';
import weather from '../images/weather.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  dashboardGrid: {
    backgroundColor:
      theme.palette.type === 'light' ? '#F9FAFD' : '#F9FAFD',
  },
  dashboard: {
    padding: '0.5vh 2vw 0 2vw',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
}));

function Dashboard() {
  const classes = useStyles();

  const lastUpdated = useStoreState((state) => state.lastUpdated);
  const panelData = useStoreState((state) => state.panelData);
  const panelDataFetched = useStoreState((state) => state.panelDataFetched);
  const weeklyMoneySaved = useStoreState((state) => state.weeklyMoneySaved).toFixed(1);
  const weeklyEmissionsReduced = useStoreState((state) => state.weeklyEmissionsReduced).toFixed(1);
  const weeklyEnergyProduced = useStoreState((state) => state.weeklyEnergyProduced).toFixed(1);
  const weeklyPeakPowerOutput = useStoreState((state) => state.weeklyPeakPowerOutput).toFixed(1);
  const todayData = panelData[panelData.length - 1];

  const liveData = useStoreState((state) => state.liveData);
  let currentOutput = 0;
  let diffOutput = 0;
  let efficiency = 0;
  if (Object.keys(liveData).length) {
    currentOutput = liveData.productions[liveData.productions.length - 1].power;
    diffOutput = currentOutput - liveData.productions[liveData.productions.length - 2].power;
    efficiency = liveData.peak_power === 0 ? 0 : ((currentOutput * 100) / liveData.peak_power).toFixed(0);
  }

  const showAllTimeData = useStoreState((state) => state.showAllTimeData);
  const setShowAllTimeData = useStoreActions((actions) => actions.setShowAllTimeData);
  const allTimeData = useStoreState((state) => state.allData)[0];

  const convertUnit = (value) => {
    const result = (value < 1000) ? value : value / 1000;
    const resultString = result.toFixed(1);
    return (value < 1000) ? `${resultString}` : `${resultString} k`;
  };

  const getTodayEfficiency = () => {
    const todayPeakOutput = panelData[panelData.length - 1].peak_power;

    let maximum = 0;
    const n = panelData.length;
    let count = 0;
    for (let i = n - 1; i > n - 8; i -= 1) {
      maximum += panelData[i].peak_power;
      count += 1;
    }
    const average = count === 0 ? 0 : maximum / count;
    return (average === 0 ? 0 : ((100 * todayPeakOutput) / average)).toPrecision(3);
  };

  const getAllTimeEfficiency = () => {
    // eslint-disable-next-line no-unused-vars
    const { averageGeneration, peakGeneration } = allTimeData;
    if (Number.isNaN(peakGeneration) || Number.isNaN(averageGeneration) || peakGeneration === 0 || !peakGeneration || !averageGeneration) {
      return 0;
    }
    return ((averageGeneration * 100) / peakGeneration).toPrecision(3);
  };

  const showPanelActivity = () => {
    const now = moment();
    const n = liveData.productions.length;
    const last = moment(liveData.productions[n - 1].date);
    const diff = now.diff(last, 'hours', true);

    if (diff < 2) {
      return (
        <span style={{ color: '#479D50' }}>
          {' active'}
        </span>
      );
    }
    return (
      <span style={{ color: '#EFA245' }}>
        {' inactive'}
      </span>
    );
  };

  return (
    <section id="dashboard">
      {panelDataFetched
      && (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SideNavBar />

        <Grid item xs={12} sm={12} md={11} component={Paper} elevation={0} square className={classes.dashboardGrid}>
          <div className={classes.dashboard}>
            <div className="weather">
              <img src={weather} alt="weather" />
            </div>
            <h3>Hello Kristina,</h3>
            <h1>
              Solar panels are currently
              {showPanelActivity()}
            </h1>
            <h5>
              {`Last Updated: ${lastUpdated}`}
            </h5>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <DailyReport currentOutput={currentOutput} diffOutput={diffOutput} efficiency={efficiency} />
              </div>

              <div className="four columns no-padding">
                <WeeklyReport moneySaved={weeklyMoneySaved} emissionsReduced={weeklyEmissionsReduced} energyProduced={weeklyEnergyProduced} powerOutput={weeklyPeakPowerOutput} />
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding margin-top-42">
                <button type="button" className={showAllTimeData ? 'toggle-scope-button' : 'toggle-scope-button-selected'} onClick={() => setShowAllTimeData(false)}>Today</button>
                <button type="button" className={showAllTimeData ? 'toggle-scope-button-selected' : 'toggle-scope-button'} onClick={() => setShowAllTimeData(true)}>All Time</button>
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <Summary
                  title="Max Output"
                  value={showAllTimeData ? `${allTimeData.peak_power / 1000 || 0} kW` : `${todayData.peak_power / 1000 || 0} kW`}
                />
              </div>

              <div className="six columns no-padding">
                <Summary
                  title="Energy Production"
                  value={`${convertUnit(showAllTimeData ? allTimeData.magnitude || 0 : todayData.magnitude || 0)}Wh`}
                />
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <Summary
                  title="Production Efficiency"
                  value={showAllTimeData ? `${getAllTimeEfficiency()} %` : `${getTodayEfficiency()} %`}
                />
              </div>

              <div className="six columns no-padding">
                <Summary
                  title="Emissions Reduced"
                  value={`${convertUnit(showAllTimeData ? allTimeData.carbon || 0 : todayData.carbon || 0)}g`}
                />
              </div>

              {/* <div className="six columns no-padding">
                <Summary
                  title="Money Saved"
                  value={showAllTimeData ? `$ ${allTimeData.money || 0}` : `$ ${todayData.money || 0}`}
                />
              </div> */}
            </div>
          </div>
        </Grid>
      </Grid>
      )}
    </section>
  );
}

export default Dashboard;
