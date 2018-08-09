import * as React from 'react';
import { Store } from 'react-redux';
import { Group } from '../common/model';
import { groupContext } from '../contexts/GroupContext';

interface ProviderState {
  group: Group;
}

interface Props {
  // temporary until completely converted to Provider pattern
  // tslint:disable-next-line:no-any
  store: Store<any>;
}

export default class AppProvider extends React.Component<Props> {
  state: ProviderState = {
    group: new Group(''),
  };

  constructor(props: Props) {
    super(props);

    this.props.store.subscribe(() => {
      let group = Group.from(this.props.store.getState().groupState);

      this.setState({
        group: group,
      });
    });
  }

  render() {
    return (
      <groupContext.Provider value={this.state.group}>
        {this.props.children}
      </groupContext.Provider>
    );
  }
}
