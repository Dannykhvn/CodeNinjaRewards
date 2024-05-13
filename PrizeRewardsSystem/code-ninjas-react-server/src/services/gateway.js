export const fetchNinjaByWristband = async (wristbandID) => {
    try {
      const encodedWristbandID = wristbandID.replace(";","%3B").replace("?","%3F")
      const apiUrl = `${process.env.REACT_APP_NINJA_API_URL}?WristbandID=${encodedWristbandID}`
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-api-key": process.env.REACT_APP_NINJA_API_ID
        }

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.log(error)
      console.error("Error fetching data");
      return null; 
    }
  };

export const fetchNinjaByID = async (impactID) => {
    try {
      const apiUrl = `${process.env.REACT_APP_NINJA_API_URL}?ImpactID=${impactID}`
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-api-key": process.env.REACT_APP_NINJA_API_ID
        }

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      return data; 
    } catch (error) {
      console.error("Error fetching data");
      return null; 
    }
};

export const postNinjaTransaction = async (impactID, changeStars, reason, ninjaName) => {
    console.log(impactID)
    try {
        const apiUrl = `${process.env.REACT_APP_TRANSACTION_API_URL}`
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "x-api-key": process.env.REACT_APP_NINJA_API_ID
          },
          body: JSON.stringify({
            ImpactID: impactID,
            Description: reason,
            Ninja: ninjaName,
            StarDifference: changeStars
          })
  
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        return data; 
      } catch (error) {
        console.error("Error fetching data");
        return null; 
      }

};


export const updateNinjaWristband = async (impactID, updatedWristbandID) => {
    try {
        const apiUrl = `${process.env.REACT_APP_NINJA_API_URL}`
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "x-api-key": process.env.REACT_APP_NINJA_API_ID
          },
          body: JSON.stringify({
            ImpactID: impactID,
            wristbandID: updatedWristbandID
          })
  
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        return data; 
      } catch (error) {
        console.error("Error fetching data");
        return null; 
      }

};

export const createNinja = async (fname, lname, impactID, wristband, starAmount) => {
    try {
        const apiUrl = `${process.env.REACT_APP_NINJA_API_URL}`
        console.log(apiUrl)
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "x-api-key": process.env.REACT_APP_NINJA_API_ID
          },
          body: JSON.stringify({
            ImpactID: impactID,
            FirstName: fname,
            LastName: lname,
            NumStars: starAmount,
            WristbandID: wristband
          })
  
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        return data; 
      } catch (error) {
        console.error("Error fetching data");
        return null; 
      }

};
  