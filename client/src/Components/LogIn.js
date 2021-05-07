import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
// import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1545208942-e1c9c916524b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    padding: '7vh 50px 0 50px',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
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
    margin: theme.spacing(3, 0, 2),
    '&:hover': {
      color: '#fff',
      background: '#399457',
    },
  },
  solaredge: {
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid black',
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

const DividerWithText = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>{children}</span>
      <div className={classes.border} />
    </div>
  );
};

function Login() {
  const classes = useStyles();

  const panelDataFetched = useStoreState((state) => state.panelDataFetched);
  const liveDataFetched = useStoreState((state) => state.liveDataFetched);
  const setLoginEmail = useStoreActions((actions) => actions.setLoginEmail);
  const setLoginPassword = useStoreActions((actions) => actions.setLoginPassword);
  const setPanelDataAsync = useStoreActions((actions) => actions.setPanelDataAsync);

  async function handleLogin(event) {
    event.preventDefault();

    if (panelDataFetched && liveDataFetched) {
      window.location.href = '/dashboard';
    } else {
      setPanelDataAsync();
    }
  }

  return (
    <section id="auth">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <NavBar />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <h1>Let’s access your solar data</h1>
            <h7>Thank you for helping our environment! Please login with the information you were provided with after installing your solar products.</h7>
            <form className={classes.form} noValidate>
              <h4 className="pad-top-42">Username</h4>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="username"
                label=""
                name="username"
                placeholder="Email address or phone number"
                autoFocus
                onChange={(event) => setLoginEmail(event.target.value)}
              />
              <h4 className="pad-top-24">Password</h4>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="password"
                label=""
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(event) => setLoginPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
                // component={RouterLink}
                // to="/dashboard"
              >
                Sign In
              </Button>

              <DividerWithText>or</DividerWithText>

              <Button
                type="button"
                fullWidth
                variant="contained"
                className={classes.solaredge}
              >
                SolarEdge
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/signup" variant="body2">
                    Sign Up
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://solbridgeea.com/" variant="body2">
                    If you need help, Contact Us
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Login;
