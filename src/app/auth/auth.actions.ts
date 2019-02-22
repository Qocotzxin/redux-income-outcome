import { Action } from '@ngrx/store';
import { AppUser } from './model/auth.models';

export const SET_USER = '[Auth] Set user';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor(public user: AppUser) {}
}

export type AuthActions = SetUserAction;
