import * as React from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import Auth from './shared/loginUtil';
import { ApplicationState } from '../redux/root';

interface InternalState {
  doneRedirect: boolean;
}

interface StateProps {
  readonly totalCount: number;
}

interface DispatchProps {
  // readonly onGotToken: (auth0Hash: Auth0DecodedHash) => void;
}

class Auth0Callback extends React.Component<StateProps & DispatchProps, InternalState> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = {doneRedirect: false};
  }

  componentDidMount() {
    new Auth().handleAuthentication();
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
    {},
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth0Callback);
