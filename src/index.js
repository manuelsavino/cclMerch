import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "./auth";
import history from "./utils/history";
import config from "./auth_config.json";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={config.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
