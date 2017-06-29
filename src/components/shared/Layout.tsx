import * as React from 'react';
import { Navigation, SidebarContainer } from './index';
import { LocationContainer } from '../location';

interface Props {
  readonly children?: {};
}

const Layout: React.StatelessComponent<Props> = (props: Props) => (
  <div>
    <header className="logo__header" role="banner" />
    <div className="layout">
      <aside id="nav" role="contentinfo" className="layout__side">
        <div className="issues">
          <header className="issues__header" role="banner">
            <h1 className="issues__title">
              <a href="/"><img className="issues__logo" src="/img/5calls-logotype.png" alt="5 Calls" />5 Calls</a>
            </h1>
            <div className="issues__location">
              <LocationContainer />
            </div>
          </header>
          <SidebarContainer />
        </div>
      </aside>
      <main id="content" role="main" aria-live="polite" className="layout__main">
        {props.children}
      </main>
    </div>

    <footer>
      {/*TODO: Implement footer component and finish navigation*/}
      <Navigation />
      <div className="colophon">
        <p>5 Calls Civic Action is a 501(c)4 non-profit,
          <a href="https://secure.actblue.com/contribute/page/5calls?refcode=footer">donate today</a></p>
      </div>
    </footer>
  </div>

);

export default Layout;
