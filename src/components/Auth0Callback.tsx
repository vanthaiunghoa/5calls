import * as React from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as jwt from 'jwt-decode';

import Auth from './shared/loginUtil';
import { ApplicationState } from '../redux/root';
import { UserAuth, UserProfile, setProfileActionCreator } from '../redux/userState';

interface InternalState {
  doneRedirect: boolean;
}

interface StateProps {
  readonly totalCount: number;
}

interface DispatchProps {
  readonly onGotToken: (userAuth: UserAuth) => void;
}

class Auth0Callback extends React.Component<StateProps & DispatchProps, InternalState> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = {doneRedirect: false};
  }

  componentDidMount() {
    new Auth().handleAuthentication((auth) => {
      this.props.onGotToken(auth);
    });
    this.setState({ doneRedirect: true });
  }

  render() {
    if (this.state.doneRedirect) {
      return <Redirect to="/"/>;
      // return <span/>;
    } else {
      return <h1>Logging you in...</h1>;
    }
  }
}

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    totalCount: 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): DispatchProps => {
  return bindActionCreators(
    {
      // ideally we'd push this logic into the action, but I can't get it to stick without dispatch
      // onGotToken: (userAuth: UserAuth) => setAuthToken(userAuth),
      onGotToken: (userAuth: UserAuth) => {
        let profile: UserProfile | undefined;
        if (userAuth.idToken !== undefined) {
          // console.log('token is ', userAuth.idToken);
          profile = jwt(userAuth.idToken);
          // console.log('jwt decodes to', profile);
        }
        // genuinely no idea why we have to wrap this in dispatch sometimes
        return (nextDispatch: Dispatch<ApplicationState>,
                getState: () => ApplicationState) => {
          dispatch(setProfileActionCreator(profile));    
        };
      },
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth0Callback);
