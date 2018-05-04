import * as React from 'react';
import { AuthCallback, AuthResponse } from '@5calls/react-components';
import { setAuthTokenActionCreator, setProfileActionCreator } from '../../redux/userState';
import { store } from '../../redux/store';
import { Redirect } from 'react-router-dom';

interface Props {
}

interface State {
  authResponse: AuthResponse;
}

export class AuthCallbackContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {authResponse: {}};
  }

  componentDidMount() {
    console.log('AuthCallbackContainer.componentDidMount() called');
    this.updateAuthResponse();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('AuthCallbackContainer.componentDidUpdate() called');
    if (this.state.authResponse.authToken !== prevState.authResponse.authToken) {
      this.updateAuthResponse();
    }
  }

  updateAuthResponseCallback = (authResponsePromise: Promise<AuthResponse>) => {
    authResponsePromise
      .then((authResponse: AuthResponse) => {
      this.setState({authResponse});
    })
      // tslint:disable-next-line:no-console
      .catch(error => console.error('Error', error));
  }

  updateAuthResponse = () => {
    store.dispatch(setAuthTokenActionCreator(this.state.authResponse.authToken));
    store.dispatch(setProfileActionCreator(this.state.authResponse.userProfile));
  }

  renderRedirect = () =>  {
    return <Redirect to="/"/>;
  }

  render() {
    return (
      <AuthCallback render={this.renderRedirect} handleAuthResponse={this.updateAuthResponseCallback} />
    );
  }
}



