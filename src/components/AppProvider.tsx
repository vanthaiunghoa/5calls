import * as React from 'react';
import { Store } from 'react-redux';
import {
  Group,
} from '../common/model';
import { stateContext, ProviderState } from '../contexts/GroupContext';

interface Props {
  // temporary until completely converted to Provider pattern
  // tslint:disable-next-line:no-any
  store: Store<any>;
}

export default class AppProvider extends React.Component<Props, ProviderState> {
  state: ProviderState = {
    group: new Group(''),
    issues: [],
    inactiveIssues: [],
  };

  constructor(props: Props) {
    super(props);

    this.props.store.subscribe(() => {
      let group = Group.from(this.props.store.getState().groupState);
      let issues = this.props.store.getState().remoteDataState.issues;
      let inactiveIssues = this.props.store.getState().remoteDataState.inactiveIssues;

      this.setState({
        group: group,
        issues: issues,
        inactiveIssues: inactiveIssues,
      });
    });
  }

  render() {
    return (
      <stateContext.Provider value={this.state}>
        {this.props.children}
      </stateContext.Provider>
    );
  }
}
