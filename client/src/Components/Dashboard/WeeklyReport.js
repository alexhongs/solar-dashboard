import React from 'react';

import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Box from '@material-ui/core/Box';
import {
  ThemeProvider, makeStyles, withStyles, createMuiTheme,
} from '@material-ui/core/styles';

// import PanelData from '../../services/panelData';

const theme = createMuiTheme({
  palette: {
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

function WeeklyReport() {
  const classes = useStyles();
  // const { panelData } = props;

  // function compareMoneySaved(data) {
  //   console.log(data);
  //   const mid = Math.ceil(data.length / 2);
  //   const firstHalf = data.splice(0, mid);
  //   const secondHalf = data.splice(-mid);

  //   console.log(firstHalf);
  //   const firstHalfSum = firstHalf.reduce((a, b) => a + (b.money || 0), 0);
  //   const secondHalfSum = secondHalf.reduce((a, b) => a + (b.money || 0), 0);

  //   return secondHalfSum - firstHalfSum;
  // }

  return (
    <section id="weekly-report">
      <div className="row">
        <div className="twelve columns">
          <h3> Your Last 7 Days </h3>

          <div className="row">
            <div className="eight columns no-padding">
              <h6 className="left-text pad-top-24">Money Saved</h6>
            </div>

            <div className="four columns no-padding">
              <ThemeProvider theme={theme}>
                <Box m={0}>
                  <Button dense disabled color="primary" classes={{ root: classes.button }}>
                    <UpIcon />
                    $12
                  </Button>
                </Box>
              </ThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="eight columns no-padding">
              <h6 className="left-text pad-top-24">Emissions Reduced</h6>
            </div>

            <div className="four columns no-padding">
              <ThemeProvider theme={theme}>
                <Box m={1}>
                  <Button dense disabled color="primary" m={1} classes={{ root: classes.button }}>
                    <UpIcon />
                    2 g
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
