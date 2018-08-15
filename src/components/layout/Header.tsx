import * as React from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

import { CustomLogin } from '@5calls/react-components';
import { store } from '../../redux/store';
import { UserState, UserProfile } from '../../redux/userState/reducer';
import { clearProfileActionCreator } from '../../redux/userState/action';
import { Auth0Config } from '../../common/constants';

interface Props {
  readonly postcards?: boolean;
  readonly currentUser?: UserState;
  readonly hideDonation: boolean;
}

interface State {
  readonly userMenuHidden: boolean;
  readonly currentUser?: UserState;
}

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

  logout = () => {
    store.dispatch(clearProfileActionCreator());
  }

  render() {
    let profile: UserProfile;
    if (this.props.currentUser !== undefined && this.props.currentUser.profile !== undefined) {
      profile = this.props.currentUser.profile;
    } else {
      profile = {
        name: '',
        sub: '',
        exp: 0,
        picture: ''
      };
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
          <CustomLogin
            auth0Config={Auth0Config}
            userProfile={profile}
            logoutHandler={this.logout}
          />
        </div>
        {/* <DonationContainer /> */}
      </header>
    );
  }
}

export let Header = onClickOutside(HeaderImpl);
