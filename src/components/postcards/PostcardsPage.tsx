import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Postcards } from './index';
import { LayoutContainer } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> { }

const PostcardsPage: React.StatelessComponent<Props> = (props: Props) => (
  <LayoutContainer
    issueId={props.match.params.id}
    postcards={true}
  >
    <Postcards/>
  </LayoutContainer>
);

export default withRouter(PostcardsPage);
