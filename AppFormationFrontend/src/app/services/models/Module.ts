
import { Cycle } from './cycle';
import { Session } from './session';
import { User } from './user';
export interface Module {
  
    moduleId?:number;
    moduleName?: string;
    sessions?: Array<Session>;

}
