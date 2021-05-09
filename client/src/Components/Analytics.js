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
    marginTop: '62vh',
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
    marginBottom: theme.spacing.unit,
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

function Analytics() {
  const classes = useStyles();
  const panelData = useStoreState((state) => state.panelData);

  return (
    <section id="dashboard">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={1} className={classes.nav}>
          <Button
            dense
            color="primary"
            classes={{ root: classes.button, label: classes.label }}
            component={RouterLink}
            to="/dashboard"
          >
            <IconDashboard />
            Dashboard
          </Button>

          <Button dense color="primary" classes={{ root: classes.selectedButton, label: classes.label }}>
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
            <h1>Your Energy Production</h1>
            <h5>
              {' '}
              Last Updated:&nbsp;
              {panelData[panelData.length - 1].date}
            </h5>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Analytics;
