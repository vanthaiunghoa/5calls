import * as React from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

import { DonationContainer } from '../donation/';
import { UserState, UserProfile } from '../../redux/userState/reducer';
import AuthUtil from '../shared/loginUtil';

interface Props {
  readonly postcards?: boolean;
  readonly currentUser?: UserState;
}

interface State {
  readonly userMenuHidden: boolean;
  readonly currentUser?: UserState;
}

const authutil = new AuthUtil();

class HeaderImpl extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userMenuHidden: true
    };
  }

  handleClickOutside = () => {
    if (!this.state.userMenuHidden) { this.toggleMenu(); }
  }

  toggleMenu() {
    this.setState({ userMenuHidden: !this.state.userMenuHidden });
  }

  loginClick = () => {
    if (this.props.currentUser && this.props.currentUser.profile) {
      this.toggleMenu();
    } else {
      authutil.login();
    }
  }

  logout = () => {
    authutil.logout();
    this.toggleMenu();
  }

  render() {
    let profile: UserProfile | undefined;
    if (this.props.currentUser !== undefined) {
      profile = this.props.currentUser.profile;
    }  

    return (
      <header className="logo__header" role="banner" >
        <div className="logo__header__logo layout">
          <Link to="/">
            <img src="/img/5calls-logo-small.png" alt="5 Calls" />
          </Link>
          {/* keep this around for teams / campaigns, but don't show for now */}
          {/* <ul>
            <li><Link className={props.postcards ? '' : 'active'} to="/">Calls</Link></li>
            <li><Link className={props.postcards ? 'active' : ''} to="/postcards">Postcards</Link></li>
          </ul> */}
          <div className="userHeader">
            <a onClick={this.loginClick}>
              <img
                className="stars"
                src={profile ? profile.picture : '/img/5calls-stars.png'}
                alt="Make your voice heard"
              />
            </a>
            <p><a onClick={this.loginClick}>{profile ? profile.name : 'Login'}</a></p>
            { !this.state.userMenuHidden && 
            <div className="userHeader__menu">
              <ul>
                <li><Link to="/impact">My Impact</Link></li>
                <li className="line"/>
                <li><a href="#" onClick={this.logout}><strong>Log out</strong></a></li>
              </ul>
            </div>
            }
          </div>
        </div>
        {<DonationContainer />}
      </header>
    );
  }
}

export let Header = onClickOutside(HeaderImpl);