import React from 'react';
import { useStoreState } from 'easy-peasy';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import weather from '../images/weather.png';
import SideNavBar from './Dashboard/SideNavBar';
import ProductionChart from './Analytics/ProductionChart';

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
  chart: {
    padding: '0.5vh 2vw 0 2vw',
    margin: theme.spacing(5, 4),
  },
}));

function Analytics() {
  const classes = useStyles();
  const panelData = useStoreState((state) => state.panelData);

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
              {panelData[panelData.length - 1].date}
            </h5>

            <div className="chart-wrapper">
              <ProductionChart className={classes.chart} data={panelData} />
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Analytics;
