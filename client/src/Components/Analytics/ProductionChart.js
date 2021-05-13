import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    padding: '0vh 5vw 3vh 5vw',
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
  legend: {
    float: 'right',
    margin: theme.spacing(5, 0, 0, 0),
  },
  legendButton: {
    height: '24px',
    width: '10px',
    marginRight: '12px',
    backgroundColor: '#FFD600',
    borderRadius: '25px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#FFD600',
    },
    '&:disable': {
      boxShadow: 'none',
      backgroundColor: '#FFD600',
    },
  },
}));

function ProductionChart(props) {
  const classes = useStyles();
  const { data } = props;

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

        <Typography variant="subtitle1" component="h2" className={classes.legend}>
          <Button className={classes.legendButton} disabled />
          Production
        </Typography>
      </div>

      <div className="fullrow">
        <Typography variant="subtitle1" component="h2">
          kWh
        </Typography>
      </div>

      <Chart
        data={selectedPeriod === 'live' ? data.slice(data.length - 12, data.length) : data}
      >
        <ArgumentAxis
          title="Axis Title"
          max={selectedPeriod === 'day' ? 7 : 12}
        />
        <ValueAxis max={selectedPeriod === 'day' ? 7 : 12} />

        <BarSeries
          valueField="magnitude"
          argumentField="date"
          color="#FFD600"
        />

        <Animation />
      </Chart>
    </Paper>
  );
}

export default ProductionChart;
