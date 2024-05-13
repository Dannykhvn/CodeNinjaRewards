import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './hamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth(); // Destructure isLoggedIn and logout from useAuth
  const navigate = useNavigate(); // Used for redirecting after logout

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handler for the logout action
  const handleLogout = () => {
    logout(); // Call the logout method from AuthContext
    navigate('/admin'); // Redirect to login page
    closeMenu(); // Optionally close the hamburger menu
  };

  // Only show the menu if the user is logged in
  if (!isLoggedIn || location.pathname === '/') {
    return null;
  }

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <input id="toggle" type="checkbox" checked={isOpen} onChange={toggleMenu}></input>
      <label htmlFor="toggle" className="hamburger">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </label>
      <div className="nav" onClick={closeMenu}>
        <div className="nav-wrapper">
          <nav>
            <Link to="/admin/home" className={location.pathname === '/admin/home' ? 'active' : ''}>Home</Link>
            <Link to="/admin/createAccount" className={location.pathname === '/admin/createAccount' ? 'active' : ''}>Add Ninja</Link>
            <Link to="/admin/profile" className={location.pathname === '/admin/profile' ? 'active' : ''}>Profile</Link>
            <Link onClick={handleLogout} className="logout-button">Logout</Link>
            {/* <button onClick={handleLogout} className="logout-button">Logout</button> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
