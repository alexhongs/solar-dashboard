import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  yellow, orange, blue, lightGreen,
} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import NatureOutlinedIcon from '@material-ui/icons/NatureOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  yellow: {
    color: '#000',
    backgroundColor: yellow[500],
    margin: theme.spacing(0.5, -1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  orange: {
    color: '#000',
    backgroundColor: orange[500],
    margin: theme.spacing(0.5, -1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  blue: {
    color: '#000',
    backgroundColor: blue[500],
    margin: theme.spacing(0.5, -1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  green: {
    color: '#000',
    backgroundColor: lightGreen[500],
    margin: theme.spacing(0.5, -1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  title: {
    margin: theme.spacing(0, 2),
  },
}));

function Icon(title, classes) {
  switch (title) {
    case 'Energy Production':
      return (
        <Avatar className={classes.yellow}>
          <FlashOnOutlinedIcon />
        </Avatar>
      );

    case 'Emissions Reduced':
      return (
        <Avatar className={classes.orange}>
          <NatureOutlinedIcon />
        </Avatar>
      );

    case 'Production Efficiency':
      return (
        <Avatar className={classes.blue}>
          <SettingsOutlinedIcon />
        </Avatar>
      );

    default:
      return (
        <Avatar className={classes.green}>
          <AttachMoneyOutlinedIcon />
        </Avatar>
      );
  }
}

function Summary(props) {
  const classes = useStyles();
  const { title, value } = props;

  return (
    <section id="summary">
      <div className="row">
        <div className="two columns">
          <div className="row">
            <div className="two columns">
              {Icon(title, classes)}
            </div>
            <div className="two columns">
              <h3 className={classes.title}>{title}</h3>
            </div>
          </div>
        </div>

        <div className="four columns align-right">
          <p>Your Total</p>
          <h3>{value}</h3>
        </div>
      </div>
    </section>
  );
}

export default Summary;
