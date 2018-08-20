import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import { selectIssueActionCreator } from '../../redux/callState';
import { ApplicationState } from '../../redux/root';
import { newLocationLookup, clearAddress } from '../../redux/location';
import { LocationState } from '../../redux/location/reducer';
import { CallState } from '../../redux/callState/reducer';
import { UserState } from '../../redux/userState/reducer';
import { Layout } from './index';
import { Issue, Group } from '../../common/model';

interface OwnProps {
  readonly issueId?: string;
  readonly issues?: Issue[];
  readonly currentGroup?: Group;
  readonly children?: {};
  readonly postcards?: boolean;
  readonly extraComponent?: {};
}

interface StateProps {
  readonly children?: {};
  //  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly currentGroup?: Group;
  readonly currentUser?: UserState;
  readonly completedIssueIds: string[];
  readonly callState: CallState;
  readonly locationState: LocationState;
}

interface DispatchProps {
  readonly onSelectIssue: (issueId: string) => void;
  readonly setLocation: (location: string, group?: Group) => void;
  readonly clearLocation: () => void;
}

function mapStateToProps(state: ApplicationState, ownProps: OwnProps): StateProps {
  let currentIssue: Issue | undefined = undefined;
  if (state.remoteDataState.issues) {
    currentIssue = find(state.remoteDataState.issues, i => i.id === ownProps.issueId);
  }

  /*
  let issues: Issue[] = [];
  // overrise issues from above the layout container if needed and not on a group page
  // group pages will load issues themselves, and shouldn't default to normal issues
  if (ownProps.currentGroup) {
    if (ownProps.currentGroup.customCalls) {
      // groups wanting custom calls should only test if their group issues exist
      if (ownProps.issues && ownProps.issues.length > 0) {
        issues = ownProps.issues;
      }
    } else {
      // groups otherwise should get the normal issues from the front page
      if (state.remoteDataState.issues && state.remoteDataState.issues.length > 0) {
        issues = state.remoteDataState.issues;
      }
    }
  } else {
    issues = ownProps.issues ? ownProps.issues : state.remoteDataState.issues;
  }
   */

  return {
  // issues: issues,
    currentIssue: currentIssue,
    currentGroup: ownProps.currentGroup ? ownProps.currentGroup : undefined,
    currentUser: state.userState,
    completedIssueIds: state.callState.completedIssueIds,
    callState: state.callState,
    locationState: state.locationState,
    children: ownProps.children
  };
}

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: OwnProps): DispatchProps => {
  return bindActionCreators(
    {
      onSelectIssue: selectIssueActionCreator,
      setLocation: (location: string) => {
        return newLocationLookup(location, ownProps.currentGroup);
      },
      clearLocation: clearAddress,
    },
    dispatch);
};

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Layout);
