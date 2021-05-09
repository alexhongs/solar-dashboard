import React from 'react';

import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import red from '@material-ui/core/colors/red';
import {
  ThemeProvider, makeStyles, withStyles, createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    action: {
      disabledBackground: '#F5F3F6',
      disabled: '#479D50',
    },
  },
});

const useStyles = makeStyles(() => ({
  button: {
    margin: '0 auto',
    padding: '0',
    width: '100%',
    minWidth: '70px',
    fontSize: '20px',
    textTransform: 'none',
    backgroundColor: '#F5F3F6',
    borderRadius: '15px',
  },
  label: {
    // Aligns the content of the button vertically.
    flexDirection: 'column',
    fontSize: '14px',
  },
}));

const iconStyles = {
  root: {
    width: 42, height: 42, marginTop: 7, marginBottom: 2,
  },
};

const UpIcon = withStyles(iconStyles)(({ classes }) => <ArrowDropUpIcon classes={classes} />);
const DownIcon = withStyles(iconStyles)(({ classes }) => <ArrowDropDownIcon classes={classes} />);

function DailyReport(props) {
  const classes = useStyles();

  const { currentOutput, diffOutput, efficiency } = props;

  return (
    <section id="daily-report">
      <div className="row">
        <div className="five columns">
          <h3> Current Output </h3>
          <h1 className="pad-top-12">{currentOutput}</h1>
          <h3 className="margin-top-neg-20">kW</h3>
          <ThemeProvider theme={theme}>
            <Box m={3}>
              <Button dense disabled={diffOutput > 0} color="primary" classes={{ root: classes.button }}>
                {diffOutput > 0 ? <UpIcon /> : <DownIcon />}
                {`${diffOutput} kW`}
              </Button>
            </Box>
          </ThemeProvider>
        </div>

        <div className="seven columns">
          <h3 className="left-text"> Daily Report </h3>
          <h6 className="left-text pad-top-24">
            {' '}
            Your panels are working
            {' '}
            {efficiency}
            % of its full capacity
            {' '}
          </h6>
          <h6 className="left-text pad-top-24"> This could be attributed to today’s cloudy weather </h6>
        </div>
      </div>
    </section>
  );
}

export default DailyReport;
