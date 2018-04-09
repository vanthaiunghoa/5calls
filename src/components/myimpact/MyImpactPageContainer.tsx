import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/root';
import { UserStatsState } from '../../redux/userStats';

import { MyImpactPage } from './index';
import { UserState } from '../../redux/userState';

interface StateProps {
  readonly userStats: UserStatsState;
  readonly userState?: UserState;
  readonly totalCount: number;
}

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    userStats: state.userStatsState,
    userState: state.userState,
    totalCount: state.remoteDataState.callTotal,
  };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(MyImpactPage);
