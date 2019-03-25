// import {
//   config as AWSConfig,
//   CognitoIdentityCredentials,
//   Lambda
// } from "aws-sdk";

import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import * as AWS from "aws-sdk/global";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

const addNewUser = ({ email }) => {
  var attributeList = [];

  var dataEmail = {
    Name: "email",
    Value: email
  };

  

  var attributeEmail = new CognitoUserAttribute(
    dataEmail
  );
  

  attributeList.push(attributeEmail);

  console.log(attributeList);

  userPool.signUp("username", "password", attributeList, null, function(
    err,
    result
  ) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    var cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
  });
};

// const verifyExisitingUser = ({ email, password }) => {
//   var authenticationData = {
//     Username: email,
//     Password: password
//   };
//   var authenticationDetails = new AuthenticationDetails(
//     authenticationData
//   );

//   var userPool = new CognitoUserPool(poolData);
//   var userData = {
//     Username: "username",
//     Pool: userPool
//   };
//   var cognitoUser = new CognitoUser(userData);
//   cognitoUser.authenticateUser(authenticationDetails, {
//     onSuccess: function(result) {
//       var accessToken = result.getAccessToken().getJwtToken();

//       //POTENTIAL: Region needs to be set if not already set previously elsewhere.
//       AWS.config.region = "<region>";

//       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: "...", // your identity pool id here
//         Logins: {
//           // Change the key below according to the specific region your user pool is in.
//           "cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>": result
//             .getIdToken()
//             .getJwtToken()
//         }
//       });

//       //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
//       AWS.config.credentials.refresh(error => {
//         if (error) {
//           console.error(error);
//         } else {
//           // Instantiate aws sdk service objects now that the credentials have been updated.
//           // example: var s3 = new AWS.S3();
//           console.log("Successfully logged!");
//         }
//       });
//     },

//     onFailure: function(err) {
//       alert(err.message || JSON.stringify(err));
//     }
//   });
// };

const retrieveUserFromLocalStorage = () => {
  
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("session validity: " + session.isValid());

      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      cognitoUser.getUserAttributes(function(err, attributes) {
        if (err) {
          // Handle error
          console.error(err);
          return
        } else {
          console.log(attributes)
          return attributes;
        }
      });

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "...", // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          "cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>": session
            .getIdToken()
            .getJwtToken()
        }
      });

      // Instantiate aws sdk service objects now that the credentials have been updated.
      // example: var s3 = new AWS.S3();
    });
  }
};

// const AWSRegion = process.env.REACT_APP_AWS_REGION;

// AWSConfig.region = AWSRegion;

// /* Config for CognitoID */
// const config = {
//   userPool: {
//     UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
//     ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
//   }
// };

export { addNewUser, retrieveUserFromLocalStorage };
