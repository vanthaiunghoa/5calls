import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/root';
import { UserStatsState } from '../../redux/userStats';

import { MyImpactPage } from './index';
import { UserState } from '../../redux/userState';

interface StateProps {
  readonly currentUser?: UserState;
  readonly userStats: UserStatsState;
  readonly totalCount: number;
}

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    currentUser: state.userState,
    userStats: state.userStatsState,
    totalCount: state.remoteDataState.callTotal,
  };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(MyImpactPage);
