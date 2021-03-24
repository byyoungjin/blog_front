import axios from "axios";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from "axios-extensions";
import LRUCache from "lru-cache";
import { setupCache } from "axios-cache-adapter";

import config from "./config";
import { socialApiRequestInterceptor } from "./helper";

const url = config.apiUrl[process.env.NODE_ENV];

const cache = setupCache({ maxAge: 1 * 1000 });

// console.log(`base api url: `, url);

const socialApiClient = axios.create({
  baseURL: url,
  withCredentials: true,
  adapter: cache.adapter
});

socialApiClient.interceptors.request.use(socialApiRequestInterceptor);

export { socialApiClient };
