import { AuthActions, SET_USER } from './auth.actions';
import { AppUser } from './model/auth.models';

export interface AuthState {
  user?: AppUser;
}

export function authReducer(state = {}, action: AuthActions): AuthState {
  switch (action.type) {
    case SET_USER:
      return {
        user: { ...action.user }
      };
    default:
      return state;
  }
}
