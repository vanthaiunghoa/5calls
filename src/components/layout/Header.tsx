import * as React from 'react';
import { Link } from 'react-router-dom';
import { DonationContainer } from '../donation/';
import { UserState, UserProfile } from '../../redux/userState/reducer';
import Auth from '../shared/loginUtil';

interface Props {
  readonly postcards?: boolean;
  readonly currentUser?: UserState;
}

export const Header: React.StatelessComponent<Props> = (props: Props) => {
  const auth = new Auth();

  let profile: UserProfile | undefined;
  if (props.currentUser !== undefined) {
    profile = props.currentUser.profile;
  }
  // console.log("user is ",profile);

  const loginClick = () => {
    if (profile !== undefined) {
      auth.logout();
    } else {
      auth.login();
    }
  };

  return (
    <header className="logo__header" role="banner" >
      <div className="logo__header__logo layout">
        <Link to={`/`}>
          <img src="/img/5calls-logo-small.png" alt="5 Calls" />
        </Link>
        {/* keep this around for teams / campaigns, but don't show for now */}
        {/* <ul>
          <li><Link className={props.postcards ? '' : 'active'} to="/">Calls</Link></li>
          <li><Link className={props.postcards ? 'active' : ''} to="/postcards">Postcards</Link></li>
        </ul> */}
        <div className="userHeader">
          <a onClick={loginClick}>
            <img className="stars" src="/img/5calls-stars.png" alt="Make your voice heard" />
          </a>
          <p><a onClick={loginClick}>{profile ? profile.name : 'Login'}</a></p>
        </div>
      </div>
      {<DonationContainer />}
    </header>
  );
};
