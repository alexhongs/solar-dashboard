import React, { Component } from 'react'
import solarfact1 from '../images/solar-fact-1.png'
import solarfact2 from '../images/solar-fact-2.png'
import solarfactgraph from '../images/solar-fact-graph.png'

class About extends Component {
  render () {
    return (
      <section id='about'>
        <div className='row'>
          <div className='twelve columns main-col'>
            <h3> Clean Knowledge </h3>
            <h2> Solar Energy in Western PA: Fact vs. Fiction </h2>
          </div>

          <div className='six columns main-col'>
            <img className='solar-facts' src={solarfact1} alt='solarfact1' />
          </div>

          <div className='six columns main-col'>
            <img className='solar-facts' src={solarfact2} alt='solarfact2' />
          </div>

          <div className='six columns main-col'>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, tellus ac ullamcorper
              vehicula, magna ipsum sodales sapien, sed interdum augue leo eu augue. Suspendisse ligula nunc,
              facilisis quis iaculis posuere, pretium id velit. Aenean ac pretium nisl. In nunc ex, aliquet a
              dignissim vitae, tempus ac risus. Nunc blandit venenatis risus sed elementum. Vestibulum ac faucibus
              justo, id tempus libero. Curabitur quis aliquam tellus.
            </p>

            <h5>Isn't solar super expensive?</h5>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, tellus ac ullamcorper
              vehicula, magna ipsum sodales sapien, sed interdum augue leo eu augue. Suspendisse ligula nunc,
              facilisis quis iaculis posuere, pretium id velit. Aenean ac pretium nisl. In nunc ex, aliquet a
              dignissim vitae, tempus ac risus. Nunc blandit venenatis risus sed elementum. Vestibulum ac faucibus
              justo, id tempus libero. Curabitur quis aliquam tellus.
            </p>
          </div>

          <div className='six columns main-col'>
            <h5>When can I get a return on my investment?</h5>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, tellus ac ullamcorper
              vehicula, magna ipsum sodales sapien, sed interdum augue leo eu augue. Suspendisse ligula nunc,
              facilisis quis iaculis posuere, pretium id velit. Aenean ac pretium nisl. In nunc ex, aliquet a
              dignissim vitae, tempus ac risus. Nunc blandit venenatis risus sed elementum. Vestibulum ac faucibus
              justo, id tempus libero. Curabitur quis aliquam tellus.
            </p>

            <img className='solar-facts' src={solarfactgraph} alt='solarfactgraph' />
          </div>
        </div>
      </section>
    )
  }
}

export default About
