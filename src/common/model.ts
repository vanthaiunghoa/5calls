
export interface Issue {
  id: string;
  name: string;
  reason: string;
  script: string;
  contacts?: Contact[];
  inactive: boolean;
}

export const DefaultIssue: Issue = {
  id: '',
  name: '',
  reason: '',
  script: '',
  inactive: false
};

export interface Contact {
  name: string;
  phone: string;
  photoURL?: string;
  party: Party;
  state: string;
  area?: string;
  fieldOffices?: FieldOffice[];
}

export type Party = 'Democrat' | 'Republican' | 'Independent' | '';

export const DefaultContact: Contact = {
  name: '',
  phone: '',
  party: '',
  state: ''
};

export interface FieldOffice {
  city: string;
  phone: string;
}

export interface UserStat {
  all: string[];
  contactedCount: number;
  voiceMailCount: number;
  unavailableCount: number;
}

export enum LocationFetchType {
  IP_INFO,
  ADDRESS,
  BROWSER_GEOLOCATION
}
