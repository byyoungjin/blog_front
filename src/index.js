import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import { ThemeProvider } from "styled-components";

import App from "./App";
import "./normalize.css";
import "./index.css";
import configureStore from "data/configureStore";
import * as theme from "./theme";
dotenv.config();

const { history, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App history={history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
