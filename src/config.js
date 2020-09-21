import dotenv from "dotenv";

dotenv.config();

export const googleKey = {
  googleOAuthClientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
};
