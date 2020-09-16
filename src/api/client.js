import axios from "axios";

import config from "./config";
import { socialApiRequestInterceptor } from "./helper";

const url = config.apiUrl[process.env.NODE_ENV];
// const url = config.apiUrl["production"];
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// const url = config.apiUrl["production"];
const socialApiClient = axios.create({
  baseURL: url
});

socialApiClient.interceptors.request.use(socialApiRequestInterceptor);

export { socialApiClient };
