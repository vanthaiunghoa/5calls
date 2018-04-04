import { Action } from 'redux';

import { UserAuth, UserProfile } from './index';

export enum UserStateActionType {
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
  SET_USER_PROFILE = 'SET_USER_PROFILE',
}

export interface UserStateAction extends Action {
  type: UserStateActionType;
  payload?: {};
}

export interface SetAuthToken extends UserStateAction {
  type: UserStateActionType.SET_AUTH_TOKEN;
  payload: UserAuth;
}

export interface SetUserProfile extends UserStateAction {
  type: UserStateActionType.SET_USER_PROFILE;
  payload: UserProfile | undefined;
}

export const setAuthTokenActionCreator = (userAuth: UserAuth): SetAuthToken => {
  return {
    type: UserStateActionType.SET_AUTH_TOKEN,
    payload: userAuth
  };
};

export const setProfileActionCreator = (profile?: UserProfile): SetUserProfile => {
  return {
    type: UserStateActionType.SET_USER_PROFILE,
    payload: profile
  };
};

// export const setAuthToken = (userAuth: UserAuth) => {
//   console.log('set auth', userAuth);
//   // do any auth decoding here?
//   let profile: UserProfile | undefined;
//   if (userAuth.idToken !== undefined) {
//     console.log('token is ', userAuth.idToken);
//     profile = jwt(userAuth.idToken);
//     console.log('jwt decodes to', profile);

//   } else {
//     // console.error('no token to decode');
//   }
  
//   return (
//     dispatch: Dispatch<ApplicationState>,
//     getState: () => ApplicationState) => {
//       // setAuthTokenActionCreator(userAuth);
//       setProfileActionCreator(profile);
//     };
// };