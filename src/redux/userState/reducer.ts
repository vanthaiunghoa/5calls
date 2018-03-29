import { Reducer } from 'redux';
// import * as jwt from 'jsonwebtoken';

import { UserStateAction, UserStateActionType } from './index';

export interface UserAuth {
  accessToken: string;
  // refreshToken: string;
  jwtToken: string;
  expiration: Date;
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
    // case UserStateActionType.SET_USER_STATS: {
    //   const userStats: UserStatsState = action.payload as UserStatsState;

    //   // create a deep copy of the incoming object to create the new state
    //   const all: UserContactEvent[] = [...userStats.all];

    //   // spread the incoming userStats object into a new object
    //   //  overwrite the "all" property with the new all array, made above
    //   //  otherwise the "all" array would be a reference to the old/existing "all" array
    //   const newState: UserStatsState = { ...userStats, all: all };

    //   return newState;
    // }
    default: {
      return state;
    }
  }
};
