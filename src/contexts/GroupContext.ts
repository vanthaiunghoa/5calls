import * as React from 'react';
import {
  Group,
  Issue,
} from '../common/model';

export interface ProviderState {
  group: Group;
  issues: Issue[];
  inactiveIssues: Issue[];
}

const defaultProviderState = {
  group: new Group(''),
  issues: [],
  inactiveIssues: [],
};

export const stateContext = React.createContext<ProviderState>(defaultProviderState);
