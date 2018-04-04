import * as auth0base from 'auth0-js';
// import history from './history';

import * as Constants from '../../common/constants';

export default class Auth {
  auth0 = new auth0base.WebAuth({
    domain: Constants.AUTH0_DOMAIN,
    clientID: Constants.AUTH0_CLIENT_ID,
    redirectUri: window.location.host.includes('localhost') ?
      'http://localhost:3000/auth0callback' :
      'https://admin.5calls.org/auth0callback',
    audience: 'https://5callsos.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  login() {
    this.auth0.checkSession({}, (err, result) => {
      // console.log("check",err,result);
      if (err !== undefined) {
        // if we're not logged in, this will redirect to the login screen
        this.auth0.authorize();
      } else {
        // otherwise we get the refreshed details back and update them
        this.setSession(result);
      }
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // remove redux stuff too?

    // history.push("/");
  }

  handleAuthentication(completion: (auth: auth0base.Auth0DecodedHash) => void) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        completion(authResult);
        // history.replace('/home');
      } else if (err) {
        // history.replace('/home');
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
}
