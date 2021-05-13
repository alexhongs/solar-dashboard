import React from 'react';
import { useStoreState } from 'easy-peasy';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import weather from '../images/weather.png';
import SideNavBar from './Dashboard/SideNavBar';
import ProductionChart from './Analytics/ProductionChart';

const moment = require('moment');

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

function Analytics() {
  const classes = useStyles();

  const selectedPeriod = useStoreState((state) => state.selectedPeriod);
  // const liveData = useStoreState((state) => state.liveData);
  const panelData = useStoreState((state) => state.panelData);
  const weekData = useStoreState((state) => state.weekData);
  const monthData = useStoreState((state) => state.monthData);
  const yearData = useStoreState((state) => state.yearData);

  function processData() {
    switch (selectedPeriod) {
      default:
        return panelData.map((data, i) => {
          if (i === 14) {
            return (
              {
                magnitude: data.magnitude / 1000,
                date: 'Today',
              }
            );
          }
          return (
            {
              magnitude: data.magnitude / 1000,
              date: moment(data.date).local().format('MM-DD'),
            }
          );
        });

      case 'week':
        return weekData.map((data, i) => {
          if (i === 5) {
            return (
              {
                magnitude: data.magnitude / 1000,
                date: 'This week',
              }
            );
          }
          return (
            {
              magnitude: data.magnitude / 1000,
              date: moment(data.date).local().format('MM-DD'),
            }
          );
        });

      case 'month':
        return monthData.map((data, i) => {
          if (i === 11) {
            return (
              {
                magnitude: data.magnitude,
                date: 'This month',
              }
            );
          }
          return (
            {
              magnitude: data.magnitude,
              date: moment(data.date).local().format('YYYY-MM'),
            }
          );
        });

      case 'year':
        return yearData.map((data) => (
          {
            magnitude: data.magnitude,
            date: moment(data.date).local().format('YYYY'),
          }
        ));
    }
  }

  return (
    <section id="dashboard">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SideNavBar />

        <Grid item xs={12} sm={12} md={11} component={Paper} elevation={0} square className={classes.dashboardGrid}>
          <div className={classes.dashboard}>
            <div className="weather">
              <img src={weather} alt="weather" />
            </div>
            <h1>Your Energy Production</h1>
            <h5>
              {' '}
              Last Updated:&nbsp;
              {moment(panelData[panelData.length - 1].date).local().format('h:mm a z')}
            </h5>

            <div className="chart-wrapper">
              <ProductionChart className={classes.chart} data={processData(selectedPeriod)} />
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Analytics;
