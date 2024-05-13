import { CognitoUser } from 'amazon-cognito-identity-js';
import userpool from './userpool'; // Make sure to import userpool from the correct location

export const verifyUser = (email, verifyCode, callback) => {
  const userData = {
    Username: email, // Change Username to email
    Pool: userpool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(verifyCode, true, callback)
}
