import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import Logo2 from '../images/Logo2.jpg'

const Nav = () => {
  return (
    <>
      <nav>
        <div className='wrapper-logo'>
          <img className='logo'  alt='Contractual logo' src='../assets/img/icon-white.png'/>
        </div>
        <ul className="nav-links">
          <Link to='contract'>
            <li>Contract</li>
          </Link>
          <Link to='front'>
            <li>Frontend</li>
          </Link>
          <Link to='back'>
            <li>Backend</li>
          </Link>
          <Link to='document'>
            <li>Documentation</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  )

};


export default Nav;
