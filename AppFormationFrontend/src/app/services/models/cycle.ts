
import { GrantedAuthority } from '../models/granted-authority';
import { Session } from './session';
export interface Cycle {
  
    cycleId?:number;
  cycleName?: string;
  startDate?: string;
  endDate?: string;
  sessions?: Array<Session>;
  finished?:boolean;

}
