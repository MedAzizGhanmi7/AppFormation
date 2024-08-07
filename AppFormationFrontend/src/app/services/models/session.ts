
import { GrantedAuthority } from '../models/granted-authority';
import { Cycle } from './cycle';
import { Module } from './Module';
import { User } from './user';
export interface Session {
  
    sessionId?:number;
  sessionName?: string;
  startDate?: string;
  endDate?: string;
  cycle?: Cycle;
  participantCount?:number;
  instructors?: Array<User>;
  participants?: Array<User>;
    finished? : boolean;
    validated? : boolean;
    modules?: Array<Module>;
}
