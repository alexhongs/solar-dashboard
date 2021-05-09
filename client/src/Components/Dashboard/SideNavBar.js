import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

const iconStyles = {
  root: {
    width: 42, height: 42, marginTop: 12, marginBottom: 12,
  },
};

const IconDashboard = withStyles(iconStyles)(({ classes }) => <DashboardIcon classes={classes} />);
const IconAnalytics = withStyles(iconStyles)(({ classes }) => <AssessmentIcon classes={classes} />);
const IconShare = withStyles(iconStyles)(({ classes }) => <ShareIcon classes={classes} />);

function SideNavBar() {
  const classes = useStyles();

  const resetDashboardData = useStoreActions((actions) => actions.resetDashboardData);

  async function handleLogout(event) {
    event.preventDefault();
    resetDashboardData();
    window.location.href = '/home';
  }

  return (
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
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Grid>
  );
}

export default SideNavBar;
