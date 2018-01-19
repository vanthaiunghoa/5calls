import * as React from 'react';
import { Link } from 'react-router-dom';
import { DonationContainer } from '../donation/';
import Auth from '../shared/loginUtil';

interface Props {
  readonly postcards?: boolean;
}

export const Header: React.StatelessComponent<Props> = (props: Props) => {
  const auth = new Auth();

  return (
    <header className="logo__header" role="banner" >
      <div className="logo__header__logo layout">
        <Link to={`/`}>
          <img src="/img/5calls-logo-small.png" alt="5 Calls" />
        </Link>
        {/* keep this around for teams, but don't show for now */}
        {/* <ul>
          <li><Link className={props.postcards ? '' : 'active'} to="/">Calls</Link></li>
          <li><Link className={props.postcards ? 'active' : ''} to="/postcards">Postcards</Link></li>
        </ul> */}
        <a onClick={auth.login}><img className="stars" src="/img/5calls-stars.png" alt="Make your voice heard" /></a>
      </div>
      {<DonationContainer />}
    </header>
  );
};
