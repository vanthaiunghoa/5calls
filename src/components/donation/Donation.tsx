import * as React from 'react';
import * as Constants from '../../common/constants';

interface Props {
  readonly total: number;
  readonly goal: number;
}

interface State {}

export class Donation extends React.Component<Props, State> {
  render () {

    return (
      <div className="logo__header__donate">
        <div className="layout">
          <p className="logo__header__donatetext">
            <a href={Constants.DONATE_URL} target="_blank">5 Calls is powered by donations from members like you</a>
          </p>
          <div className="logo__header__donatebutton">
            <a href={`${Constants.DONATE_URL}?amount=5`} target="_blank">$5</a>
            <p>Supports 100 calls to Congress</p>
          </div>
          <div className="logo__header__donatebutton">
            <a href={`${Constants.DONATE_URL}?amount=15`} target="_blank">$15</a>
            <p>Supports outreach to new activists</p>
          </div>
          <div className="logo__header__donatebutton">
            <a href={`${Constants.DONATE_URL}?amount=25`} target="_blank">$25</a>
            <p>Support issue research and writeups</p>
          </div>
          <div className="logo__header__donatebutton">
            <a href={`${Constants.DONATE_URL}?amount=100`} target="_blank">$100</a>
            <p>Keeps the server running for a month</p>
          </div>
        </div>
      </div>
    );
  }
}
