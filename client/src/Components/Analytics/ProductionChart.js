import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: 'auto',
    padding: '2vh 5vw 0 5vw',
  },
}));

function ProductionChart(props) {
  const classes = useStyles();

  const { data } = props;
  console.log(data);

  return (
    <Paper className={classes.root}>
      <Chart
        data={data.slice(data.length - 7, data.length)}
      >
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries
          valueField="magnitude"
          argumentField="date"
          color="#FCD980"
        />

        <Legend position="top" />
        <Animation />
      </Chart>
    </Paper>
  );
}

export default ProductionChart;
