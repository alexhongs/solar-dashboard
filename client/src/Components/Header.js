import React, { Component } from 'react'
import tagline from '../images/tagline.png'

class Header extends Component {
  render () {
    return (
      <header id='home'>
        <nav id='nav-wrap'>
          <a className='mobile-btn' href='#nav-wrap' title='Show navigation'>Show navigation</a>
          <a className='mobile-btn' href='#home' title='Hide navigation'>Hide navigation</a>

          <ul id='nav' className='nav'>
            <li className='current'><a className='smoothscroll' href='#home'>Home</a></li>
            <li><a className='smoothscroll' href='#about'>Facts vs. Fiction</a></li>
            <li><a className='smoothscroll' href='#quiz'>Is Solar Right for You?</a></li>
            <li><a className='smoothscroll' href='https://solbridgeea.com/'>Visit Solbridge</a></li>
            <li><a className='smoothscroll' id='login-button' href='#auth'>Log In</a></li>
          </ul>
        </nav>

        <div className='row banner'>
          <div className='banner-text'>
            <img className='tagline' src={tagline} alt='tagline' />
            <h1 className='responsive-headline'>Solar works in Western PA,</h1>
            <h1 className='responsive-headline'>and it can work for you too.</h1>
            <hr />
            <button type='button' class='btn btn-success'>See If It Does</button>
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
