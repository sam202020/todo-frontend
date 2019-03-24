import {
  config as AWSConfig,
  CognitoIdentityCredentials,
  Lambda
} from "aws-sdk";

import { CognitoUserPool } from 'amazon-cognito-identity-js'

const AWSRegion = process.env.REACT_APP_AWS_REGION;

AWSConfig.region = AWSRegion;

/* Config for CognitoID */
const config = {
  userPool: {
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
  }
}


export { AWSRegion, AWSConfig, CognitoIdentityCredentials, Lambda };
