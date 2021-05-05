import React from 'react';

import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {
  ThemeProvider, makeStyles, withStyles, createMuiTheme,
} from '@material-ui/core/styles';

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
    width: '100%',
    minWidth: '70px',
    fontSize: '20px',
    textTransform: 'none',
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

function DailyReport() {
  const classes = useStyles();

  return (
    <section id="daily-report">
      <div className="row">
        <div className="five columns">
          <h3> Current Output </h3>
          <h1 className="pad-top-24">5.1</h1>
          <h3>kW</h3>
          <ThemeProvider theme={theme}>
            <Button dense disabled color="primary" classes={{ root: classes.button }}>
              <UpIcon />
              1.1kW
            </Button>
          </ThemeProvider>
        </div>

        <div className="seven columns">
          <h3 className="left-text"> Daily Report </h3>
          <h6 className="left-text pad-top-24"> Your panels are working 45% of its full capacity   </h6>
          <h6 className="left-text pad-top-24"> This could be attributed to today’s cloudy weather </h6>
        </div>
      </div>
    </section>
  );
}

export default DailyReport;
