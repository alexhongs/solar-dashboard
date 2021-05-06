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
              <h4>Does solar really make sense in Western PA?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <b>YES!</b>
                It is no secret that our region tends to be dreary and overcast,
                but here’s the good news: solar panels do not require direct sunlight
                to generate energy! Just as it’s possible to get a sunburn on a cloudy
                day, solar panels can still produce lots of energy when the sky is overcast.
                <br />
                <br />
                Take Germany as an example- Germany gets significantly less sunlight
                than our region, yet they are still the highest per-capita solar
                producer in the world. Facts!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>How does solar work?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Solar panels work by absorbing sunlight with thin photovoltaic cells.
                The sun’s rays excite electrons in the solar cells, generating direct
                current (DC) energy. An inverter is then used to convert this energy
                into alternating current (AC) electricity that can be used to power
                your home or office. This electricity is either used immediately by you,
                or transferred through your meter onto the grid. Excess energy produced
                by your solar system is exchanged for energy credits through a net
                metering program with your utility company.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>What is net metering, and how does it work?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Net metering allows consumers who generate some or all of their
                own electricity to use that electricity anytime, instead of when
                it is generated. Over the course of a day, your solar system may
                overproduce in the afternoon, exporting energy to the grid and
                generating energy credits to be used at night. Over a year, you
                may overproduce in the summer months and use those credits in the
                winter. At the end of the year, you may even receive a check from
                your utility company for excess power you’ve produced. Net metering
                essentially allows you to use the grid as a battery for your solar
                system.

              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>Am I still connected to the power grid if I have a solar system?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Generally, yes. Unless you have a means of storing large amounts
                of excess energy, it makes the most sense to stay connected to
                the grid. With the help of net metering, the energy you generate
                always has a place to go (like a giant battery), and you always
                have access to that energy at no additional cost.

              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>Should I add battery storage to my solar system?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Batteries are becoming a more and more affordable and practical
                solution for energy storage in homes and businesses. Until recently,
                large-scale batteries have been too expensive to be practical
                for most applications. However, manufacturing improvements and
                technical advancements have brought this cost down and batteries
                have begun to penetrate the mass market. In the current local energy
                market, batteries are worth considering for solar producers who want
                an electrical backup system that does not rely on fossil fuels in
                the event of a power outage.
                <br />
                <br />
                Some commercial and industrial applications also make batteries profitable,
                as they allow peak load reduction, which can reduce total energy costs
                significantly. A thorough analysis of energy usage and billing is required
                to determine if batteries can provide a financial benefit for your home
                or business.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>Are solar panels fragile?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <b>No!</b>
                In fact, solar panels are one of the most durable and reliable energy
                technologies in the world. While the solar cells themselves are very fragile,
                the glass and frame that surround them are incredibly sturdy. From 90+ mph
                wind, to medium-sized tree limbs, to hail the size of golf balls, solar panels
                are specifically tested and designed to withstand severe weather events and
                incidental impacts.

              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h4>How long do solar panels last?</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                All solar panels degrade slightly over time (0.7% per year, on average).
                Depending on certain environmental conditions, solar panels can remain
                productive for anywhere from 30-45 years, or even longer in many cases.
                Inverters need to be replaced more frequently, with a projected lifespan
                of 20-25 years for current models. Inverter replacement costs are included
                in most financial models for solar installations, and represent a
                relatively small expense for decades of continued production from
                your solar system.

              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default About;
