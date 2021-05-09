import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

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

  const liveData = useStoreState((state) => state.liveData);
  let currentOutput = 0;
  let diffOutput = 0;
  let efficiency = 0;
  if (Object.keys(liveData).length) {
    currentOutput = liveData.productions[liveData.productions.length - 1].production;
    diffOutput = liveData.peak_power - currentOutput;
    efficiency = liveData.efficiency || 0;
  }

  const panelData = useStoreState((state) => state.panelData);
  const panelDataFetched = useStoreState((state) => state.panelDataFetched);
  const weeklyMoneySaved = useStoreState((state) => state.weeklyMoneySaved).toFixed(1);
  const weeklyEmissionsReduced = useStoreState((state) => state.weeklyEmissionsReduced).toFixed(1);
  // TODO: Today's data?
  const todayData = panelData[panelData.length - 1];

  const showAllTimeData = useStoreState((state) => state.showAllTimeData);
  const setShowAllTimeData = useStoreActions((actions) => actions.setShowAllTimeData);

  const allTimeData = useStoreState((state) => state.allData)[0];

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
              <span style={{ color: '#479D50' }}> active </span>
            </h1>
            <h5>
              Last Updated:&nbsp;
              {liveData.productions[liveData.productions.length - 1].date}
            </h5>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <DailyReport currentOutput={currentOutput} diffOutput={diffOutput} efficiency={efficiency} />
              </div>

              <div className="four columns no-padding">
                <WeeklyReport moneySaved={weeklyMoneySaved} emissionsReduced={weeklyEmissionsReduced} />
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
                  title="Energy Production"
                  value={showAllTimeData ? `${allTimeData.magnitude || 0} kWh` : `${todayData.magnitude || 0} kWh`}
                />
              </div>

              <div className="six columns no-padding">
                <Summary
                  title="Emissions Reduced"
                  value={showAllTimeData ? `${allTimeData.carbon || 0} g` : `${todayData.carbon || 0} g`}
                />
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <Summary
                  title="Production Efficiency"
                  value={showAllTimeData ? `${allTimeData.efficiency || 0} %` : `${todayData.efficiency || 0} %`}
                />
              </div>

              <div className="six columns no-padding">
                <Summary
                  title="Money Saved"
                  value={showAllTimeData ? `$ ${allTimeData.money || 0}` : `$ ${todayData.money || 0}`}
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      )}
    </section>
  );
}

export default Dashboard;
