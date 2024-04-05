/* eslint-disable global-require */
// @flow

import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { Amplify } from "aws-amplify";
import { AmplifyAuthProvider } from "ra-aws-amplify";
import config from "./aws-exports";

if (process.env.LOG_URL) {
  Sentry.init({
    dsn: process.env.LOG_URL,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
Amplify.configure(config);

const rootEl = document.getElementById("root");

// create a reusable render method that we can call more than once
const render = () => {
  // dynamically import our main App, which returns a promise, and render it
  const App = require("./App").default;
  // const MainApp = process.env.LOG_URL ? Sentry.withProfiler(App) : App;
  if (rootEl) {
    ReactDOM.render(
      <AmplifyAuthProvider>
        <App />
      </AmplifyAuthProvider>,
      rootEl
    );
  }
};

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}

render();
