// // third ***********************************************************************
//   // working except the usrname input not being clickable ****************************888888888
// import React, { useState, useRef, useEffect } from 'react';
// import './admin.css'; // Re-use admin styles
// import './styles.css';
// import { useNavigate } from 'react-router-dom';
// import { verifyUser } from './verificationUtils'; // Import the verifyUser function
// import userpool from './userpool';

// const Verification = () => {
//   const navigate = useNavigate();
//   const usernameInputRef = useRef(null); // Ref for the username input

//   const [OTP, setOTP] = useState('');
//   const [username, setUsername] = useState('');
//   const [OTPError, setOTPError] = useState('');

//   useEffect(() => {
//     // Focus on the username input when the component mounts
//     usernameInputRef.current.focus();
//   }, []);

//   const formInputChange = (formField, value) => {
//     if (formField === "OTP") {
//       setOTP(value);
//     }
//     if (formField === "username") {
//       setUsername(value);
//     }
//   };

//   const verifyAccount = (e) => {
//     e.preventDefault();
//     // Call the verifyUser function with username and OTP
//     verifyUser(username, OTP, (err, data) => {
//       if (err) {
//         console.log(err);
//         if (err.name === 'ExpiredCodeException') {
//           setOTPError("The confirmation code has expired. Please request a new code.");
//         } else {
//           setOTPError("Invalid OTP. Please try again.");
//         }
//       } else {
//         console.log(data);
//         alert('Account verified successfully');
//         navigate('/admin'); // Redirect after successful verification
//       }
//     });
//   };
  

//   return (
//     <div className="home-container">
//       <h1 className="custom-font-admin">Verification</h1>
//       <div className="admin-container">
//         <div className="login-panel">
//           <form className="login-form" onSubmit={verifyAccount}>
//             <h1>Verify Account</h1>
//             <div className="form-group">
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => formInputChange("username", e.target.value)}
//                 ref={usernameInputRef} // Assign the ref to the username input
//               />
              
//             </div>
//             <div className="form-group">
//               <label htmlFor="otp">OTP:</label>
//               <input
//                 type="text"
//                 id="otp"
//                 name="otp"
//                 placeholder="Enter OTP"
//                 value={OTP}
//                 onChange={(e) => formInputChange("OTP", e.target.value)}
//               />
//               {OTPError && <div className="error-message">{OTPError}</div>}
//             </div>
//             <button type="submit" className="login-button">Verify Account</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Verification;


import React, { useState, useRef, useEffect } from 'react';
import './admin.css'; // Re-use admin styles
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from './verificationUtils'; // Import the verifyUser function
import userpool from './userpool';

const Verification = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null); // Ref for the email input

  const [OTP, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [OTPError, setOTPError] = useState('');

  useEffect(() => {
    // Focus on the email input when the component mounts
    emailInputRef.current.focus();
  }, []);

  const formInputChange = (formField, value) => {
    if (formField === "OTP") {
      setOTP(value);
    }
    if (formField === "email") {
      setEmail(value);
    }
  };

  const verifyAccount = (e) => {
    e.preventDefault();
    // Call the verifyUser function with email and OTP
    verifyUser(email, OTP, (err, data) => {
      if (err) {
        console.log(err);
        if (err.name === 'ExpiredCodeException') {
          setOTPError("The confirmation code has expired. Please request a new code.");
        } else {
          setOTPError("Invalid OTP. Please try again.");
        }
      } else {
        console.log(data);
        alert('Account verified successfully');
        navigate('/admin'); // Redirect after successful verification
      }
    });
  };
  

  return (
    <div className="home-container">
      <h1 className="custom-font-admin">Verification</h1>
      <div className="admin-container">
        <div className="login-panel">
          <form className="login-form" onSubmit={verifyAccount}>
            <h1>Verify Account</h1>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => formInputChange("email", e.target.value)}
                ref={emailInputRef} // Assign the ref to the email input
              />
              
            </div>
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input
                type="otp"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={OTP}
                onChange={(e) => formInputChange("OTP", e.target.value)}
              />
              {OTPError && <div className="error-message">{OTPError}</div>}
            </div>
            <button type="submit" className="login-button">Verify Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verification;
