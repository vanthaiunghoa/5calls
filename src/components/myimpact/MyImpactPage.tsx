import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import i18n from '../../services/i18n';
import { MyImpactTranslatable } from './index';
import { LayoutContainer } from '../layout';
import { UserStatsState } from '../../redux/userStats';
import { UserState } from '../../redux/userState';

interface Props extends RouteComponentProps<{ id: string }> {
  readonly userStats: UserStatsState;
  readonly userState?: UserState;
  readonly totalCount: number;
}

const MyImpactPage: React.StatelessComponent<Props> = (props: Props) => (
  <LayoutContainer issueId={props.match.params.id}>
    <MyImpactTranslatable
      userStats={props.userStats}
      userState={props.userState}
      totalCount={props.totalCount}
      t={i18n.t}
    />
  </LayoutContainer>
);

export default withRouter(MyImpactPage);
