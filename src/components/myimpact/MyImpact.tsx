import * as React from 'react';
import i18n from '../../services/i18n';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import Pluralize from 'react-pluralize';

import { CallCount } from '../shared';
import { UserStatsState } from '../../redux/userStats';
import { getUserStats, RemoteUserStats } from '../../services/apiServices';
import { UserState } from '../../redux/userState';
import { queueUntilRehydration } from '../../redux/rehydrationUtil';
import { LoginService } from '@5calls/react-components';

interface Props {
  readonly currentUser?: UserState;
  readonly userStats: UserStatsState;
  readonly totalCount: number;
  readonly t: TranslationFunction;
}

interface State {
  remoteUserStats?: RemoteUserStats;
}

const authutil = new LoginService();

export class MyImpact extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      remoteUserStats: undefined,
    };
  }

  componentDidMount() {
    queueUntilRehydration(() => {
      if (this.props.currentUser && this.props.currentUser.idToken) {

        getUserStats(this.props.currentUser.idToken).then((userStats) => {
          this.setState({remoteUserStats: userStats});
        }).catch((error) => {
          // tslint:disable-next-line:no-console
          console.error('error getting user stats', error);
        });
      }
    });
  }

  render() {
    let callSummaryParams = {
      contactedCalls: this.props.userStats.contact,
      vmCalls: this.props.userStats.voicemail,
      unavailableCalls: this.props.userStats.unavailable,
    };
    let myTotalCalls = this.props.userStats.all.length;
    let streakLength = 0;

    // update stats from the server when we get them back
    if (this.state.remoteUserStats && this.state.remoteUserStats.stats) {
      callSummaryParams.contactedCalls = this.state.remoteUserStats.stats.contact;
      callSummaryParams.vmCalls = this.state.remoteUserStats.stats.voicemail;
      callSummaryParams.unavailableCalls = this.state.remoteUserStats.stats.unavailable;

      myTotalCalls = callSummaryParams.contactedCalls + callSummaryParams.vmCalls + callSummaryParams.unavailableCalls;
      streakLength = this.state.remoteUserStats.weeklyStreak;
    }

    return (
    <section className="impact">
      <h1 className="impact__title">{this.props.t('impact.title')}</h1>
      {myTotalCalls === 0 &&
        <div>
          <h2 className="impact_total">{this.props.t('impact.noCallsYet')}</h2>
          { !authutil.isLoggedIn(this.props.currentUser) &&
            <p>
              <a onClick={authutil.login}>Sign in</a>
              &nbsp;to save your calls across devices, and track your weekly call streaks!
            </p>
          }
        </div>
      }

      {myTotalCalls > 0 &&
        <div>
          <h2 className="impact_total">
            { streakLength > 0 &&
              <React.Fragment>
                {/*tslint:disable-next-line:max-line-length*/}
                You've made <Pluralize singular="call" count={myTotalCalls} /> and your streak is <Pluralize singular="week" count={streakLength} />!
              </React.Fragment>
            }
            { streakLength === 0 &&
              <React.Fragment>
                You've made <Pluralize singular="call" count={myTotalCalls} />!
              </React.Fragment>
            }
          </h2>
          { !authutil.isLoggedIn(this.props.currentUser) &&
            <p>
              <a onClick={authutil.login}>Sign in</a>
              &nbsp;to save your calls across devices, and track your weekly call streaks!
            </p>
          }
          <div className="impact_result">
            {this.props.t('impact.callSummaryText', callSummaryParams)}
          </div>
        </div>
      }

      <CallCount
        totalCount={this.props.totalCount}
        t={i18n.t}
      />
      </section>
    );
  }
}

export const MyImpactTranslatable = translate()(MyImpact);
