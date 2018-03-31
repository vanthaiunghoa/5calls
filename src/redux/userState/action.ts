import { Action } from 'redux';
import { Dispatch } from 'react-redux';

import { ApplicationState } from '../root';
import { UserAuth } from './index';

export enum UserStateActionType {
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
}

export interface UserStateAction extends Action {
  type: UserStateActionType;
  payload?: {};
}

export interface SetAuthToken extends UserStateAction {
  type: UserStateActionType.SET_AUTH_TOKEN;
  payload: UserAuth;
}

export const setAuthTokenActionCreator = (userAuth: UserAuth): SetAuthToken => {
  return {
    type: UserStateActionType.SET_AUTH_TOKEN,
    payload: userAuth
  };
};

export const setAuthToken = (userAuth: UserAuth) => {
  console.log("set auth",userAuth);
  // do any auth decoding here?

  return (
    dispatch: Dispatch<ApplicationState>,
    getState: () => ApplicationState) => {
      setAuthTokenActionCreator(userAuth);
    };
}