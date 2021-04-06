import React, { Component } from 'react'
import logo from '../../src/images/logo.png'

class Header extends Component {
  render () {
    return (
      <header id='home'>
        <nav id='nav-wrap'>
          <a className='mobile-btn' href='#nav-wrap' title='Show navigation'>Show navigation</a>
          <a className='mobile-btn' href='#home' title='Hide navigation'>Hide navigation</a>

          <ul id='nav' className='nav'>
            <img src={logo} alt='logo' />
            <li className='current'><a className='smoothscroll' href='#home'>Home</a></li>
            <li><a className='smoothscroll' href='#about'>Facts vs. Fiction</a></li>
            <li><a className='smoothscroll' href='#portfolio'>Is Solar Right for You?</a></li>
            <li><a className='smoothscroll' href='https://solbridgeea.com/'>Visit Solbridge</a></li>
            <li><a className='smoothscroll' href='#visitsolbridge'>Log In</a></li>
          </ul>
        </nav>

        <div className='row banner'>
          <div className='banner-text'>
            <h1 className='responsive-headline'>Solar works in Western PA, and it can work for you too.</h1>
            <hr />
            <h3>Learn More</h3>
          </div>
        </div>

        <p className='scrolldown'>
          <a className='smoothscroll' href='#about'>
            <i className='icon-down-circle' />
          </a>
        </p>

      </header>
    )
  }
}

export default Header
