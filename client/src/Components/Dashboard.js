import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import DailyReport from './Dashboard/DailyReport';
import WeeklyReport from './Dashboard/WeeklyReport';
import Summary from './Dashboard/Summary';
import weather from '../images/weather.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  nav: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? '#FFF' : '#FFF',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  selectedButton: {
    margin: '0 auto',
    width: '100%',
    minWidth: '42px',
    color: '#fff',
    backgroundColor: '#2E4B4B',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  button: {
    margin: '0 auto',
    width: '100%',
    minWidth: '42px',
    color: '#000',
  },
  logoutButton: {
    marginTop: '60vh',
    bottom: 0,
    color: '000',
    backgroundColor: '#fff',
    elevation: '0',
  },
  label: {
    // Aligns the content of the button vertically.
    flexDirection: 'column',
    fontSize: '14px',
  },
  icon: {
    fontSize: '32px !important',
    marginBottom: theme.spacing(1),
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

const iconStyles = {
  root: {
    width: 42, height: 42, marginTop: 12, marginBottom: 12,
  },
};

const IconDashboard = withStyles(iconStyles)(({ classes }) => <DashboardIcon classes={classes} />);
const IconAnalytics = withStyles(iconStyles)(({ classes }) => <AssessmentIcon classes={classes} />);
const IconShare = withStyles(iconStyles)(({ classes }) => <ShareIcon classes={classes} />);

function Dashboard() {
  const classes = useStyles();
  const panelData = useStoreState((state) => state.panelData);
  const panelDataFetched = useStoreState((state) => state.panelDataFetched);
  const weeklyMoneySaved = useStoreState((state) => state.weeklyMoneySaved).toFixed(1);
  const weeklyEmissionsReduced = useStoreState((state) => state.weeklyEmissionsReduced).toFixed(1);
  // TODO: Today's data?
  const todayData = panelData[panelData.length - 1];

  return (
    <section id="dashboard">
      {panelDataFetched
      && (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={1} className={classes.nav}>
          <Button
            dense
            color="primary"
            classes={{ root: classes.selectedButton, label: classes.label }}
          >
            <IconDashboard />
            Dashboard
          </Button>

          <Button
            dense
            color="primary"
            classes={{ root: classes.button, label: classes.label }}
            component={RouterLink}
            to="/analytics"
          >
            <IconAnalytics />
            Analytics
          </Button>

          <Button dense color="primary" classes={{ root: classes.button, label: classes.label }}>
            <IconShare />
            Share
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.logoutButton}
            component={RouterLink}
            to="/home"
          >
            Log out
          </Button>
        </Grid>

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
            <h5>Last Updated: 4:01pm</h5>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <DailyReport />
              </div>

              <div className="four columns no-padding">
                <WeeklyReport moneySaved={weeklyMoneySaved} emissionsReduced={weeklyEmissionsReduced} />
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding margin-top-42">
                <h4>Today</h4>
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <Summary
                  title="Energy Production"
                  value={`${todayData.magnitude || 0} kWh`}
                />
              </div>

              <div className="six columns no-padding">
                <Summary
                  title="Emissions Reduced"
                  value={`${todayData.carbon || 0} g`}
                />
              </div>
            </div>

            <div className="dashboard-row">
              <div className="six columns no-padding">
                <Summary
                  title="Production Efficiency"
                  value={`${todayData.efficiency || 0} %`}
                />
              </div>

              <div className="six columns no-padding">
                <Summary
                  title="Money Saved"
                  value={`$ ${todayData.money}`}
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
