import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import city from '../images/city.png';
import register1 from '../images/register-1.png';
import register2 from '../images/register-2.png';
import register3 from '../images/register-3.png';

import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://images.unsplash.com/photo-1545208942-e1c9c916524b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? '#EAF2FE' : '#EAF2FE',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  instructions: {
    padding: '20vh 24px 0 24px',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: '12vh 17vw 0 17vw',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    color: '#fff',
    backgroundColor: '#253A2C',
    margin: theme.spacing(7, 0, 2),
    '&:hover': {
      color: '#fff',
      background: '#399457',
    },
  },
  solaredge: {
    margin: theme.spacing(2, 0, 2),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderBottom: '2px solid lightgray',
    width: '100%',
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    fontWeight: 500,
    fontSize: 15,
    color: 'gray',
  },
}));

function LeftPanel(registerStep) {
  switch (registerStep) {
    case 0:
      return (
        <>
          <h5>Instructions on getting API Code</h5>
          <ol>
            <li key="1">Log in to your PVOutput</li>
            <li key="2">Go to Settings</li>
            <li key="3">On the bottom of the Settings page, Click API Access and click Enable</li>
            <li key="4">Click on New Key button</li>
            <li key="5">Copy the key and Paste it here</li>
          </ol>

          <h5>Instructions on getting System Id</h5>
          <ol>
            <li key="1">On the bottom of the Settings page, under Registered Systems</li>
            <li key="2">Find the 4 to 5 digit System Id</li>
          </ol>

          <div className="city">
            <img className="city" src={city} alt="city" />
          </div>
        </>
      );
    default:
      return (
        <>
          <h2 className="pad-top-120">Monitor Your System </h2>
          <h5 className="pad-top-24">View your production, savings, and cumulative history all on one dashboard.</h5>
        </>
      );
  }
}

function RightPanel(classes, registerStep, incrementRegisterStep, setAPICode, setSystemId,
  setMoneyInvested, setEmail, setPassword, setConfirmPassword) {
  switch (registerStep) {
    case 0:
      return (
        <>
          <img className="" src={register1} alt="indicator" />
          <h5 className="pad-top-42">To get started, select your inverter and enter the API Code you received from Solbridge</h5>
          <div className="row">
            <div className="four columns">
              <button
                type="button"
                className="active-provider-button btn"
              >
                PVOutput
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className="provider-button btn"
              >
                SunnyPortal
              </button>
            </div>

            <div className="four columns">
              <button
                type="button"
                className="provider-button btn"
              >
                SolarEdge
              </button>
            </div>
          </div>

          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="APICode"
            label=""
            name="APICode"
            placeholder="API Code"
            onChange={(event) => setAPICode(event.target.value)}
          />

          <h5 className="pad-top-42">Enter your System Id</h5>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="systemId"
            label=""
            name="systemId"
            placeholder="System Id (4 to 5 digit number)"
            onChange={(event) => setSystemId(event.target.value)}
          />

          <button
            type="button"
            className="next-button btn"
            onClick={() => incrementRegisterStep()}
          >
            Next
          </button>

          <Link className="pad-top-42" href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </>
      );
    case 1:
      return (
        <>
          <img className="" src={register2} alt="indicator" />
          <h5 className="pad-top-120 center-text">To help us set goals for you, please provide how much you have invested on your Solar Panel</h5>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="moneyInvested"
            label=""
            name="moneyInvested"
            placeholder="$ 0"
            autoFocus
            onChange={(event) => setMoneyInvested(event.target.value)}
          />

          <div className="row">
            <div className="six columns center-text">
              <button
                type="button"
                className="skip-button btn"
                onClick={() => incrementRegisterStep()}
              >
                Skip
              </button>
            </div>

            <div className="six columns center-text">
              <button
                type="button"
                className="next-button btn"
                onClick={() => incrementRegisterStep()}
              >
                Next
              </button>
            </div>
          </div>
        </>
      );
    default:
      return (
        <>
          <img className="" src={register3} alt="indicator" />

          <Grid container>
            <Grid item xs>
              <h6 className="pad-top-42 left-text">Name</h6>
            </Grid>
            <Grid item />
          </Grid>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="APICode"
            label=""
            name="APICode"
            placeholder=""
            autofocus
            onChange={(event) => setAPICode(event.target.value)}
          />

          <Grid container>
            <Grid item xs>
              <h6 className="pad-top-24 left-text">Email</h6>
            </Grid>
            <Grid item />
          </Grid>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <Grid container>
            <Grid item xs>
              <h6 className="pad-top-24 left-text">Set Password</h6>
            </Grid>
            <Grid item />
          </Grid>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Grid container>
            <Grid item xs>
              <h6 className="pad-top-24 left-text">Confirm Password</h6>
            </Grid>
            <Grid item />
          </Grid>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            component={RouterLink}
            to="/dashboard"
          >
            Create Account
          </Button>
        </>
      );
  }
}

function SignUp() {
  const classes = useStyles();

  const registerStep = useStoreState((state) => state.registerStep);
  const incrementRegisterStep = useStoreActions((actions) => actions.incrementRegisterStep);
  const setAPICode = useStoreActions((actions) => actions.setAPICode);
  const setSystemId = useStoreActions((actions) => actions.setSystemId);
  const setMoneyInvested = useStoreActions((actions) => actions.setMoneyInvested);
  const setEmail = useStoreActions((actions) => actions.setEmail);
  const setPassword = useStoreActions((actions) => actions.setPassword);
  const setConfirmPassword = useStoreActions((actions) => actions.setConfirmPassword);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Grid item xs={false} sm={4} md={3} className={classes.image}>
        <div className={classes.instructions}>
          {LeftPanel(registerStep)}
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={9} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1>Create an Account</h1>
          {RightPanel(classes, registerStep, incrementRegisterStep, setAPICode, setSystemId,
            setMoneyInvested, setEmail, setPassword, setConfirmPassword)}
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUp;
