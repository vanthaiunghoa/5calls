import * as React from 'react';
import { TranslationFunction } from 'i18next';
import * as ReactMarkdown from 'react-markdown';

import { Issue } from '../../common/model';

interface Props {
  readonly invalidAddress: boolean;
  readonly currentIssue: Issue;
  readonly t: TranslationFunction;
}

interface State {
  events: string[];
}

export class CallHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { events: ['Waiting for live results...'] };
  }

  componentWillReceiveProps(props: Props) {
    if (props.currentIssue !== this.props.currentIssue) {
      this.setState({ events: ['Waiting for live results...']});
    }
  }

  addEvent(event: string) {
    let newEvents = this.state.events;

    if (newEvents.length === 1 && newEvents[0].startsWith('Waiting')) {
      newEvents = [];
    }

    newEvents.unshift(event);

    // remove other events from the past so we don't have a huge dom
    if (newEvents.length > 10) {
      newEvents.pop();
    }

    this.setState({ events: newEvents });
  }

  render() {
    if (this.props.currentIssue) {
      return (
        <header className="call__header">
          <h1 className="call__title">{this.props.currentIssue.name}</h1>
          <div className="call__updates clearfix">
            <h3>Live calls for this issue:</h3>
            <ul id="eventList">
              {this.state.events.map((event, index) => 
                <li key={index}>{event}</li>
              )}
            </ul>
          </div>
          <div className="call__reason">
            <ReactMarkdown source={this.props.currentIssue.reason}/>
          </div>
        </header>
      );
    } else {
      return (
        <header className="call__header">
          {this.props.invalidAddress ?
            <span>
              <h1 className="call__title">Invalid Address or Zip</h1>
              {/* tslint:disable-next-line:max-line-length */}
              <p>Looks like we couldn't find your reps based on the address or zip code you entered. Use the left sidebar to enter a more specific address or just click the <strong>"Go"</strong> button to find it automatically.</p>
            </span>
          :
            <span>
              <h1 className="call__title">{this.props.t('noCalls.title')}</h1>
              <p>{this.props.t('noCalls.reason')}</p>
              <p>{this.props.t('noCalls.nextStep')}</p>
            </span>
          }
        </header>
      );
    }
  }
}

export default CallHeader;
