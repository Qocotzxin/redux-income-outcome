import { Action } from '@ngrx/store';
import { AppUser } from './model/auth.models';

export const SET_USER = '[Auth] Set user';
export const RESET_USER = '[Auth] Reset user';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor(public user: AppUser) {}
}

export class ResetUserAction implements Action {
  readonly type = RESET_USER;
}

export type AuthActions = SetUserAction | ResetUserAction;
