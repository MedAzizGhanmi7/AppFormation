/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
import { Session } from './session';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  cin?: string;
  company?: string;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  lastModifiedDate?: string;
  lastname?: string;
  name?: string;
  password?: string;
  pdfFile?: string;
  phoneNumber?: string;
  roles?: Array<Role>;
  speciality?: string;
  userId?: number;
  username?: string;
  verified?: boolean;
  workplace?: string;
  instructorSessions?: Array<Session>;
}
