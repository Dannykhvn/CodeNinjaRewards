import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAuth } from './AuthContext'; 
import AdminHome from './adminHome';
import { authenticate } from './services/authenticate';
import logoImage from './images/logo.png';
import './admin.css';
import './styles.css';



const Admin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    } else if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    let isValid = true;
    setEmailErr('');
    setPasswordErr('');

    if (email === '') {
      setEmailErr("Email is Required");
      isValid = false;
    }
    if (password === '') {
      setPasswordErr("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters or more");
      isValid = false;
    }

    return isValid;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const isValid = validation();

    if (isValid) {
      try {
        await authenticate(email, password); 
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/admin/home');
      } catch (err) {
        setLoginErr(err.message || 'Login failed');
      }
    }
  };

  if (isLoggedIn) {
    return <AdminHome />;
  }

  const handleSignupNavigate = () => navigate('/admin/signup');

    if (isLoggedIn) {
      return <AdminHome />;
  }

  return (
    <div className="home-container">
    <h1 className="custom-font-admin">Admin Portal</h1>
    <div className="admin-container">
      <div className="login-panel">
        <div className="logo-container">
           <img src={logoImage} alt="Admin Logo" className="logo" />
          </div>
          <h1 className="login-title">Admin Portal</h1>
          <form className="login-form" onSubmit={handleClick}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => formInputChange("email", e.target.value)}
                required 
              />
              {emailErr && <Typography variant="body2" color="error">{emailErr}</Typography>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => formInputChange("password", e.target.value)}
                required 
              />
              {passwordErr && <Typography variant="body2" color="error">{passwordErr}</Typography>}
            </div>
            <button type="submit" className="login-button">Login</button>
            <button onClick={handleSignupNavigate} id="signupButton" className="link-style-button">Sign up</button>
          </form>
          {loginErr && <Typography variant="body2" color="error">{loginErr}</Typography>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
