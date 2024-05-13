import React, { useState } from 'react';
import './styles.css';
import './profile.css';
import starIcon from './images/ninjaStar.png';
import { fetchNinjaByID, postNinjaTransaction, updateNinjaWristband } from './services/gateway';
import ninjaImg from './images/ninja_tac.png';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fname: '',
    lname: '',
    stars: 0,
    impactId: '',
    WristbandID: ''
  });

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    // Adjusting switch cases as needed
    switch (formType) {
      case 'search':
        // Implement search functionality
        const impactIDValue = e.target.querySelector('#name').value.toUpperCase();
        e.target.querySelector('#name').value = "";

        fetchNinjaByID(impactIDValue)
        .then((data) => {
          if (data != null){
            setProfileData({...profileData,
              fname: data[0].FName,
              lname: data[0].LName,
              stars: data[0].NumStars,
              impactID: impactIDValue,
              wristbandID: data[0].WristbandID
            })

          }
          else{
            alert("Ninja's ImpactID Doesn't Exists!")
            setProfileData({
              fname: '',
              lname: '',
              stars: 0,
              impactId: '',
              WristbandID: ''
            });
          }
        })
        .catch((err) => console.log(err))
        break;
      case 'update':
   
        if (profileData.impactID === undefined){
          alert("Please Search for a Ninja First!")
        }
        else{
          const changeStars = e.target.querySelector('#starAdjustment').value
          const reason = e.target.querySelector('#reason').value
          const ninjaName = `${profileData.fname} ${profileData.lname}`

          postNinjaTransaction(profileData.impactID, changeStars, reason, ninjaName)
          .then((data) => {
            if (data["$metadata"].httpStatusCode === 200 && data != null){
              return fetchNinjaByID(profileData.impactID)
            }
            else{
              throw new Error("Ninja Transaction is not Sucessful!")
            }
          })
          .then((updatedStars) => {
            setProfileData({...profileData,
              stars: updatedStars[0].NumStars,
            })
            e.target.querySelector('#starAdjustment').value = ""
            e.target.querySelector('#reason').value = ""
            alert("Successfully updated Ninja's star")

          })
          .catch((err) => console.log(err))

        }
        break;
      case 'updateTag':
        // Implement add tag functionality
        if (profileData.impactID === undefined){
          alert("Please Search for a Ninja First!")
        }
        else{
          const updatedNinjaWristBandID = e.target.querySelector('#updateTag').value
          updateNinjaWristband(profileData.impactID, updatedNinjaWristBandID)
          .then((data) => {
            if (data["$metadata"].httpStatusCode === 200 && data != null){
              return fetchNinjaByID(profileData.impactID)
            }
            else{
              throw new Error("Updating Ninja Wristband Failed.")
            }
          })
          .then((updatedWristband) => {
            setProfileData({...profileData,
              wristbandID: updatedWristband[0].WristbandID,
            })
            alert(`Updated ${profileData.fname}'s Wristband ID`)
            e.target.querySelector('#updateTag').value = ""

          })
          .catch((err) => console.log(err))

        }

        break;
      // case 'removeTag':
      //   // Implement remove tag functionality
      //   break;
      default:
        // Handle other cases
    }
  };

  return (
    <div className="home-container">
      <h1 className="custom-font-admin">Ninja Profile</h1>
      <div className="admin-container">
        <div className="forms-container">
          <div className="upper-forms-container">
            <form className="profile-form full-width-form profile-header" onSubmit={(e) => handleSubmit(e, 'search')}>
              <div className="form-group">
                {/* <div className="profile-header"> */}
                  {/* <img src={starIcon} alt="Star" className="star-icon" /> */}
                  {/* <span className="star-count">{ninjaStars} Stars</span> */}
                {/* </div> */}
                <label htmlFor="name">Impact ID:</label>
                <input type="text" id="name" name="name" required />
                <button type="submit" className="submit-button">Search Ninja</button>
              </div>
            </form>
            <div className="student-info-section">
              <h2>Student Information</h2>
              <div className='star-box'>
                <img src={starIcon} alt="Star" className="star-icon" />
                <span className="star-count">{profileData.stars} Stars</span>
              </div>
              <p><strong>Impact ID: </strong>{profileData.impactID}</p>
              <p><strong>First Name: </strong>{profileData.fname}</p>
              <p><strong>Last Name: </strong>{profileData.lname}</p>
              <p><strong>NFC Tag ID: </strong>{profileData.wristbandID}</p>
            </div>
          </div>
          <div className="lower-forms-container">
            <form className="profile-form lower-form" onSubmit={(e) => handleSubmit(e, 'update')}>
              <div className="form-group">
                <label htmlFor="starAdjustment">Adjust Stars:</label>
                <input type="number" id="starAdjustment" name="starAdjustment" required />
              </div>
              <div className="form-group">
                <label htmlFor="reason">Reason for Update:</label>
                <textarea
                  id="reason"
                  name="reason"
                  required
                  rows="4"
                  className="textarea-reason"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Update Profile</button>
            </form>
            <div className="nfc-management lower-form">
              <form className="nfc-form lower-form" onSubmit={(e) => handleSubmit(e, 'updateTag')}>
                <div className="form-group">
                  <label htmlFor="updateTag">Update Ninja NFC Tag:</label>
                  <input type="text" id="updateTag" name="updateTag" placeholder="Enter new NFC tag ID" required />
                  <button type="submit" className="submit-button">Update Tag</button>
                </div>
              </form>
              <div className="ninja-image-container">
                <img src={ninjaImg} alt=';' className="ninjaImg" />
              </div>
              {/* <form className="nfc-form" onSubmit={(e) => handleSubmit(e, 'removeTag')}>
                <div className="form-group">
                  <label htmlFor="removeTag">Remove Existing NFC Tag:</label>
                  <input type="text" id="removeTag" name="removeTag" placeholder="Enter NFC tag ID to remove" required />
                  <button type="submit" className="nfc-submit-button">Remove Tag</button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
