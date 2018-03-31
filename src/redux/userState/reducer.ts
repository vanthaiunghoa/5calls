import { Reducer } from 'redux';
// import * as jwt from 'jsonwebtoken';
import * as jwt from 'jwt-decode';

import { UserStateAction, UserStateActionType } from './index';

export class UserAuth {
  accessToken: string;
  // refreshToken: string;
  jwtToken: string;
  expiration: Date;

  userName() {
    var details = jwt(this.jwtToken)
    console.log("username");
    console.log(details);
  }
}

// export interface UserProfile {
//   name: string,
//   photoURL: string,
// }

export interface UserState {
  userAuth?: UserAuth;
}

const initialState: UserState = {
  userAuth: undefined,
};

export const userStateReducer: Reducer<UserState> = (
  state: UserState = initialState as UserState, action: UserStateAction): UserState => {
  switch (action.type) {
    case UserStateActionType.SET_AUTH_TOKEN: {
      const userAuth = action.payload as UserAuth;

      console.log("reducer setting user to ",userAuth);
      // decode jwt into names and such
      // const decoded = jwt.decode(userAuth.jwtToken, {complete: true});
      // let userProfile: UserProfile | undefined = undefined;

      // if (decoded && typeof(decoded) == 'object' && decoded['payload']) {
      //   if (decoded['payload']['name'] && decoded['payload']['picture']) {
      //     userProfile = { name: decoded['payload']['name'], photoURL: decoded['payload']['picture'] }                
      //   }
      // }

      const newState: UserState = { ...state, userAuth: userAuth };

      return newState;
    }
    default: {
      return state;
    }
  }
};
