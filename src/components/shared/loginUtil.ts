import * as auth0base from 'auth0-js';
import * as jwt from 'jwt-decode';

import * as Constants from '../../common/constants';
import { UserProfile, setProfileActionCreator } from '../../redux/userState';
import { store } from '../../redux/store';
import { clearProfileActionCreator } from '../../redux/userState/action';

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
        this.decodeAndSetProfile(result);
      }
    });
  }

  logout() {
    store.dispatch(clearProfileActionCreator());
    // remove localstorage and redux?

    // history.push("/");
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult === undefined) {
        console.log('error with auth', err);
      } else {
        this.decodeAndSetProfile(authResult);
      }
    });
  }

  decodeAndSetProfile(auth0Hash: auth0base.Auth0DecodedHash) {
    let profile: UserProfile | undefined;
    if (auth0Hash.idToken !== undefined) {
      // console.log('token is ', userAuth.idToken);
      profile = jwt(auth0Hash.idToken);
      // console.log('jwt decodes to', profile);
    }

    store.dispatch(setProfileActionCreator(profile));
  }
}
