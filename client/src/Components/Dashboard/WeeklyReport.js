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

function WeeklyReport(props) {
  const classes = useStyles();
  const {
    moneySaved, emissionsReduced, energyProduced, powerOutput,
  } = props;

  const convertUnit = (value) => {
    const result = (value < 1000) ? value : value / 1000;
    const resultString = result.toFixed(1);
    return (value < 1000) ? `${resultString}` : `${resultString} k`;
  };

  return (
    <section id="weekly-report">
      <div className="row">
        <div className="twelve columns">
          <h3> Your Last 7 Days </h3>

          <div className="row">
            <div className="six columns no-padding">
              <h6 className="left-text pad-top-24">Energy Produced</h6>
            </div>

            <div className="six columns no-padding">
              <ThemeProvider theme={theme}>
                <Box m={1}>
                  <Button dense disabled={moneySaved > 0} color="primary" classes={{ root: classes.button }}>
                    {moneySaved > 0 ? <UpIcon /> : <DownIcon />}
                    {`${convertUnit(energyProduced)}Wh`}
                  </Button>
                </Box>
              </ThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="six columns no-padding">
              <h6 className="left-text pad-top-24">Emissions Reduced</h6>
            </div>

            <div className="six columns no-padding">
              <ThemeProvider theme={theme}>
                <Box m={1}>
                  <Button dense disabled={emissionsReduced > 0} color="primary" m={1} classes={{ root: classes.button }}>
                    {emissionsReduced > 0 ? <UpIcon /> : <DownIcon />}
                    {`${convertUnit(emissionsReduced)}g`}
                  </Button>
                </Box>
              </ThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="six columns no-padding">
              <h6 className="left-text pad-top-24">Max Output</h6>
            </div>

            <div className="six columns no-padding">
              <ThemeProvider theme={theme}>
                <Box m={1}>
                  <Button dense disabled color="primary" classes={{ root: classes.button }}>
                    <UpIcon />
                    {`${powerOutput / 1000} kW`}
                  </Button>
                </Box>
              </ThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="six columns no-padding">
              <h6 className="left-text pad-top-24">Estimated Money Saved</h6>
            </div>

            <div className="six columns no-padding">
              <ThemeProvider theme={theme}>
                <Box m={1}>
                  <Button dense disabled color="primary" classes={{ root: classes.button }}>
                    <UpIcon />
                    {`$ ${moneySaved}`}
                  </Button>
                </Box>
              </ThemeProvider>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WeeklyReport;
