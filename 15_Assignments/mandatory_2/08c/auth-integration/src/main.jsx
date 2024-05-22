import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import config from "./auth_config.json";



ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
