import React from 'react';
import { Link } from 'react-router-dom';
// import Logo2 from '../images/Logo2.jpg'

const Nav = (props) => {
  return (
    <nav>
        <img className="logo"  alt="Contractual logo"/>
      <ul className="nav-links">
        <Link to='/contractbuilder' style={{textDecoration: 'none'}}>
          <li>Contract Builder</li>
        </Link>
        <Link to='/fronttester' style={{textDecoration: 'none'}}>
          <li>Front End Tests</li>
        </Link>
        <Link to='/backtester' style={{textDecoration: 'none'}}>
          <li>Back End Tests</li>
        </Link>
        <Link to='/documentcreator' style={{textDecoration: 'none'}}>
          <li>Document Creator</li>
        </Link>
      </ul>
    </nav>
  )

};


export default Nav;
