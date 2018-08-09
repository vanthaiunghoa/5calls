import * as React from 'react';
import { Group } from '../common/model';

export const groupContext = React.createContext<Group | undefined>(undefined);
