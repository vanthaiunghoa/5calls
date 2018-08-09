import * as React from 'react';
import { Helmet } from 'react-helmet';

import i18n from '../../services/i18n';
import { LocationState } from '../../redux/location/reducer';
import { CallState } from '../../redux/callState/reducer';
import { UserState } from '../../redux/userState/reducer';
import { Issue, Group } from '../../common/model';
import { SidebarHeader, Sidebar, Footer, Header } from './index';

import { groupContext } from '../../contexts/GroupContext';

interface Props {
  readonly children?: {};
  readonly extraComponent?: {};
  readonly postcards?: boolean;
  readonly issueId: string;
  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly currentGroup?: Group;
  readonly currentUser?: UserState;
  readonly completedIssueIds: string[];
  readonly callState: CallState;
  readonly locationState: LocationState;
  readonly onSelectIssue: (issueId: string) => Function;
  readonly setLocation: (location: string) => void;
  readonly clearLocation: () => void;
}

function hideDonation(group?: Group): boolean {
  if (group && group.subscribed) {
    return true;
  }

  return false;
}

const Layout: React.StatelessComponent<Props> = (props: Props) => (
  <div>
    <Helmet>
      <title>5 Calls: Make your voice heard</title>
    </Helmet>
    <Header
      postcards={props.postcards}
      currentUser={props.currentUser}
      hideDonation={hideDonation(props.currentGroup)}
    />
    <div className="layout">
      <aside id="nav" role="contentinfo" className="layout__side">
        <groupContext.Consumer>
        {group =>
          <div className="issues">
            <SidebarHeader
              callState={props.callState}
              currentGroup={group}
              locationState={props.locationState}
              setLocation={props.setLocation}
              clearLocation={props.clearLocation}
            />
            <Sidebar
              issues={props.issues}
              currentIssue={props.currentIssue ? props.currentIssue : undefined}
              currentGroup={group}
              completedIssueIds={props.completedIssueIds}
              onSelectIssue={props.onSelectIssue}
            />
          </div>
        }
        </groupContext.Consumer>
      </aside>
      <main id="content" role="main" aria-live="polite" className="layout__main">
        {props.children}
      </main>
    </div>
    {props.extraComponent}
    <Footer
      t={i18n.t}
    />
  </div>
);

export default Layout;
