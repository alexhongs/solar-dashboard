import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    position: 'static',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    color: '#626262',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

// eslint-disable-next-line react/prefer-stateless-function
function About() {
  const classes = useStyles();

  return (
    <section id="about">
      <div className="row">
        <div className="twelve columns main-col">
          <h3> Clean Knowledge </h3>
          <h2> Solar Energy in Western PA: Fact vs. Fiction </h2>
        </div>

        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h4>Solar Energy Overview</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                SOLAR ENERGY is conducted through a collection of solar panels (called a solar array)
                and a solar inverter – the former of which captures energy from the sun, and the latter
                of which converts the electric current from the solar panels into usable electricity for
                homes and businesses. Solar panels are built to last for decades. Their efficiency will
                drop over time, but many solar panels are guaranteed to produce over 80% of their original
                power after 25 years. For more information about the science and technicalities of solar
                panels, visit: https://solbridgeea.com/basics-of-solar.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>It’s too cloudy in Pittsburgh. How can solar panels be feasible?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Solar panels actually work great in Western PA! Solar panels will still work even when the
                light is reflected or blocked by clouds and can function in both direct and indirect sunlight.
                Rain actually helps maintain the operations of your panels by washing away any dust or debris.
                <br />
                <br />
                Furthermore, a solar system in a cloudier area may produce less electricity than an otherwise
                identical solar system in a very sunny area. But if the electricity rates are higher in the cloudier
                area, that solar system could end up being a better investment than the one in the sunnier area. In
                Pittsburgh, residential electricity rates tend to be a few percentage points above the national average.
                That means it may cost you more to power your home in Pittsburgh than it would in other states. Solar
                can nearly erase that, dramatically reducing your electricity bill.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>When can I get a return on my investment?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                This depends on a variety of factors, such as how often your local electric company raises its rates and
                the growth in value of solar renewable energy credits in future years. Investing into solar energy is much
                like any other investment you make into your home, except solar panels will actively pay you back its cost
                many times over. Solar pays for itself, and then continues to deliver valuable electricity for decades. As
                energy rates go up, so does the value of the electricity you produce.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>Isn’t solar super expensive?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Solar panels actually work great in Western PA! Solar panels will still work even when the
                light is reflected or blocked by clouds and can function in both direct and indirect sunlight.
                Rain actually helps maintain the operations of your panels by washing away any dust or debris.
                <br />
                <br />
                On a state level, Western PA solar owners can make additional income from their solar system through SRECs, or solar
                renewable energy credits. For every 1,000 kilowatt-hours of solar-generated electricity, the owner of the system
                will receive one SREC. They can then sell this SREC on the PA SREC market for market price. Furthermore, you may
                also qualify for the solar investment tax credit (ITC) when you install solar, which will deduct a certain
                percentage (26% for 2020-2022) of your solar investment cost from your federal taxes. This tax credit applies
                for both residential and commercial structures, and there is no upper limit on its value. These methods can
                help offset the initial cost of installing solar, while also providing solar owners an additional stream of income.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default About;
