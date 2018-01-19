import * as auth0base from 'auth0-js';
// import history from './history';

import * as Constants from '../../common/constants';

export default class Auth {
  auth0 = new auth0base.WebAuth({
    domain: Constants.AUTH0_DOMAIN,
    clientID: Constants.AUTH0_CLIENT_ID,
    redirectUri: window.location.host.includes('localhost') ? 'http://localhost:3000/auth0callback' : 'https://admin.5calls.org/auth0callback',
    audience: 'https://5callsos.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIDToken = this.getIDToken.bind(this);
    this.renewAuthIfNeeded = this.renewAuthIfNeeded.bind(this);
  }

  login() {
    this.auth0.authorize({
      audience: 'https://5callsos.auth0.com/userinfo',
      responseType: 'token id_token',
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // history.push("/");
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log("got token",authResult.accessToken);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // history.replace('/home');
      } else if (err) {
        // history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult: auth0base.Auth0DecodedHash) {
    // Set the time that the access token will expire at
    if (authResult.expiresIn && authResult.accessToken && authResult.idToken) {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      // history.replace('/home');  
    }
  }

  isAuthenticated() {
    // console.log("auth check",localStorage.getItem('access_token'),localStorage.getItem('id_token'),localStorage.getItem('expires_at'));
    // Check whether the current time is past the 
    // access token's expiry time
    let expiry = localStorage.getItem('expires_at');
    if (expiry == null) {
      expiry = "0";
    }
    let expiresAt = JSON.parse(expiry);
    return new Date().getTime() < expiresAt;
  };

  renewAuthIfNeeded() {
    // TODO: this needs to check if the current token is expired and request a new one (which it can do silently, I think)
    let expiry = localStorage.getItem('expires_at');
    if (expiry == null) {
      expiry = "0";
    }
    let expiresAt = JSON.parse(expiry);
    if (new Date().getTime() > expiresAt) {
      console.error("token is expired!");
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };

  getIDToken() {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No id token found');
    }
    return idToken;
  };
}
