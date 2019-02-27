import { AppState } from 'src/app/app.reducer';
import { AuthActions, SET_USER, RESET_USER } from './auth.actions';
import { AppUser } from './model/auth.models';

export interface AuthState {
  user?: AppUser;
}

export interface LazyAuthState extends AppState {
  user?: AppUser;
}

export function authReducer(state = {}, action: AuthActions): AuthState {
  switch (action.type) {
    case SET_USER:
      return {
        user: { ...action.user }
      };
    case RESET_USER:
      return {};
    default:
      return state;
  }
}
