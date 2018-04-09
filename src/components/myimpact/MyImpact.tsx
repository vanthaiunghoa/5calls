import * as React from 'react';
import i18n from '../../services/i18n';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import { CallCount } from '../shared';
import { UserStatsState } from '../../redux/userStats';
import { getUserStats, RemoteUserStats } from '../../services/apiServices';
import { UserState } from '../../redux/userState';
import { queueUntilRehydration } from '../../redux/rehydrationUtil';

interface Props {
  readonly userStats: UserStatsState;
  readonly userState?: UserState;
  readonly totalCount: number;
  readonly t: TranslationFunction;
}

interface State {
  remoteUserStats?: RemoteUserStats;
}

export class MyImpact extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      remoteUserStats: undefined,
    };
  }

  componentDidMount() {
    queueUntilRehydration(() => {
      if (this.props.userState && this.props.userState.idToken) {

        getUserStats(this.props.userState.idToken).then((userStats) => {
          this.setState({remoteUserStats: userStats});
        }).catch((error) => {
          // console.log("error getting stats",error)
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

    // update stats from the server when we get them back
    if (this.state.remoteUserStats && this.state.remoteUserStats.stats) {
      callSummaryParams.contactedCalls = this.state.remoteUserStats.stats.contact;
      callSummaryParams.vmCalls = this.state.remoteUserStats.stats.voicemail;
      callSummaryParams.unavailableCalls = this.state.remoteUserStats.stats.unavailable;

      myTotalCalls = callSummaryParams.contactedCalls + callSummaryParams.vmCalls + callSummaryParams.unavailableCalls; 
    }
  
    return (
    <section className="impact">
      <h1 className="impact__title">{this.props.t('impact.title')}</h1>
      {myTotalCalls === 0 &&
        <div>
          <h2
            className="impact_total"
            dangerouslySetInnerHTML={{ __html: this.props.t('impact.noCallsYet') }}
          />
        </div>
      }

      {myTotalCalls > 0 &&
        <div>
          <h1
            className="impact_total"
            dangerouslySetInnerHTML={{ __html: this.props.t('impact.totalCallCountText', { myTotalCalls }) }}
          />

          <p className="impact__text">{this.props.t('impact.text')}</p>
          <div
            className="impact_result"
            dangerouslySetInnerHTML={{ __html: this.props.t('impact.callSummaryText', callSummaryParams) }}
          />
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
