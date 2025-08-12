import { UserAgentApplication, Configuration } from "msal";

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
    authority: import.meta.env.VITE_AZURE_AUTHORITY as string,
    redirectUri: window.location.origin + "/sso-callback",
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  }
};

export const msalInstance = new UserAgentApplication(msalConfig);
