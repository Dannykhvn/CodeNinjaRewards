import React from 'react';
import './styles.css';
import './createAccount.css'
import { createNinja } from './services/gateway';

const CreateAccount = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const fname = e.target.querySelector('#fname').value
    const lname = e.target.querySelector('#lname').value
    const impactID = e.target.querySelector('#impactID').value.toUpperCase()
    const wristband = e.target.querySelector('#wristband').value
    let stars = e.target.querySelector('#star').value

    if (stars === ''){
      stars = 0
    }
    createNinja(fname,lname,impactID,wristband,stars)
    .then((data) => {
      if (data["$metadata"].httpStatusCode === 200 && data != null){
        alert(`Created Ninja: ${fname}`)
        e.target.querySelector('#fname').value = ''
        e.target.querySelector('#lname').value = ''
        e.target.querySelector('#impactID').value = ''
        e.target.querySelector('#wristband').value = ''
        e.target.querySelector('#star').value = ''


      }
      else {
        throw new Error("Ninja was not created!")
      }
    })
    .catch((err) => console.log(err))

  };

  return (
    <div className="home-container">
     <h1 className="custom-font-admin heading">Add Ninja</h1>
      <div className="admin-container">
        <form className="create-account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input type="text" id="fname" name="fname" required />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input type="text" id="lname" name="lname" required />
          </div>
          <div className="form-group">
            <label htmlFor="impactID">Impact ID:</label>
            <input type="text" id="impactID" name="impactID" required />
          </div>
          <div className="form-group">
            <label htmlFor="wristband">Wristband ID:</label>
            <input type="text" id="wristband" name="wristband" required />
          </div>
          <div className="form-group">
            <label htmlFor="star">Stars:</label>
            <input type="number" id="star" name="star"/>
          </div>
          <button type="submit" className="create-button">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

