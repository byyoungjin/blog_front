import axios from "axios";

import config from "./config";

const url = config.apiUrl[process.env.NODE_ENV];

const socialApiClient = axios.create({
  baseURL: url
});

export { socialApiClient };