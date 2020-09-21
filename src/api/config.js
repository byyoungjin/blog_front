import dotenv from "dotenv";

dotenv.config();

export default {
  apiUrl: {
    development: process.env.REACT_APP_API_DEVELOPMENT,
    production: process.env.REACT_APP_API_PRODUCTION
  }
};
