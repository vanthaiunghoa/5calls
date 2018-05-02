import * as React from 'react';
import { AuthCallback, AuthResponse } from '@5calls/react-components';
import { setAuthTokenActionCreator, setProfileActionCreator } from '../../redux/userState';
import { store } from '../../redux/store';

interface Props {}

interface State {}

export class AuthCallbackContainer extends React.Component<Props, State> {

  handleAuthResponse = (authResponse: AuthResponse ) => {
    // TODO: Dispatch redux action
    console.log('AuthCallbackContainer.handleAuthResponse() called');
    store.dispatch(setAuthTokenActionCreator(authResponse.authToken));
    store.dispatch(setProfileActionCreator(authResponse.userProfile));
  }

  render() {
    return (
      <AuthCallback handleAuthResponse={(authResponse) => this.handleAuthResponse(authResponse)} />
    );
  }
}



