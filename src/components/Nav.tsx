import React from 'react';
import { Link } from 'react-router-dom';
// import Logo2 from '../images/Logo2.jpg'

const Nav = (props) => {
  return (
    <nav>
      <div className='logo-wrapper'>
        <img className='logo'  alt='Contractual logo' src='../assets/img/icon-white.png'/>
      </div>
      <ul className="nav-links">
        <Link to='/contractbuilder' style={{textDecoration: 'none'}}>
          <li>Contract</li>
        </Link>
        <Link to='/fronttester' style={{textDecoration: 'none'}}>
          <li>Frontend</li>
        </Link>
        <Link to='/backtester' style={{textDecoration: 'none'}}>
          <li>Backend</li>
        </Link>
        <Link to='/documentcreator' style={{textDecoration: 'none'}}>
          <li>Documentation</li>
        </Link>
      </ul>
    </nav>
  )

};


export default Nav;
