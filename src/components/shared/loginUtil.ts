import * as auth0base from 'auth0-js';
import * as jwt from 'jwt-decode';

import * as Constants from '../../common/constants';
import { UserProfile, setProfileActionCreator, UserState } from '../../redux/userState';
import { store } from '../../redux/store';
import { clearProfileActionCreator, setAuthTokenActionCreator } from '../../redux/userState/action';
import { uploadStatsIfNeeded } from '../../redux/remoteData/asyncActionCreator';
import { queueUntilRehydration } from '../../redux/rehydrationUtil';

const callbackURI = () => {
  if (window.location.host.includes('localhost')) {
    return 'http://localhost:3000/auth0callback';
  } else if (window.location.host.includes('test.5calls.org')) {
    return 'https://test.5calls.org/auth0callback';    
  }

  return 'https://5calls.org/auth0callback';
};

export default class AuthUtil {
  auth0 = new auth0base.WebAuth({
    domain: Constants.AUTH0_DOMAIN,
    clientID: Constants.AUTH0_CLIENT_ID,
    redirectUri: callbackURI(),
    audience: 'https://5callsos.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  checkAndRenewSession(profile?: UserProfile) {
    if (profile !== undefined) {
      // only act on people who are logged in
      let expires = new Date(profile.exp * 1000);
      let now = new Date();
      if (expires < now) {
        // try to renew automatically
        this.auth0.checkSession({}, (err, result) => {
          if (err !== null) {
            // not sure how this might happen, log out for now
            console.log('error check session', err);
            this.logout();
          } else {
            // otherwise we get the refreshed details back and update them
            this.decodeAndSetProfile(result);
          }
        });    
      } else {
        // we're good for now, don't do anything
      }
    }
  }

  isLoggedIn(user?: UserState): boolean {
    if (user && user.idToken !== undefined) {
      return true;
    }

    return false;
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    store.dispatch(clearProfileActionCreator());
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

    store.dispatch(setAuthTokenActionCreator(auth0Hash.idToken));
    store.dispatch(setProfileActionCreator(profile));

    // check for unuploaded stats
    queueUntilRehydration(() => {
      store.dispatch(uploadStatsIfNeeded());
    });
  }
}
