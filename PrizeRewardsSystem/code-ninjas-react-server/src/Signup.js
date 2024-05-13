import React, { useState } from 'react';
import './admin.css'; // Re-use admin styles
import './styles.css';
import { useNavigate } from 'react-router-dom';
import logoImage from './images/logo.png';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userpool from './userpool';

const Signup = () => {
  const navigate = useNavigate();

  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const formInputChange = (formField, value) => {
    // if (formField === "username") {
    //   setUsername(value);
    // }
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === '' && password === '') {
        setUsernameErr("Username is Required");
        setEmailErr("Email is Required");
        setPasswordErr("Password is Required");
        resolve({email: "Email is Required", password: "Password is Required" });
      }
      else if (email === '') {
        setEmailErr("Email is Required");
        resolve({email: "Email is Required", password: "" });
      }
      else if (!email.includes("@codeninjas.com")) {
        setEmailErr("Email is not valid");
        resolve({ email: "Email must be from codninja.com", password: "" });
      }
      else if (password === '') {
        setPasswordErr("Password is Required");
        resolve({email: "", password: "Password is Required" });
      }
      else if (password.length < 6) {
        setPasswordErr("Password must be 6 characters or more");
        resolve({email: "", password: "Password must be 6 characters or more" });
      } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordErr("Password must contain at least one lowercase letter");
      resolve({ email: "", password: "Password must contain at least one lowercase letter" });
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordErr("Password must contain at least one uppercase letter");
      resolve({ email: "", password: "Password must contain at least one uppercase letter" });
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordErr("Password must contain at least one number");
      resolve({ email: "", password: "Password must contain at least one number" });
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordErr("Password must contain at least one special character");
      resolve({ email: "", password: "Password must contain at least one special character" });
    } 
      else {
        resolve({email: "", password: "" });
      }
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          const attributeList = [
            new CognitoUserAttribute({
              Name: 'email',
              Value: email,
            })
          ];
  
          userpool.signUp(email, password, attributeList, null, (err, data) => { // Changed 'email' to 'username'
            if (err) {
              console.log(err);
              alert("Couldn't sign up");
            } else {
              console.log(data);
              alert('User Added Successfully');
              navigate('/admin/verify');
            }
          });
        }
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="home-container">
      <h1 className="custom-font-admin">Sign Up Portal</h1>
      <div className="admin-container">
        <div className="login-panel">
          <div className="logo-container">
            <img src={logoImage} alt="Admin Logo" className="logo" />
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            {/* <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="username" id="username" name="username" placeholder="Enter your username" value={username}
                onChange={(e) => formInputChange("username", e.target.value)} />
              {usernameErr && <div className="error-message">{usernameErr}</div>}
            </div> */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" value={email}
                onChange={(e) => formInputChange("email", e.target.value)} />
              {emailErr && <div className="error-message">{emailErr}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" value={password}
                onChange={(e) => formInputChange("password", e.target.value)} />
              {passwordErr && <div className="error-message">{passwordErr}</div>}
            </div>

            <button type="submit" className="login-button">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
