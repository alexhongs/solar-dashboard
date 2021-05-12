import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// import {
//   Chart,
//   BarSeries,
//   ArgumentAxis,
//   ValueAxis,
// } from '@devexpress/dx-react-chart-material-ui';
// import { Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    padding: '2vh 5vw 0 5vw',
    borderRadius: '27px',
  },
  button: {
    borderRadius: '25px',
    color: '#727272',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
    margin: theme.spacing(5, 1, 5, 0),
  },
  selectButton: {
    backgroundColor: '#2E4B4B',
    borderRadius: '25px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#FFD600',
    },
    margin: theme.spacing(5, 1, 5, 0),
  },
}));

function ProductionChart() {
  const classes = useStyles();
  // const { data } = props;

  const selectedPeriod = useStoreState((state) => state.selectedPeriod);
  const setSelectedPeriod = useStoreActions((actions) => actions.setSelectedPeriod);

  return (
    <Paper className={classes.root}>
      <div className="fullrow">
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={selectedPeriod === 'live' ? classes.selectButton : classes.button}
          onClick={() => setSelectedPeriod('live')}
        >
          Live
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          className={selectedPeriod === 'day' ? classes.selectButton : classes.button}
          onClick={() => setSelectedPeriod('day')}
        >
          Day
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          className={selectedPeriod === 'week' ? classes.selectButton : classes.button}
          onClick={() => setSelectedPeriod('week')}
        >
          Week
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          className={selectedPeriod === 'month' ? classes.selectButton : classes.button}
          onClick={() => setSelectedPeriod('month')}
        >
          Month
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          className={selectedPeriod === 'year' ? classes.selectButton : classes.button}
          onClick={() => setSelectedPeriod('year')}
        >
          Year
        </Button>
      </div>

      {/* <Chart
        data={data.slice(data.length - 7, data.length)}
      >
        <ArgumentAxis
          title="Axis Title"
        />
        <ValueAxis max={7} />

        <BarSeries
          valueField="magnitude"
          argumentField="date"
          color="#FFD600"
        />

        <Animation />
      </Chart> */}
    </Paper>
  );
}

export default ProductionChart;
