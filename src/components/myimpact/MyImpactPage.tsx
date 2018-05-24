import * as React from 'react';
import i18n from '../../services/i18n';
import { MyImpactTranslatable } from './index';
import { LayoutContainer } from '../layout';
import { UserStatsState } from '../../redux/userStats';
import { UserState } from '../../redux/userState';

interface Props {
  readonly currentUser?: UserState;
  readonly userStats: UserStatsState;
  readonly totalCount: number;
}

const MyImpactPage: React.StatelessComponent<Props> = (props: Props) => (
  <LayoutContainer>
    <MyImpactTranslatable
      currentUser={props.currentUser}
      userStats={props.userStats}
      totalCount={props.totalCount}
      t={i18n.t}
    />
  </LayoutContainer>
);

export default MyImpactPage;
