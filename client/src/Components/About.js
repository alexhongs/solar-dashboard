import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class About extends Component {
  render() {
    return (
      <section id="about">
        <div className="row">
          <div className="twelve columns main-col">
            <h3> Clean Knowledge </h3>
            <h2> Solar Energy in Western PA: Fact vs. Fiction </h2>
          </div>

          <div className="twelve columns main-col">
            <h5>Solar Energy Overview</h5>

            <p>
              SOLAR ENERGY is conducted through a collection of solar panels (called a solar array)
              and a solar inverter – the former of which captures energy from the sun, and the latter
              of which converts the electric current from the solar panels into usable electricity for
              homes and businesses. Solar panels are built to last for decades. Their efficiency will
              drop over time, but many solar panels are guaranteed to produce over 80% of their original
              power after 25 years. For more information about the science and technicalities of solar
              panels, visit: https://solbridgeea.com/basics-of-solar.
            </p>

            <h5>It’s too cloudy in Pittsburgh. How can solar panels be feasible?</h5>

            <p>
              Solar panels actually work great in Western PA! Solar panels will still work even when the
              light is reflected or blocked by clouds and can function in both direct and indirect sunlight.
              Rain actually helps maintain the operations of your panels by washing away any dust or debris.
            </p>

            <p>
              Furthermore, a solar system in a cloudier area may produce less electricity than an otherwise
              identical solar system in a very sunny area. But if the electricity rates are higher in the cloudier
              area, that solar system could end up being a better investment than the one in the sunnier area. In
              Pittsburgh, residential electricity rates tend to be a few percentage points above the national average.
              That means it may cost you more to power your home in Pittsburgh than it would in other states. Solar
              can nearly erase that, dramatically reducing your electricity bill.
            </p>

            <h5>When can I get a return on my investment?</h5>

            <p>
              This depends on a variety of factors, such as how often your local electric company raises its rates and
              the growth in value of solar renewable energy credits in future years. Investing into solar energy is much
              like any other investment you make into your home, except solar panels will actively pay you back its cost
              many times over. Solar pays for itself, and then continues to deliver valuable electricity for decades. As
              energy rates go up, so does the value of the electricity you produce.
            </p>
          </div>

          <div className="twelve columns main-col">
            <h5>Isn’t solar super expensive?</h5>

            <p>
              While solar is a one-time large investment, you will now have full ownership over your electricity that can lead
              to long-term cash flow. This is in contrast to sourcing your electricity from a traditional electric company,
              where you rent the electricity you use, pay an electric bill monthly, and are subject to any rate increases by
              the electric company you rent electricity from.
            </p>

            <p>
              On a state level, Western PA solar owners can make additional income from their solar system through SRECs, or solar
              renewable energy credits. For every 1,000 kilowatt-hours of solar-generated electricity, the owner of the system
              will receive one SREC. They can then sell this SREC on the PA SREC market for market price. Furthermore, you may
              also qualify for the solar investment tax credit (ITC) when you install solar, which will deduct a certain
              percentage (26% for 2020-2022) of your solar investment cost from your federal taxes. This tax credit applies
              for both residential and commercial structures, and there is no upper limit on its value. These methods can
              help offset the initial cost of installing solar, while also providing solar owners an additional stream of income.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
